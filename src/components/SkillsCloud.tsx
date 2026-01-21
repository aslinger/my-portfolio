import { motion } from 'framer-motion';

const SKILLS = [
    { category: "Cloud & DevOps", items: ["AWS", "Terraform", "GitHub Actions", "Docker", "Kubernetes"] },
    { category: "Backend & Systems", items: ["Java 21", "Python", "Node.js", "Redis", "SQS", "PostgreSQL"] },
    { category: "Patterns & Architecture", items: ["Microservices", "Event-Driven", "OIDC", "Transactional Outbox", "OpenTelemetry"] }
];

export const SkillsCloud = () => {
    return (
        <div className="mb-12">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-8 h-1 bg-blue-600 rounded-full" />
                Technical Expertise
            </h2>
            <div className="space-y-6">
                {SKILLS.map((group, groupIdx) => (
                    <div key={group.category}>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                            {group.category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {group.items.map((skill, i) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: (groupIdx * 0.2) + (i * 0.05) }}
                                    className="px-3 py-1 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors cursor-default shadow-sm"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};