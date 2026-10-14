import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Award, 
    Github, 
    Linkedin, 
    Sparkles, 
    Cpu, 
    Activity, 
    ShieldCheck, 
    Layers, 
    Binary, 
    Server,
    Radio
} from 'lucide-react';

import { Repository } from './types';
import { CONFIG, CASE_STUDIES, SUMMARY_PILLARS, FLAGSHIP_PROJECT, FALLBACK_REPOSITORIES } from './constants/constants';
import { Navbar } from './components/Navbar';
import { FlagshipArchitectureDiagram } from './components/FlagshipArchitectureDiagram';
import { ProjectCard } from './components/ProjectCard';
import { ContactForm } from './components/ContactForm';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SkillsCloud } from './components/SkillsCloud';
import { Philosophy } from './components/Philosophy';
import { Experience } from './components/Experience';
import { SystemStatus } from './components/SystemStatus';

export default function App() {
    // Initialize with fallback repositories for instant zero-lag load & rate-limit resilience
    const [projects, setProjects] = useState<Repository[]>(FALLBACK_REPOSITORIES);
    const [selectedProject, setSelectedProject] = useState<Repository | null>(null);
    const [customModalData, setCustomModalData] = useState<{ title: string; image: string } | null>(null);

    useEffect(() => {
        fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated`)
            .then(res => {
                if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const enhanced = data.map((repo: any) => ({
                        ...repo,
                        ...(CASE_STUDIES[repo.html_url] && {
                            isFeatured: true,
                            impactPoints: CASE_STUDIES[repo.html_url].impactPoints,
                            customTech: CASE_STUDIES[repo.html_url].tech,
                            customTitle: CASE_STUDIES[repo.html_url].title
                        })
                    })).sort((a: any, b: any) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

                    setProjects(enhanced);
                }
            })
            .catch(err => {
                console.warn("Using offline fallback repositories cache:", err.message);
            });
    }, []);

    const flagshipIcons = [
        <Radio className="text-blue-500" size={20} />,
        <ShieldCheck className="text-blue-500" size={20} />,
        <Layers className="text-blue-500" size={20} />,
        <Activity className="text-blue-500" size={20} />,
        <Binary className="text-blue-500" size={20} />,
        <Server className="text-blue-500" size={20} />
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
            {/* --- STICKY NAVBAR --- */}
            <Navbar />

            {/* --- HERO HEADER --- */}
            <header className="bg-slate-900 text-white pt-28 pb-16 px-6 border-b border-slate-800">
                <div className="max-w-6xl mx-auto">
                    {/* Top Status & Certification Badge */}
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/60 text-blue-300 border border-blue-700/60">
                            <Award size={14} className="text-blue-400" />
                            AWS Certified
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/60">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Available for Staff / Lead Systems Roles
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-3 text-white">
                        {CONFIG.name}
                    </h1>
                    
                    <p className="text-xl sm:text-2xl text-blue-400 font-medium mb-6">
                        {CONFIG.title}
                    </p>

                    {/* Contact & Location Badges */}
                    <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 mb-8 pb-6 border-b border-slate-800/80">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={16} className="text-blue-400" />
                            <span>{CONFIG.location}</span>
                        </div>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <a href={`tel:${CONFIG.phone}`} className="flex items-center gap-1.5 hover:text-white transition">
                            <Phone size={16} className="text-blue-400" />
                            <span>{CONFIG.phone}</span>
                        </a>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <a href={CONFIG.emailUrl} className="flex items-center gap-1.5 hover:text-white transition">
                            <Mail size={16} className="text-blue-400" />
                            <span>{CONFIG.email}</span>
                        </a>
                    </div>

                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-4xl mb-8">
                        {CONFIG.bio}
                    </p>

                    {/* Action Links */}
                    <div className="flex flex-wrap gap-3">
                        <a 
                            href={`https://github.com/${CONFIG.githubUsername}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg border border-slate-700 transition"
                        >
                            <Github size={16} /> GitHub
                        </a>
                        <a 
                            href={CONFIG.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg transition"
                        >
                            <Linkedin size={16} /> LinkedIn
                        </a>
                        <a 
                            href="#flagship" 
                            className="inline-flex items-center gap-2 text-sm font-bold bg-slate-800/90 hover:bg-slate-800 text-blue-300 px-4 py-2.5 rounded-lg border border-blue-500/30 transition"
                        >
                            <Cpu size={16} /> Flagship Platform
                        </a>
                        <a 
                            href="#contact" 
                            className="inline-flex items-center gap-2 text-sm font-bold bg-slate-800/80 hover:bg-slate-800 text-slate-200 px-4 py-2.5 rounded-lg border border-slate-700 transition"
                        >
                            <Mail size={16} /> Get In Touch
                        </a>
                    </div>

                    {/* Technical Skills Categorized Cloud */}
                    <SkillsCloud />
                </div>
            </header>

            {/* --- MAIN CONTENT --- */}
            <main className="max-w-6xl mx-auto px-6 py-16">
                {/* Summary Impact Pillars */}
                <section className="mb-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SUMMARY_PILLARS.map((pillar, i) => (
                            <div 
                                key={i}
                                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
                            >
                                <div>
                                    <div className="text-blue-600 font-extrabold text-2xl mb-1 flex items-center gap-2">
                                        <Sparkles size={18} className="text-blue-500 shrink-0" />
                                        <span>{pillar.stat}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-sm mb-2">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- FLAGSHIP ARCHITECTURE SPOTLIGHT --- */}
                <section id="flagship" className="mb-24 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-8 w-1 bg-blue-600 rounded-full" />
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                    {FLAGSHIP_PROJECT.title}
                                </h2>
                                <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200">
                                    {FLAGSHIP_PROJECT.badge}
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm mt-1">
                                {FLAGSHIP_PROJECT.subtitle} · {FLAGSHIP_PROJECT.period}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                        <p className="text-slate-700 text-base leading-relaxed mb-8 max-w-4xl">
                            {FLAGSHIP_PROJECT.description}
                        </p>

                        {/* Architecture Pillars Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {FLAGSHIP_PROJECT.keyArchitectures.map((arch, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 hover:bg-blue-50/20 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="mb-3 p-2 bg-white rounded-lg w-fit shadow-xs border border-slate-200/60">
                                            {flagshipIcons[idx % flagshipIcons.length]}
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-sm mb-2">
                                            {arch.heading}
                                        </h4>
                                        <p className="text-slate-600 text-xs leading-relaxed">
                                            {arch.detail}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* System Architecture Topology Banner */}
                        <FlagshipArchitectureDiagram 
                            onViewDiagram={() => setCustomModalData({ 
                                title: FLAGSHIP_PROJECT.title, 
                                image: "/diagrams/autonomous-platform.svg" 
                            })} 
                        />

                        {/* Tech Stack Chips */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                                Core Technologies:
                            </span>
                            {FLAGSHIP_PROJECT.tech.map(t => (
                                <span key={t} className="text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200/60">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Professional Experience & Education */}
                <Experience />

                {/* Engineering Philosophy */}
                <div id="philosophy" className="scroll-mt-20">
                    <Philosophy />
                </div>

                {/* Featured Architectural Case Studies */}
                <section id="case-studies" className="mb-24 scroll-mt-20">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="h-8 w-1 bg-blue-600 rounded-full" />
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                                Open Source Reference Architectures
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Distributed systems patterns, high-concurrency engines, and cloud governance tools
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((repo, index) => (
                            <ProjectCard
                                key={repo.id}
                                repo={repo}
                                index={index}
                                onViewArchitecture={setSelectedProject}
                            />
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="scroll-mt-20">
                    <ContactForm />
                </section>
            </main>

            {/* System Status Footer */}
            <SystemStatus />

            {/* System Architecture Modal */}
            <AnimatePresence>
                {(selectedProject || customModalData) && (
                    <ArchitectureModal
                        project={selectedProject}
                        customData={customModalData}
                        onClose={() => {
                            setSelectedProject(null);
                            setCustomModalData(null);
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}