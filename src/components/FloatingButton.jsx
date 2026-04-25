import { MessageCircle, Sparkles } from 'lucide-react'

export default function FloatingButton() {
  return (
    <button
      id="ask-votewise-fab"
      className="fab-button group"
      aria-label="Ask VoteWise — Open AI chat assistant"
      title="Ask VoteWise"
    >
      {/* Pulsing background ring */}
      <span className="absolute inset-0 rounded-full bg-eci-blue animate-ping opacity-20 pointer-events-none" />

      <MessageCircle
        className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
        strokeWidth={2}
      />
      <span className="hidden sm:inline font-semibold tracking-wide">Ask VoteWise</span>

      {/* Small sparkle badge */}
      <span className="hidden sm:flex items-center justify-center w-4 h-4 rounded-full bg-white/20 ml-0.5">
        <Sparkles className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
      </span>
    </button>
  )
}
