const SKILLS = [
    { category: "Core Languages", items: ["Java 21+", "Go (Golang)", "Python", "SQL/NoSQL"] },
    { category: "Cloud & Infra", items: ["AWS EKS", "GCP", "Terraform", "LocalStack", "Docker"] },
    { category: "Observability & Ops", items: ["OpenTelemetry", "Jaeger", "Snyk", "FinOps", "Kafka", "GitHub Actions"] }
];

export const SkillsCloud = () => {
    return (
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap gap-x-16 gap-y-8">
            {SKILLS.map((group) => (
                <div key={group.category} className="flex flex-col">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-3">
            {group.category}
          </span>
                    <div className="flex gap-3 flex-wrap">
                        {group.items.map((skill) => (
                            <span
                                key={skill}
                                className="text-sm font-medium text-slate-400 whitespace-nowrap bg-slate-800/50 px-2 py-1 rounded border border-slate-700/50"
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