import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Star, ExternalLink, Code2, Terminal, TrendingUp, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CONFIG = {
    name: "John Aslinger",
    title: "Staff Software Engineer",
    bio: "Building at the intersection of performance and reliability. I specialize in architecting distributed systems that remain resilient under high-velocity loads while maintaining a philosophy of 'infrastructure-as-code' and minimal-cost serverless patterns. Beyond the code, I focus on building the developer tools and CI/CD pipelines that empower teams to ship safely at scale.",
    githubUsername: "aslinger",
    linkedinUrl: "https://linkedin.com/in/yourprofile",
    emailUrl: "mailto:mr.aslinger@gmail.com",
    apiUrl: "https://m6qckep1e7.execute-api.us-east-1.amazonaws.com/contact"
};

const CASE_STUDIES: Record<string, { title?: string, impactPoints: string[], tech: string[] }> = {
    "https://github.com/aslinger/transaction-analyzer": {
        title: "High-Throughput Transaction Analyzer",
        impactPoints: [
            "Ingests high-velocity financial transactions using **Java 21 Virtual Threads** for maximum concurrency.",
            "Implemented a multi-layered fraud strategy: **Redis** (Stateful), **ONNX** (ML), and Operational APIs.",
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

interface Repository {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    isFeatured?: boolean;
    impactPoints?: string[];
    customTech?: string[];
    customTitle?: string;
}

export default function App() {
    const [projects, setProjects] = useState<Repository[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        reason: 'Opportunity',
        message: '',
        hp_field: '' // Honeypot field for bot protection
    });
    const [sent, setSent] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Repository | null>(null);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated&per_page=10`)
            .then((res) => res.json())
            .then((data: any) => {
                if (Array.isArray(data)) {
                    const enhancedData = data.map((repo) => {
                        const caseStudy = CASE_STUDIES[repo.html_url];
                        if (caseStudy) {
                            return {
                                ...repo,
                                isFeatured: true,
                                impactPoints: caseStudy.impactPoints,
                                customTech: caseStudy.tech,
                                customTitle: caseStudy.title
                            };
                        }
                        return repo;
                    });
                    enhancedData.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
                    setProjects(enhancedData);
                }
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching repos:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Bot check
        if (formData.hp_field) return;

        setIsSending(true);
        try {
            const response = await fetch(CONFIG.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setSent(true);
                setFormData({ name: '', email: '', company: '', reason: 'Opportunity', message: '', hp_field: '' });
            } else {
                alert("Failed to send message.");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* --- HERO --- */}
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

                    {/* System Status Badges */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-xs font-mono text-slate-300">System Live: AWS us-east-1</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700">
                            <Terminal size={12} className="text-blue-400" />
                            <span className="text-xs font-mono text-slate-300">CI/CD: GitHub Actions (OIDC)</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 -mt-16 pb-20">
                <div className="flex items-center gap-3 mb-6 text-white">
                    <Terminal size={24} />
                    <h2 className="text-2xl font-bold">Engineering Work</h2>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-xl" />
                        ))}
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        {projects.map((repo, index) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={`group flex flex-col p-6 rounded-xl border bg-white shadow-sm hover:shadow-xl transition-all ${
                                    repo.isFeatured ? "border-blue-200 ring-1 ring-blue-100 md:col-span-2 lg:col-span-1" : "border-slate-200"
                                }`}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${repo.isFeatured ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                                            {repo.isFeatured ? <TrendingUp size={20} /> : <Code2 size={20} />}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg ${repo.isFeatured ? "text-blue-700" : "text-slate-800"}`}>
                                                {repo.customTitle || repo.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink size={18} className="text-slate-400 hover:text-blue-500" />
                                    </a>
                                </div>

                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    {repo.description || "No description provided."}
                                </p>

                                {repo.isFeatured && (
                                    <>
                                        <button
                                            onClick={() => setSelectedProject(repo)}
                                            className="mb-4 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-tight w-fit"
                                        >
                                            <Terminal size={14} /> View System Architecture
                                        </button>
                                        <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-lg">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />
                                                <div className="w-full">
                                                    <span className="text-xs font-bold text-green-800 uppercase tracking-wide block mb-2">Engineering Impact</span>
                                                    <ul className="space-y-2">
                                                        {repo.impactPoints?.map((point, idx) => (
                                                            <li key={idx} className="text-sm text-green-900 leading-snug flex gap-2">
                                                                <span className="text-green-400">•</span>
                                                                <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') }} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex gap-2 flex-wrap">
                                        {(repo.customTech || [repo.language]).filter(Boolean).slice(0, 3).map((t) => (
                                            <span key={t} className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">{t}</span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                                        <Star size={14} className={repo.stargazers_count > 0 ? "text-yellow-400 fill-yellow-400" : ""} />
                                        {repo.stargazers_count}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* --- CONTACT FORM --- */}
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-slate-200 shadow-sm mt-20">
                    <h2 className="text-2xl font-bold mb-6 text-slate-800">Contact Me</h2>
                    {sent ? (
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} className="p-4 bg-green-50 text-green-700 rounded-lg">
                            Thanks! I'll be in touch soon.
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Honeypot hidden field */}
                            <input
                                type="text"
                                style={{ display: 'none' }}
                                tabIndex={-1}
                                autoComplete="off"
                                value={formData.hp_field}
                                onChange={(e) => setFormData({...formData, hp_field: e.target.value})}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                                    <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                                <select value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-500">
                                    <option value="Opportunity">New Opportunity</option>
                                    <option value="Consulting">Consulting/Advisory</option>
                                    <option value="Speaking">Speaking Engagement</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" required />
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition"
                            >
                                {isSending ? "Sending Inquiry..." : "Send Inquiry"}
                            </button>
                        </form>
                    )}
                </div>
            </main>

            {/* --- ARCHITECTURE MODAL --- */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-800">{selectedProject.customTitle || selectedProject.name} Architecture</h3>
                                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-slate-100 rounded-full"><X size={20} /></button>
                            </div>
                            <div className="p-8 bg-slate-50 flex justify-center">
                                <img
                                    src={`/diagrams/${selectedProject.name}.svg`}
                                    alt="Architecture Diagram"
                                    className="max-h-[60vh] object-contain"
                                    onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/800x400?text=Architecture+Diagram+Coming+Soon")}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}