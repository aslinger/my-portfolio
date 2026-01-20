export const CONFIG = {
    name: "John Aslinger",
    title: "Staff Software Engineer",
    bio: "Building at the intersection of performance and reliability. I specialize in architecting distributed systems that remain resilient under high-velocity loads while maintaining a philosophy of 'infrastructure-as-code' and minimal-cost serverless patterns.",
    githubUsername: "aslinger",
    linkedinUrl: "https://linkedin.com/in/yourprofile",
    emailUrl: "mailto:mr.aslinger@gmail.com",
    apiUrl: "https://m6qckep1e7.execute-api.us-east-1.amazonaws.com/contact"
};

export const CASE_STUDIES: Record<string, { title?: string, impactPoints: string[], tech: string[] }> = {
    "https://github.com/aslinger/transaction-analyzer": {
        title: "High-Throughput Transaction Analyzer",
        impactPoints: [
            "Ingests high-velocity financial transactions using **Java 21 Virtual Threads**.",
            "Implemented a multi-layered fraud strategy: **Redis**, **ONNX**, and Operational APIs.",
            "Architected for **99.9% availability** using a distributed event-driven approach."
        ],
        tech: ["Java 21", "Spring Boot", "ONNX AI", "Docker"]
    },
    "https://github.com/aslinger/ecommerce": {
        title: "Polyglot Ecommerce Architecture",
        impactPoints: [
            "Demonstrated the **Transactional Outbox Pattern** to ensure eventual consistency between SQL and **AWS SQS**.",
            "Implemented end-to-end **Distributed Tracing** across microservices using **OpenTelemetry**.",
            "Engineered **Terraform**-managed infrastructure supporting automated failover and minimal-cost scaling."
        ],
        tech: ["Java", "Python", "SQS", "OpenTelemetry", "Terraform"]
    }
};