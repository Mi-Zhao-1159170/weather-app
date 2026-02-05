import { Moon, Sun } from 'lucide-react';

function Navbar({ isDark, onToggle }){
    return (
        <nav className='flex justify-between items-center px-8 py-5 bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50'>
            
            <h1 className="text-xl font-black text-white tracking-widest uppercase">
                Weather <span className={isDark ? "text-indigo-400" : "text-slate-700/90"}>App</span>
            </h1>

            <button 
                onClick={onToggle}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90 text-white border border-white/20">
                {isDark ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
            </button>
        </nav>
    )
}

export default Navbar;