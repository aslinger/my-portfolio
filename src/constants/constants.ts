export const CONFIG = {
    name: "John Aslinger",
    title: "Staff Software Engineer & Cloud Architect",
    bio: "Staff Architect with 15 years of experience designing high-throughput, event-driven enterprise systems. I specialize in Distributed Observability and FinOps, with a track record of driving $2,000,000/year in cloud optimizations and eliminating visibility gaps in asynchronous architectures.",
    githubUsername: "aslinger",
    linkedinUrl: "https://www.linkedin.com/in/john-a-40472444",
    emailUrl: "mailto:mr.aslinger@gmail.com",
    apiUrl: "https://m6qckep1e7.execute-api.us-east-1.amazonaws.com/contact"
};

export const CASE_STUDIES: Record<string, { title?: string, impactPoints: string[], tech: string[], architectureImage?: string }> = {
    "https://github.com/aslinger/transaction-analyzer": {
        title: "High-Throughput Fraud Engine",
        impactPoints: [
            "Engineered a reference architecture using **Java 21 Virtual Threads** to handle high-velocity ingestion with minimal resource footprint.",
            "Integrated **Kafka** for event streaming and **ONNX Runtime** for sub-millisecond AI inference.",
            "Achieved **99.99% availability** using a distributed, stateless design deployable on Kubernetes."
        ],
        tech: ["Java 21", "Kafka", "ONNX AI", "Redis"],
        // Add your image path here. If null/undefined, the UI should hide it.
        architectureImage: "/images/architecture/fraud-engine-diagram.png"
    },
    "https://github.com/aslinger/ecommerce": {
        title: "High-Throughput Ecommerce Architecture",
        impactPoints: [
            "Architected a distributed system using **Java 21 (Spring Boot)** for ingestion and **Python** for async processing on **AWS EKS**.",
            "Implemented **'Trace-Link'**: A custom context propagation strategy achieving **100% trace continuity** across SQS boundaries.",
            "Integrated **Snyk** into the CI/CD pipeline for automated vulnerability scanning and container security."
        ],
        tech: ["Java 21", "Python", "AWS EKS", "OpenTelemetry", "Snyk"],
        architectureImage: "/images/architecture/ecommerce-trace-link.png"
    },
    "https://github.com/aslinger/SyncStream": {
        title: 'SyncStream: Resilient Event Ingestion',
        impactPoints: [
            "Designed an asynchronous ingestion architecture using **Amazon SQS**, reducing API latency to **<50ms** while guaranteeing **at-least-once delivery**.",
            "Implemented the **'Reliable Worker Pattern'** (Process → Persist → Delete) to prevent **data loss** during worker crashes or database outages.",
            "Integrated **OpenTelemetry** for **end-to-end distributed tracing**, visualizing the complete lifecycle of requests across HTTP, Queue, and Database layers.",
            "Simulated a cloud-native AWS environment locally using **LocalStack** and **Docker Compose**."
        ],
        tech: ["Python", "FastAPI", "AWS SQS", "DynamoDB", "Docker", "OpenTelemetry"],
        // Example of one without an image (property omitted)
    },
    "https://github.com/aslinger/s3-tidy": {
        title: "Automated Cloud Governance (FinOps)",
        impactPoints: [
            "Engineered a high-performance CLI tool in **Go (Golang)** to enforce storage retention policies across thousands of buckets.",
            "Implemented a **'Dry-Run' safety mechanism** to generate compliance reports and visualize impact prior to resource deletion.",
            "Shifted cost-awareness 'left' in the CI/CD pipeline, enabling proactive governance of cloud resources."
        ],
        tech: ["Go (Golang)", "AWS S3", "FinOps", "CLI"],
        architectureImage: "/images/architecture/s3-tidy-workflow.png"
    },
    "https://github.com/aslinger/chaos-operator": {
        title: "Chaos Operator: Native Kubernetes Resilience",
        impactPoints: [
            "Designed a **Kubernetes Operator** to automate safe failure injection (latency, pod kills) via Custom Resource Definitions (CRDs).",
            "Implemented **automated safety guardrails** that monitor Prometheus metrics to abort experiments if error rates exceed defined thresholds.",
            "Reduced **Mean Time to Recovery (MTTR)** by exposing service fragility in staging, shifting resilience testing left."
        ],
        tech: ["Kubernetes", "Go (Golang)", "Operator SDK", "Prometheus"]
    }
};