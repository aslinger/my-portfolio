import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Cpu } from 'lucide-react';

const SKILLS = [
    { category: "Cloud & DevOps", items: ["AWS", "Terraform", "GitHub Actions", "Docker", "Kubernetes"] },
    { category: "Backend & Systems", items: ["Java 21", "Python", "Node.js", "Redis", "SQS", "PostgreSQL"] },
    { category: "Patterns & Architecture", items: ["Microservices", "Event-Driven", "OIDC", "Transactional Outbox", "OpenTelemetry"] }
];

export const SkillsCloud = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="mb-12 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            {/* Header / Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600 rounded-lg text-white">
                        <Cpu size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Technical Expertise</h2>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-slate-400"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </button>

            {/* Collapsible Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <div className="px-6 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-100 pt-6">
                            {SKILLS.map((group) => (
                                <div key={group.category}>
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                        {group.category}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((skill, i) => (
                                            <motion.span
                                                key={skill}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium text-slate-600 shadow-sm"
                                            >
                                                {skill}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};