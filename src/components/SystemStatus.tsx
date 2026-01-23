import { Globe, ShieldCheck, Activity, DollarSign } from 'lucide-react';

export const SystemStatus = () => {
    const lastDeploy = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200 mt-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                        <Globe size={14} className="text-blue-500" />
                        <span>Region: us-east-1</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                        <ShieldCheck size={14} className="text-green-500" />
                        <span>OIDC: Verified</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                        <Activity size={14} className="text-orange-500" />
                        <span>Health: Healthy</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                        <DollarSign size={14} className="text-purple-500" />
                        <span>Cost: &lt;$5.00/mo</span>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
                        Build Manifest
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                        {lastDeploy} • main
                    </p>
                </div>
            </div>
        </footer>
    );
};