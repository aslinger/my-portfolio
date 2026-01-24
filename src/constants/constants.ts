export const CONFIG = {
    name: "John Aslinger",
    title: "Staff Software Engineer & Cloud Architect",
    bio: "Architect with 15 years of experience designing high-throughput, event-driven enterprise systems. I specialize in Distributed Observability and FinOps, with a track record of driving $40,000/week in cloud optimizations and eliminating visibility gaps in asynchronous architectures.",
    githubUsername: "aslinger",
    linkedinUrl: "www.linkedin.com/in/john-a-40472444",
    emailUrl: "mailto:mr.aslinger@gmail.com",
    apiUrl: "https://m6qckep1e7.execute-api.us-east-1.amazonaws.com/contact"
};

export const CASE_STUDIES: Record<string, { title?: string, impactPoints: string[], tech: string[] }> = {
    "https://github.com/aslinger/transaction-analyzer": {
        title: "High-Throughput Fraud Engine",
        impactPoints: [
            "Engineered a reference architecture using **Java 21 Virtual Threads** to handle high-velocity ingestion with minimal resource footprint.",
            "Integrated **Kafka** for event streaming and **ONNX Runtime** for sub-millisecond AI inference.",
            "Achieved **99.99% availability** using a distributed, stateless design deployable on Kubernetes."
        ],
        tech: ["Java 21", "Kafka", "ONNX AI", "Redis"]
    },
    "https://github.com/aslinger/ecommerce": {
        title: "Polyglot Ecommerce Architecture",
        impactPoints: [
            "Designed a distributed system using **Java (Spring Boot)** for ingestion and **Python** for async processing on **AWS EKS**.",
            "Implemented **'Trace-Link'**: A custom context propagation strategy achieving **100% trace continuity** across SQS boundaries.",
            "Documented manual context injection strategies in formal **Architecture Decision Records (ADRs)**."
        ],
        tech: ["Java & Python", "AWS EKS", "OpenTelemetry", "Jaeger"]
    },
    "https://github.com/aslinger/s3-tidy": {
        title: "s3-tidy: FinOps Governance CLI",
        impactPoints: [
            "Engineered a high-performance CLI tool in **Go (Golang)** to enforce storage retention policies.",
            "Introduced **FinOps reporting capabilities** to estimate monthly cost savings prior to resource deletion.",
            "Shifted cost-awareness 'left' in the CI/CD pipeline, enabling proactive governance."
        ],
        tech: ["Go (Golang)", "AWS S3", "FinOps", "CLI"]
    }
};