import { useState, useEffect } from 'react';
import { Menu, X, Terminal, Mail } from 'lucide-react';
import { CONFIG } from '../constants/constants';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: "Flagship", href: "#flagship" },
        { label: "Experience", href: "#experience" },
        { label: "Case Studies", href: "#case-studies" },
        { label: "Philosophy", href: "#philosophy" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled
                    ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3"
                    : "bg-slate-900/50 backdrop-blur-xs py-4 border-b border-slate-800/30"
            }`}
        >
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                {/* Brand / Logo */}
                <a
                    href="#"
                    className="flex items-center gap-2 text-white font-bold text-sm tracking-tight hover:text-blue-400 transition"
                >
                    <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-sm">
                        <Terminal size={14} />
                    </div>
                    <span>{CONFIG.name}</span>
                </a>

                {/* Desktop Nav Items */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-xs font-semibold text-slate-300 hover:text-blue-400 uppercase tracking-wider transition"
                        >
                            {item.label}
                        </a>
                    ))}

                    <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg shadow-sm transition"
                    >
                        <Mail size={13} /> Contact
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-slate-400 hover:text-white p-1"
                    aria-label="Toggle Menu"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-4 space-y-3">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-slate-300 hover:text-blue-400 py-1"
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex items-center gap-2 text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 w-full justify-center"
                    >
                        <Mail size={14} /> Contact
                    </a>
                </div>
            )}
        </nav>
    );
};
