import { TECHNICAL_SKILLS } from '../constants/constants';

export const SkillsCloud = () => {
    return (
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNICAL_SKILLS.map((group) => (
                <div key={group.category} className="flex flex-col">
                    <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {group.category}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                        {group.items.map((skill) => (
                            <span
                                key={skill}
                                className="text-xs font-medium text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700/60 hover:border-blue-500/50 hover:text-white transition-colors"
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