import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function HomeFooter() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center space-x-2 text-blue-600 font-bold text-xl mb-4">
              <GraduationCap className="h-6 w-6" />
              <span>Arkiva</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs text-center md:text-left">
              The modern platform for students to track grades, analyze performance, and achieve academic excellence.
            </p>
          </div>

          <div className="flex space-x-6">
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
            <Link href="#features" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <a href="https://github.com/WilbertFE/Arkiva" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              GitHub
            </a>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Arkiva. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-xs text-slate-400 hover:text-slate-600">Privacy</Link>
            <Link href="/terms" className="text-xs text-slate-400 hover:text-slate-600">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
