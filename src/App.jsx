import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FloatingButton from './components/FloatingButton'
import Footer from './components/Footer'

function App() {
  const [isDark, setIsDark] = useState(() => {
    // Respect OS preference on first load
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('votewise-theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const [language, setLanguage] = useState('English')

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('votewise-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('votewise-theme', 'light')
    }
  }, [isDark])

  return (
    <div className="min-h-screen flex flex-col bg-surface-light dark:bg-surface-dark transition-colors duration-300">
      <Navbar
        isDark={isDark}
        toggleDark={() => setIsDark(!isDark)}
        language={language}
        setLanguage={setLanguage}
      />
      <main className="flex-1">
        <Hero language={language} />
      </main>
      <Footer />
      <FloatingButton />
    </div>
  )
}

export default App
