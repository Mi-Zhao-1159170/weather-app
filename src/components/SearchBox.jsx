import { Ungroup } from "lucide-react";
import { useState } from "react";

function SearchBox( {onSearch}) {

    const [input, setInput] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!input.trim()) return
        onSearch(input.trim())
        setInput('')
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full mb-8">
            <div className="relative flex-grow">
                <input
                type="text"
                placeholder="Please enter city name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white shadow-sm outline-none transition-all focus:bg-white focus:shadow-md focus:ring-1 focus:ring-blue-300 placeholder:text-gray-400 text-gray-700"
            />
            </div>
            
            <button 
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 active:scale-95 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all duration-200 flex items-center justify-center"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBox;