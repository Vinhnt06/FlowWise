'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`relative inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 border ${
        theme === 'light'
          ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-sm'
          : 'bg-[#161F30] border-[#2A374F] text-slate-200 hover:bg-[#1E293B] hover:border-[#384A68]'
      } ${className}`}
    >
      {theme === 'light' ? (
        <Sun className="w-4 h-4 text-amber-500 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-sky-400 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
