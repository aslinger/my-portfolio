const SKILLS = [
    { category: "Cloud", items: ["AWS", "Terraform", "K8s"] },
    { category: "Backend", items: ["Java 21", "Node.js", "Redis"] },
    { category: "System", items: ["OIDC", "Event-Driven", "OTel"] }
];

export const SkillsCloud = () => {
    return (
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-x-16 gap-y-6">
            {SKILLS.map((group) => (
                <div key={group.category} className="flex flex-col">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">
            {group.category}
          </span>
                    <div className="flex gap-3">
                        {group.items.map((skill) => (
                            <span
                                key={skill}
                                className="text-sm font-medium text-slate-400 whitespace-nowrap"
                            >
                {skill}
              </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};