import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Users, TrendingDown, Activity, Scale } from 'lucide-react';

const PRINCIPLES = [
    {
        title: "Scale with Simplicity",
        description: "I prefer 'boring', proven technology for core path logic. Complexity should be an earned privilege, not a default state.",
        icon: <Scale className="text-blue-500" size={24} />
    },
    {
        title: "People over Processes",
        description: "Code is written for humans to read, and only incidentally for machines to execute. I prioritize developer experience (DevEx) above all.",
        icon: <Users className="text-blue-500" size={24} />
    },
    {
        title: "Observability First",
        description: "If it isn't monitored, it isn't in production. I build systems with deep tracing and metrics baked into the foundation, not bolted on later.",
        icon: <Activity className="text-blue-500" size={24} />
    },
    {
        title: "Resilience via Self-Healing",
        description: "Systems must survive 'poison pills'. I implement automated DLQ redrive policies and circuit breakers to ensure main-line processing never halts.",
        icon: <ShieldCheck className="text-blue-500" size={24} />
    },
    {
        title: "Gapless Tracing",
        description: "Metrics are useless if context is lost. I advocate for 100% trace continuity across asynchronous boundaries (like SQS/Kafka) using OpenTelemetry.",
        icon: <Zap className="text-blue-500" size={24} />
    },
    {
        title: "FinOps as Engineering",
        description: "Cost efficiency is an architectural concern. I build custom tooling to shift cost estimation left into the CI/CD pipeline.",
        icon: <TrendingDown className="text-blue-500" size={24} />
    }
];

export const Philosophy = () => {
    return (
        <section className="mb-24">
            <div className="flex items-center gap-3 mb-10">
                <div className="h-8 w-1 bg-blue-600 rounded-full" />
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Engineering Philosophy</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRINCIPLES.map((p, i) => (
                    <motion.div
                        key={p.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-blue-200 group"
                    >
                        <div className="mb-4 p-3 bg-slate-50 rounded-lg w-fit group-hover:bg-blue-50 transition-colors">
                            {p.icon}
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{p.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            {p.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};