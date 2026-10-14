import { ExperienceItem, EducationItem } from '../types';

export const CONFIG = {
    name: "John Alexander Aslinger",
    title: "Lead Systems & Software Engineer • Distributed Systems • Cloud Architecture",
    headline: "Staff Software Engineer, 15 years",
    bio: "Staff & Lead Software Engineer with 15 years of experience architecting high-throughput distributed systems, cloud-native infrastructure, and event-driven platforms at enterprise scale. AWS Certified. FinOps champion ($2M/year in cloud savings across 50+ microservices). Recently architected and deployed an autonomous, low-latency event-driven execution platform on AWS featuring Python asyncio streaming, an SQLite ACID state machine, native Prometheus telemetry (<5MB RAM), and Google Gemini-powered risk synthesis.",
    location: "Ashburn, VA",
    phone: "703-401-8847",
    email: "mr.aslinger@gmail.com",
    emailUrl: "mailto:mr.aslinger@gmail.com",
    website: "https://johnaslinger.com",
    githubUsername: "aslinger",
    linkedinUrl: "https://www.linkedin.com/in/john-a-40472444",
    apiUrl: "https://m6qckep1e7.execute-api.us-east-1.amazonaws.com/contact"
};

export const SUMMARY_PILLARS = [
    {
        title: "15+ Years Distributed Systems",
        description: "Designing high-throughput, event-driven enterprise platforms and cloud-native microservices. AWS Certified.",
        stat: "15+ Years"
    },
    {
        title: "Zero-Downtime Transformation",
        description: "Led Walmart mainframe-to-microservices modernization (~12M records/day, billions in annual volume) with dual-write cutover.",
        stat: "~12M / day"
    },
    {
        title: "$2M/yr FinOps Optimization",
        description: "Spearheaded cloud cost reduction across 50+ microservices spanning Kubernetes, database indexes, and Kafka retention.",
        stat: "$2M Saved"
    },
    {
        title: "Low-Latency Autonomous Platform",
        description: "Built an event-driven async execution engine with ACID crash recovery, Prometheus observability (<5MB), and Gemini AI synthesis.",
        stat: "<1ms Loop"
    }
];

export const TECHNICAL_SKILLS = [
    {
        category: "Languages",
        items: ["Java (8, 11, 17, 21+)", "Python (asyncio, NumPy)", "SQL/NoSQL", "TypeScript"]
    },
    {
        category: "Frameworks & Streaming",
        items: ["Spring Boot / Spring Cloud", "Kafka Streams", "Spring Cloud Streaming", "Avro", "Maven", "WebSockets"]
    },
    {
        category: "Cloud & Infrastructure",
        items: ["AWS (Certified; EKS, MSK, S3, SQS, Lightsail)", "GCP (BigQuery, GCS)", "Kubernetes (Operator SDK / CRDs)", "Terraform (IaC)", "Docker", "Linux (systemd)"]
    },
    {
        category: "Observability & Resilience",
        items: ["OpenTelemetry", "Jaeger", "Prometheus (Native Exporters)", "Grafana", "Resilience4j", "DLQ / Redrive", "Istio", "Circuit Breakers"]
    },
    {
        category: "AI & Vector Search",
        items: ["Google Gemini API (gemini-3.8-flash)", "NumPy Vector Embeddings", "Cosine Similarity Search", "GPT-4o", "RAG pipelines", "pgvector", "LangChain"]
    }
];

export const FLAGSHIP_PROJECT = {
    title: "Autonomous Event-Driven Execution Platform",
    subtitle: "Proprietary Low-Latency Systems Architecture",
    period: "2025 – Present",
    badge: "Flagship Architecture",
    description: "An autonomous, low-latency execution and telemetry platform operating on AWS, handling real-time data streaming, state persistence, and algorithmic execution with zero human intervention.",
    keyArchitectures: [
        {
            heading: "Asynchronous Concurrency & Streaming",
            detail: "Architected a non-blocking WebSocket streaming pipeline using Python asyncio and in-memory circular buffers, processing high-throughput event feeds with sub-millisecond event-loop dispatching."
        },
        {
            heading: "ACID State Machine & Instant Hot-Recovery",
            detail: "Engineered an event-driven finite state machine (FSM) backed by persistent SQLite WAL mode, guaranteeing atomic transitions and sub-second crash recovery across daemon restarts without orphan states."
        },
        {
            heading: "Process-Isolated Shadow Staging",
            detail: "Built a dual-environment framework running a live production daemon alongside an isolated 'Shadow Incubator' daemon, forward-testing experimental algorithmic models against live data streams with zero production risk."
        },
        {
            heading: "Embedded Prometheus Telemetry (<5MB RAM)",
            detail: "Instrumented native in-process Prometheus HTTP exporters directly inside the engine, exposing real-time histograms of order-walk duration, limit fill prices, and WebSocket connection health."
        },
        {
            heading: "Vector Similarity Search & Gemini AI Synthesis",
            detail: "Built a high-performance mathematical regime embedding engine using NumPy (cosine distance) paired with Google Gemini API (gemini-3.8-flash) for automated end-of-session incident diagnostics."
        },
        {
            heading: "Infrastructure as Code & Daemon Supervision",
            detail: "Automated AWS cloud provisioning with Terraform, zero-secret credential injection via AWS SSM Parameter Store, and self-healing Linux systemd service daemons."
        }
    ],
    tech: [
        "Python (asyncio)",
        "NumPy",
        "Prometheus",
        "Google Gemini API",
        "SQLite (WAL Mode)",
        "Terraform",
        "AWS",
        "WebSockets",
        "Linux (systemd)"
    ]
};

export const PROFESSIONAL_EXPERIENCE: ExperienceItem[] = [
    {
        role: "Lead Systems & Platform Engineer",
        company: "Autonomous Event-Driven Platform",
        location: "Remote · Proprietary",
        period: "2025 – Present",
        highlights: [
            {
                title: "Real-Time Streaming Pipelines",
                description: "Architected an asynchronous streaming client in Python (asyncio / WebSockets) with in-memory circular buffers, processing high-frequency live data feeds with sub-second event loop latency and zero external service overhead."
            },
            {
                title: "Fault-Tolerant State Machine & Hot Recovery",
                description: "Engineered an event-driven finite state machine backed by SQLite WAL mode for ACID transaction persistence, enabling instant sub-second crash recovery and active job state reconciliation across daemon restarts."
            },
            {
                title: "Dynamic Pricing & Queue-Priority Algorithms",
                description: "Implemented a rate-controlled limit-pricing algorithm ('order walker') that walks resting orders through discrete time intervals to optimize queue priority and minimize execution friction."
            },
            {
                title: "Dual-Environment Staging ('Shadow Incubator')",
                description: "Architected a process-isolated staging daemon running on Linux (systemd) to benchmark and forward-test experimental models against real-time data streams without production risk."
            },
            {
                title: "Production Observability & Metrics",
                description: "Instrumented native Prometheus /metrics HTTP exporters directly inside the execution engine, surfacing order-walker duration histograms, fill slippage, and connection health with near-zero memory footprint (<5MB RAM)."
            },
            {
                title: "Vector Embeddings & Semantic Retrieval",
                description: "Developed a high-performance mathematical regime embedding engine using NumPy and SQLite, executing sub-millisecond cosine distance lookups across historical operational sessions."
            },
            {
                title: "GenAI Telemetry & Risk Attribution",
                description: "Integrated the Google Gemini API (gemini-3.8-flash) to generate automated end-of-session telemetry synthesis, structuring prompt chains to parse execution logs and volatility regimes into executive risk diagnostics."
            },
            {
                title: "Infrastructure as Code (IaC) & Cloud Automation",
                description: "Automated cloud infrastructure provisioning on AWS utilizing Terraform, managing automated deployment lifecycles, virtual environments, and zero-secret credential injection via AWS SSM Parameter Store."
            }
        ],
        environment: [
            "Python (asyncio, NumPy)",
            "Prometheus Telemetry",
            "Google Gemini API (gemini-3.8-flash)",
            "Vector Embeddings (Cosine Similarity)",
            "React",
            "AWS (Lightsail, SSM Parameter Store)",
            "Linux (systemd)",
            "SQLite",
            "Terraform",
            "WebSockets",
            "REST APIs",
            "Git/GitHub Actions"
        ]
    },
    {
        role: "Senior Software Engineer",
        company: "Walmart Global Tech",
        location: "Reston, VA",
        period: "July 2022 – June 2025",
        highlights: [
            {
                title: "Sam's Club Inventory Event Pipeline (Lead Engineer)",
                description: "Designed and built new real-time inventory change event pipelines for Sam's Club distribution centers, introducing next-gen event processing on GCP/BigQuery while maintaining full backward compatibility for legacy consumers on the shared Walmart/International platform. Architected an incremental rollout framework allowing source teams to migrate onto the new pipeline independently, decoupling Sam's infrastructure costs from Walmart's shared footprint without a hard cutover."
            },
            {
                title: "FinOps & Cost Engineering",
                description: "Spearheaded a $2M/year cloud cost reduction initiative across 50+ microservices: a hands-on, multi-pronged effort spanning Kubernetes pod resource request/limit right-sizing and node pool tuning on Azure, database index refinement to reduce I/O overhead, and Kafka retention policy optimization during the Sam's Club infrastructure decoupling from Walmart's shared platform."
            },
            {
                title: "DevSecOps Maturity",
                description: "Elevated security posture across 50+ repositories by implementing Shift-Left practices with Snyk for vulnerability scanning, automated canary deployment pipelines, and contract testing. Streamlined onboarding to scale the team from 20 to 50 engineers, cutting time-to-first-commit from 2 weeks to 3 days."
            },
            {
                title: "AI-Augmented Code Review",
                description: "Integrated GitHub Copilot with custom review instructions into the PR workflow to surface code-quality and risk patterns earlier, layered with automated blocking gates for schema integrity (DB index validation) and cost regression (Azure Cost Management API) catching data-integrity and cost issues before they reached production."
            }
        ],
        environment: [
            "Java 17",
            "Spring Boot",
            "Kafka",
            "GCP (BigQuery, GCS)",
            "Azure",
            "Kubernetes",
            "Snyk",
            "Istio"
        ]
    },
    {
        role: "Software Engineer 3",
        company: "Walmart Global Tech",
        location: "Reston, VA",
        period: "May 2021 – July 2022",
        highlights: [
            {
                title: "International Market Expansion (Technical Lead)",
                description: "Led a 12-person distributed team to deliver Canada and Mexico market capabilities, coordinating across six partner teams and presenting strategic impact reviews to the VP of Engineering."
            },
            {
                title: "Corrections Engine Modernization",
                description: "Introduced Avro for schema evolution and a configurable business logic layer into the core corrections engine, enabling dynamic orchestration queries without full code deployments."
            },
            {
                title: "Infrastructure Decommission",
                description: "Led strategic decommissioning of legacy OneOps infrastructure, eliminating technical debt and reducing operational attack surface by removing Proximity dependencies. Secured SSP/SOX re-assessment approvals."
            }
        ],
        environment: [
            "Java 8/11",
            "Spring Boot",
            "Kafka",
            "Azure",
            "Kubernetes",
            "Avro"
        ]
    },
    {
        role: "Software Engineer 2",
        company: "Walmart Global Tech",
        location: "Reston, VA",
        period: "November 2018 – May 2021",
        highlights: [
            {
                title: "Mainframe-to-Microservices Transformation (Lead Engineer)",
                description: "Designed and led the overhaul of a legacy mainframe financial system into an event-driven, multi-region Spring Boot + Kafka pipeline - 10–15 microservices, ~12M records/day, securing billions in annual US transaction volume. The defining engineering challenge was orchestrating a dual-write, zero-downtime cutover: legacy mainframe and new Kafka pipeline ran concurrently in production, requiring careful traffic-shifting sequencing and rollback gates to ensure zero data loss. Also drove Avro schema evolution strategy and the IBM Z-Series integration layer maintaining backward compatibility for legacy downstream consumers."
            },
            {
                title: "Financial Reconciliation Mesh",
                description: "Designed and implemented a service mesh ingesting data from 5 disparate streams, automating UPC corrections and integrating with IBM legacy systems to enforce data integrity across a hybrid mainframe/cloud environment."
            },
            {
                title: "Spotlight Alerting Framework",
                description: "Built a real-time alerting system using xMatters to proactively detect and escalate anomalous metrics across the pipeline. Recognized as 2021 Top Performer for this delivery."
            },
            {
                title: "SOX & Compliance",
                description: "Led information security and SOX approval processes for production rollouts; guided distributed contractor teams on case logic implementation and automated testing standards."
            }
        ],
        environment: [
            "Java 8",
            "Spring Boot",
            "Kafka",
            "Azure",
            "Kubernetes",
            "IBM Z-Series"
        ]
    },
    {
        role: "Advanced Software Engineer",
        company: "National Center for Missing & Exploited Children",
        location: "Alexandria, VA",
        period: "October 2015 – August 2018",
        highlights: [
            {
                title: "Search Architecture",
                description: "Engineered high-performance full-text search across three applications using Apache Solr, implementing complex multi-entity querying and data consolidation strategies."
            },
            {
                title: "Microservices & Framework Development",
                description: "Built an extensible WHOIS microservice (Spring Boot) with dual-interface architecture supporting both synchronous REST and asynchronous RabbitMQ. Developed a custom bulk-operation framework with pluggable validation, reducing code duplication across the platform."
            }
        ],
        environment: [
            "Java 8",
            "Spring Boot",
            "Apache Solr",
            "RabbitMQ",
            "Tomcat"
        ]
    },
    {
        role: "Software Engineer (Asc. → Advanced)",
        company: "Lockheed Martin Corporation",
        location: "Arlington, VA",
        period: "2010 – 2015",
        highlights: [
            {
                title: "Defense Application Engineering",
                description: "Developed and tested full-stack features for mission-critical DoD air track applications (GWT, Spring, Hibernate), with fast-track promotions through two levels to Technical Lead."
            },
            {
                title: "DevOps Transformation",
                description: "Led CI/CD modernization for a 20-developer team - migrated 12+ Ant repositories to Maven, stood up Jenkins + Nexus, and drove the enterprise-wide Java 8 transition strategy."
            }
        ],
        environment: [
            "Java 8",
            "Spring",
            "Maven",
            "Jenkins",
            "Nexus",
            "WebLogic",
            "GWT"
        ]
    }
];

export const EDUCATION: EducationItem[] = [
    {
        degree: "Master of Science, Computer Science (Honors)",
        institution: "Johns Hopkins University, Whiting School of Engineering",
        details: "Concentration: Enterprise and Web Computing | Completed December 2012"
    },
    {
        degree: "Bachelor of Science, Computer Science (Distinction)",
        institution: "University of Virginia, School of Engineering and Applied Science",
        details: "Minor: Engineering Business | Class of 2010"
    }
];

export const CASE_STUDIES: Record<string, { title?: string, impactPoints: string[], tech: string[], architectureImage?: string }> = {
    "https://github.com/aslinger/transaction-analyzer": {
        title: "High-Throughput Fraud Engine",
        impactPoints: [
            "Engineered a reference architecture using **Java 21 Virtual Threads** to handle high-velocity ingestion with minimal resource footprint.",
            "Integrated **Kafka** for event streaming and **ONNX Runtime** for sub-millisecond AI inference.",
            "Achieved **99.99% availability** using a distributed, stateless design deployable on Kubernetes."
        ],
        tech: ["Java 21", "Kafka", "ONNX AI", "Redis"],
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
        tech: ["Python", "FastAPI", "AWS SQS", "DynamoDB", "Docker", "OpenTelemetry"]
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