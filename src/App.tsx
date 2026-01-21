import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Repository } from './types';
import { CONFIG, CASE_STUDIES } from './constants/constants';
import { ProjectCard } from './components/ProjectCard';
import { ContactForm } from './components/ContactForm';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SkillsCloud } from './components/SkillsCloud';
import { Philosophy } from './components/Philosophy';

export default function App() {
    const [projects, setProjects] = useState<Repository[]>([]);
    const [selectedProject, setSelectedProject] = useState<Repository | null>(null);

    useEffect(() => {
        fetch(`https://api.github.com/users/${CONFIG.githubUsername}/repos?sort=updated`)
            .then(res => res.json())
            .then(data => {
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
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* --- HERO SECTION --- */}
            <header className="bg-slate-900 text-white pt-24 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-extrabold mb-4">{CONFIG.name}</h1>
                    <p className="text-xl text-blue-400 font-medium mb-6">{CONFIG.title}</p>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mb-8">
                        {CONFIG.bio}
                    </p>

                    <div className="flex gap-4">
                        <a href={`https://github.com/${CONFIG.githubUsername}`} className="text-sm font-bold bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition">GitHub</a>
                        <a href={CONFIG.linkedinUrl} className="text-sm font-bold bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-600 transition">LinkedIn</a>
                    </div>

                    <SkillsCloud />
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-20">
                <Philosophy />

                <div className="flex items-center gap-3 mb-12">
                    <div className="h-8 w-1 bg-blue-600 rounded-full" />
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-left">
                        Case Studies
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
                    {projects.map((repo, index) => (
                        <ProjectCard
                            key={repo.id}
                            repo={repo}
                            index={index}
                            onViewArchitecture={setSelectedProject}
                        />
                    ))}
                </div>

                <ContactForm />
            </main>

            <AnimatePresence>
                {selectedProject && (
                    <ArchitectureModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}