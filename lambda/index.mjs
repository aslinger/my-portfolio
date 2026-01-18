import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-1" });

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { email, message } = body;
        const verifiedEmail = process.env.VERIFIED_EMAIL;

        const command = new SendEmailCommand({
            Source: verifiedEmail,
            Destination: { ToAddresses: [verifiedEmail] },
            ReplyToAddresses: [email],
            Message: {
                Subject: { Data: `Portfolio Contact: ${email}` },
                Body: { Text: { Data: message } },
            },
        });

        await ses.send(command);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to send email" }),
        };
    }
};