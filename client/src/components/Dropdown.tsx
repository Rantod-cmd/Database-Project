// components/ui/Dropdown.tsx
import { ChevronDown } from "lucide-react";

interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: DropdownOption[];
    placeholder?: string;
    className?: string;
}

export default function Dropdown({ 
    label, 
    value, 
    onChange, 
    options, 
    placeholder,
    className = ""
}: DropdownProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                    {label}
                </label>
            )}
            <div className="relative group">
                <select
                    className="w-full appearance-none bg-white border border-slate-200 rounded-md py-3.5 pl-4 pr-12 text-sm font-bold text-slate-700 outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 transition-all cursor-pointer shadow-sm hover:border-slate-300"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value} className="py-2">
                            {opt.label}
                        </option>
                    ))}
                </select>
                
                {/* Custom Arrow Decoration */}
                <div className="absolute right-0 top-0 h-full w-11 flex items-center justify-center border-l border-slate-100 pointer-events-none group-focus-within:border-emerald-100">
                    <ChevronDown className="text-slate-400 group-focus-within:text-emerald-600 w-4 h-4 transition-colors" />
                </div>
            </div>
        </div>
    );
}