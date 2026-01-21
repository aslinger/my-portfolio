const SKILLS = [
    { category: "Cloud", items: ["AWS", "Terraform", "Kubernetes"] },
    { category: "Backend", items: ["Java 21", "Node.js", "Redis"] },
    { category: "Architecture", items: ["Event-Driven", "OIDC", "OpenTelemetry"] }
];

export const SkillsCloud = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 pt-8 border-t border-slate-700/50">
            {SKILLS.map((group) => (
                <div key={group.category}>
                    <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-3">
                        {group.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {group.items.map((skill) => (
                            <span
                                key={skill}
                                className="text-sm font-medium text-slate-300 bg-slate-800/40 border border-slate-700 px-2 py-0.5 rounded"
                            > {skill} </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};