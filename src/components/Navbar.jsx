import { Sun, Moon, Vote } from 'lucide-react'

const LANGUAGES = ['English', 'हिन्दी', 'தமிழ்', 'বাংলা']

const LANG_LABELS = {
  'English': 'EN',
  'हिन्दी': 'HI',
  'தமிழ்': 'TA',
  'বাংলা': 'BN',
}

export default function Navbar({ isDark, toggleDark, language, setLanguage }) {
  return (
    <header className="sticky top-[4px] z-40 w-full navbar-glass">
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo / Brand */}
        <a
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="VoteWise Home"
        >
          <div className="w-9 h-9 rounded-xl bg-saffron flex items-center justify-center shadow-saffron group-hover:scale-110 transition-transform duration-200">
            <Vote className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg tracking-tight" style={{ color: '#1A0F00' }}>
              <span className="text-saffron">Vote</span>
              <span className="dark:text-text-primary-dark">Wise</span>
            </span>
            <span className="text-[10px] font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-widest hidden sm:block">
              Know Your Vote
            </span>
          </div>
        </a>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="lang-select-wrapper" title="Select Language">
            <select
              id="language-selector"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select"
              aria-label="Language selector"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {LANG_LABELS[lang]} · {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={toggleDark}
            className="theme-toggle"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4" strokeWidth={2} />
            ) : (
              <Moon className="w-4 h-4" strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
