import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
    try {
        console.log("Received event:", event.body);

        const body = JSON.parse(event.body || "{}");
        const { name, email, company, reason, message } = body;

        if (!email || !message || !name) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields" })
            };
        }

        const emailContent = `
      Name: ${name}
      Email: ${email}
      Company: ${company || 'None'}
      Reason: ${reason}
      Message: ${message}
    `;

        const command = new SendEmailCommand({
            Source: process.env.VERIFIED_EMAIL,
            Destination: { ToAddresses: [process.env.VERIFIED_EMAIL] },
            Message: {
                Subject: { Data: `Portfolio Contact: ${name} (${reason})` },
                Body: { Text: { Data: emailContent } },
            },
            ReplyToAddresses: [email]
        });

        await ses.send(command);

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Success" }),
        };
    } catch (error) {
        console.error("Lambda Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" }),
        };
    }
};