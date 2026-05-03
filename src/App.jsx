import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MenuBar from './components/MenuBar'
import Hero from './components/Hero'
import ElectionTimeline from './components/ElectionTimeline'
import VoterGuide from './components/VoterGuide'
import Glossary from './components/Glossary'
import Quiz from './components/Quiz'
import FloatingButton from './components/FloatingButton'
import Footer from './components/Footer'
import GeminiChat from './components/GeminiChat'

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
  const [isChatOpen, setIsChatOpen] = useState(false)

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
      {/* Tricolor bar */}
      <div className="tricolor-bar" aria-hidden="true">
        <div className="tricolor-bar-saffron" />
        <div className="tricolor-bar-white" />
        <div className="tricolor-bar-green" />
      </div>
      <Navbar
        isDark={isDark}
        toggleDark={() => setIsDark(!isDark)}
        language={language}
        setLanguage={setLanguage}
      />
      <MenuBar onOpenChat={() => setIsChatOpen(true)} />
      <main className="flex-1">
        <Hero language={language} onOpenChat={() => setIsChatOpen(true)} />
        <div id="election-timeline">
          <ElectionTimeline />
        </div>
        <div id="voter-guide">
          <VoterGuide />
        </div>
        <div id="glossary">
          <Glossary />
        </div>
        <div id="quiz">
          <Quiz />
        </div>
      </main>
      <Footer />
      <div onClick={() => setIsChatOpen(!isChatOpen)}>
        <FloatingButton />
      </div>
      <GeminiChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}

export default App
