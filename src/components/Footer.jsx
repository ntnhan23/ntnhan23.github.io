import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full relative z-20 border-t border-neutral-200 mt-20 bg-[#fafafa]/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center text-slate-500 font-sans text-sm">
        <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start tracking-wide">
          <span className="font-clash font-semibold text-slate-900 uppercase tracking-widest mb-1 text-base">NAHN</span>
          <p>© {currentYear} All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-indigo-500 transition-colors">GitHub</a>
          <a href="#" className="hover:text-indigo-500 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
