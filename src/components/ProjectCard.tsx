import { motion } from 'framer-motion';
import { TrendingUp, Code2, ExternalLink, Terminal, CheckCircle, Star } from 'lucide-react';
import { Repository } from '../types';

interface ProjectCardProps {
    repo: Repository;
    index: number;
    onViewArchitecture: (repo: Repository) => void;
}

export const ProjectCard = ({ repo, index, onViewArchitecture }: ProjectCardProps) => (
    <motion.div
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
                <h3 className={`font-bold text-lg ${repo.isFeatured ? "text-blue-700" : "text-slate-800"}`}>
                    {repo.customTitle || repo.name}
                </h3>
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
                    onClick={() => onViewArchitecture(repo)}
                    className="mb-4 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 uppercase tracking-tight w-fit"
                >
                    <Terminal size={14} /> View System Architecture
                </button>
                <div className="mb-6 bg-green-50 border border-green-100 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-1 shrink-0" />
                        <div className="w-full">
                            <ul className="space-y-2">
                                {repo.impactPoints?.map((point, idx) => (
                                    <li key={idx} className="text-sm text-green-900 flex gap-2">
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
);