import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Star, ExternalLink, Code2, Terminal, TrendingUp, CheckCircle } from 'lucide-react';

// --- CONFIGURATION & DATA ---
const CONFIG = {
    name: "My Name",
    title: "Staff Software Engineer",
    bio: "Specializing in high-scale distributed systems, minimal-cost cloud architectures, and developer productivity tools.",
    githubUsername: "aslinger",
    linkedinUrl: "https://linkedin.com/in/yourprofile",
    emailUrl: "mailto:hello@yourdomain.com"
};

// Inside your App component...
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Paste your Terraform output here
    const API_URL = "https://your-api-id.execute-api.us-east-1.amazonaws.com/contact";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, message })
        });

        if (response.ok) setSent(true);
        else alert("Failed to send message.");

    } catch (err) {
        console.error(err);
        alert("Error connecting to server.");
    }
};

// This dictionary maps a Repo URL to your "Staff Level" Case Study details
const CASE_STUDIES: Record<string, { title?: string, impact: string, tech: string[] }> = {
    // REPLACE with your actual Repo URL
    "https://github.com/aslinger/transaction-analyzer": {
        title: "High-Throughput Transaction Analyzer",
        impact: "This system ingests high-velocity financial transactions, processes them using Virtual Threads for concurrency, and applies a multi-layered fraud detection strategy: Stateful Layer (Redis), ML Layer (ONNX), and Operational API",
        tech: ["Java 21", "Spring Boot", "ONNX AI", "Docker"]
    },
    // Add another one here matching another repo URL
    "https://github.com/aslinger/ecommerce": {
        title: "Polyglot Ecommerce Platform",
        impact: "This system demonstrates the Transactional Outbox Pattern (simulated) and Distributed Tracing across language boundaries.",
        tech: ["Java","Python", "SQS", "OpenTelemetry", "TerraForm"]
    }
};

interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    // Enhanced fields (optional)
    isFeatured?: boolean;
    impact?: string;
    customTech?: string[];
    customTitle?: string;
}

function App() {
    const [projects, setProjects] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=10`)
            .then((res) => res.json())
            .then((data: any) => {
                if (Array.isArray(data)) {
                    // --- THE MAGIC MERGE LOGIC ---
                    const enhancedData = data.map((repo) => {
                        const caseStudy = CASE_STUDIES[repo.html_url];

                        if (caseStudy) {
                            return {
                                ...repo,
                                isFeatured: true,
                                impact: caseStudy.impact,
                                customTech: caseStudy.tech,
                                customTitle: caseStudy.title
                            };
                        }
                        return repo;
                    });

                    // Sort: Featured items first, then by stars/updated
                    enhancedData.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

                    setProjects(enhancedData);
                }
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching repos:", err));
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* --- HERO SECTION --- */}
            <div className="bg-slate-900 text-white pb-24 pt-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-extrabold mb-4">{CONFIG.name}</h1>
                    <p className="text-xl text-blue-400 font-medium mb-6">{CONFIG.title}</p>
                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed mb-8">{CONFIG.bio}</p>
                    <div className="flex gap-4">
                        <a href={`https://github.com/${CONFIG.githubUsername}`} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"><Github /></a>
                        <a href={CONFIG.linkedinUrl} className="p-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition"><Linkedin /></a>
                        <a href={CONFIG.emailUrl} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition"><Mail /></a>
                    </div>
                </div>
            </div>

            {/* --- UNIFIED PROJECT GRID --- */}
            <main className="max-w-6xl mx-auto px-6 -mt-16 pb-20">
                <div className="flex items-center gap-3 mb-6 text-white">
                    <Terminal size={24} />
                    <h2 className="text-2xl font-bold">Engineering Work</h2>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-slate-500">Loading Engineering Data...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

                        {projects.map((repo) => (
                            <a
                                key={repo.id}
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                  group relative flex flex-col p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1
                  ${repo.isFeatured
                                    ? "bg-white border-blue-200 shadow-lg ring-1 ring-blue-100 md:col-span-2 lg:col-span-1"
                                    : "bg-white/80 border-slate-200 shadow-sm hover:shadow-md"
                                }
                `}
                            >
                                {/* Header: Title & Link */}
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${repo.isFeatured ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                                            {repo.isFeatured ? <TrendingUp size={20} /> : <Code2 size={20} />}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg ${repo.isFeatured ? "text-blue-700" : "text-slate-800"}`}>
                                                {repo.customTitle || repo.name}
                                            </h3>
                                            {repo.isFeatured && (
                                                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded ml-2 hidden sm:inline-block">
                          Case Study
                        </span>
                                            )}
                                        </div>
                                    </div>
                                    <ExternalLink size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                </div>

                                {/* Description */}
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {repo.description || "No description provided."}
                                </p>

                                {/* THE "STAFF ENGINEER" IMPACT SECTION */}
                                {repo.isFeatured && (
                                    <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-lg">
                                        <div className="flex items-start gap-2">
                                            <CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />
                                            <div>
                                                <span className="text-xs font-bold text-green-800 uppercase tracking-wide block mb-1">Engineering Impact</span>
                                                <p className="text-sm text-green-900 font-medium leading-snug">
                                                    {repo.impact}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Footer: Tech Stack & Stats */}
                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex gap-2 flex-wrap">
                                        {/* Prefer Custom Tech Stack if available, else Language */}
                                        {(repo.customTech || [repo.language]).filter(Boolean).slice(0, 3).map((t) => (
                                            <span key={t} className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">
                        {t}
                      </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                                        <Star size={14} className={repo.stargazers_count > 0 ? "text-yellow-400 fill-yellow-400" : ""} />
                                        {repo.stargazers_count}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;