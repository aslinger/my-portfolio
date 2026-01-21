import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { AnimatePresence } from 'framer-motion'; // Keep only AnimatePresence for the Modal

import { Repository } from './types';
import { CONFIG, CASE_STUDIES } from './constants/constants';
import { ProjectCard } from './components/ProjectCard';
import { ContactForm } from './components/ContactForm';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SkillsCloud } from './components/SkillsCloud';

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
            <div className="bg-slate-900 text-white pb-24 pt-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-extrabold mb-4">{CONFIG.name}</h1>
                    <p className="text-xl text-blue-400 font-medium mb-6">{CONFIG.title}</p>
                    <p className="text-slate-400 max-w-2xl text-lg leading-relaxed mb-8">{CONFIG.bio}</p>

                    <div className="flex gap-4">
                        <a href={`https://github.com/${CONFIG.githubUsername}`} className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition">GitHub</a>
                        <a href={CONFIG.linkedinUrl} className="p-2 bg-blue-700 rounded-lg hover:bg-blue-600 transition">LinkedIn</a>
                    </div>
                </div>

                <SkillsCloud />
            </div>

            <main className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex items-center gap-3 mb-10">
                    <Terminal size={24} className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-slate-800">Engineering Work</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
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

            {/* AnimatePresence must stay here to wrap the conditional Modal */}
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