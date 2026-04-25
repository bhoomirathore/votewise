import { Vote, Heart, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-border-light dark:border-border-dark bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Brand mark */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-eci-blue/90 flex items-center justify-center">
              <Vote className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm text-gray-700 dark:text-gray-300">
              Vote<span className="text-eci-blue">Wise</span>
            </span>
          </div>

          {/* Disclaimer text */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-text-secondary dark:text-text-secondary-dark font-medium tracking-wide">
              Non-partisan · Built for civic awareness · Not affiliated with ECI
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1.5 text-xs text-text-secondary dark:text-text-secondary-dark">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>for democracy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
