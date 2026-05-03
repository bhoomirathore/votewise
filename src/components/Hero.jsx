import { BookOpen, CheckSquare, MessageCircleQuestion, ArrowRight, Sparkles, Shield, Users } from 'lucide-react'

const TAGLINES = {
  'English': { main: 'Know Your Vote.', sub: 'Know Your Power.', desc: 'Your democratic right, explained clearly. Explore the election process, learn how to vote, and ask anything — in your language.' },
  'हिन्दी': { main: 'अपना वोट जानें।', sub: 'अपनी शक्ति जानें।', desc: 'आपका लोकतांत्रिक अधिकार, सरल भाषा में। चुनाव प्रक्रिया जानें, मतदान करना सीखें।' },
  'தமிழ்': { main: 'உங்கள் வாக்கை அறிந்துகொள்ளுங்கள்.', sub: 'உங்கள் சக்தியை அறிந்துகொள்ளுங்கள்.', desc: 'உங்கள் ஜனநாயக உரிமை, தெளிவாக விளக்கப்பட்டுள்ளது.' },
  'বাংলা': { main: 'আপনার ভোট জানুন।', sub: 'আপনার শক্তি জানুন।', desc: 'আপনার গণতান্ত্রিক অধিকার, সহজ ভাষায়। নির্বাচন প্রক্রিয়া জানুন।' },
}

const CARDS = [
  {
    id: 'card-election-process',
    icon: BookOpen,
    accentIcon: Shield,
    title: 'Understand the\nElection Process',
    description: 'From voter registration to result declaration — learn how India\'s election system works, step by step.',
    badge: 'Learn',
    badgeColor: 'bg-saffron-light text-saffron border border-saffron/30',
    topBorder: 'border-t-saffron',
    iconBg: 'bg-saffron',
    delay: 'animate-delay-100',
  },
  {
    id: 'card-how-to-vote',
    icon: CheckSquare,
    accentIcon: Users,
    title: 'How Do\nI Vote?',
    description: 'First-time voter? Find your booth, check your name on the electoral roll, and know what to bring on polling day.',
    badge: 'Guide',
    badgeColor: 'bg-green-50 text-india-green border border-india-green/30',
    topBorder: 'border-t-india-green',
    iconBg: 'bg-india-green',
    delay: 'animate-delay-200',
  },
  {
    id: 'card-ask-question',
    icon: MessageCircleQuestion,
    accentIcon: Sparkles,
    title: 'Ask a\nQuestion',
    description: 'Have a question about voting rights, candidates, or procedures? Get clear, unbiased answers instantly.',
    badge: 'AI Chat',
    badgeColor: 'bg-blue-50 text-eci-blue border border-eci-blue/30',
    topBorder: 'border-t-eci-blue',
    iconBg: 'bg-eci-blue',
    delay: 'animate-delay-300',
  },
]

function EntryCard({ card, onClick }) {
  const Icon = card.icon
  const AccentIcon = card.accentIcon

  return (
    <div
      id={card.id}
      className={`entry-card p-6 sm:p-8 animate-slide-up ${card.delay} border-t-[3px]`}
      style={{ borderTopColor: card.id === 'card-election-process' ? '#FF9933' : card.id === 'card-how-to-vote' ? '#138808' : '#1A73E8' }}
      role="button"
      tabIndex={0}
      aria-label={card.title.replace('\n', ' ')}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Accent icon top right */}
      <div className="absolute top-4 right-4 opacity-10 transition-opacity duration-300">
        <AccentIcon className="w-16 h-16 text-saffron" strokeWidth={1} />
      </div>

      <div className="relative z-10 flex flex-col h-full gap-5">
        {/* Badge + Icon */}
        <div className="flex items-start justify-between">
          <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-lg transition-transform duration-300`}>
            <Icon className="w-7 h-7 text-white" strokeWidth={1.75} />
          </div>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${card.badgeColor}`}>
            {card.badge}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary dark:text-text-primary-dark leading-tight whitespace-pre-line">
          {card.title}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-text-secondary dark:text-text-secondary-dark leading-relaxed flex-1">
          {card.description}
        </p>

        {/* CTA Arrow */}
        <div className="flex items-center gap-2 text-saffron font-semibold text-sm group-hover:gap-3 transition-all duration-200">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>
  )
}

export default function Hero({ language, onOpenChat }) {
  const tagline = TAGLINES[language] || TAGLINES['English']

  return (
    <section
      id="hero"
      className="relative max-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-10 lg:py-14 overflow-hidden bg-hero-gradient-light dark:bg-hero-gradient-dark"
      aria-label="Hero section"
    >
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-saffron/6 dark:bg-saffron/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-saffron/4 dark:bg-saffron/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center gap-8 lg:gap-10">

        {/* Hero Text */}
        <div className="text-center max-w-3xl animate-fade-in">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/10 dark:bg-saffron/15 border border-saffron/20 dark:border-saffron/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-saffron" />
            <span className="text-xs sm:text-sm font-semibold text-saffron tracking-wide uppercase">
              Civic Education Platform
            </span>
          </div>

          {/* Main tagline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] mb-3">
            <span className="text-gradient">{tagline.main}</span>
            <br />
            <span style={{ color: '#1A0F00' }} className="dark:text-text-primary-dark">{tagline.sub}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark leading-relaxed max-w-2xl mx-auto">
            {tagline.desc}
          </p>
        </div>

        {/* Entry Cards Grid */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          role="list"
          aria-label="Main navigation cards"
        >
          {CARDS.map((card) => {
            let onClickHandler = undefined;
            if (card.id === 'card-election-process') {
              onClickHandler = () => document.getElementById('election-timeline')?.scrollIntoView({ behavior: 'smooth' });
            } else if (card.id === 'card-how-to-vote') {
              onClickHandler = () => document.getElementById('voter-guide')?.scrollIntoView({ behavior: 'smooth' });
            } else if (card.id === 'card-ask-question') {
              onClickHandler = onOpenChat;
            }

            return <EntryCard key={card.id} card={card} onClick={onClickHandler} />;
          })}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 animate-fade-in animate-delay-300">
          {[
            { icon: Shield, label: 'Non-Partisan' },
            { icon: Users, label: 'For Every Citizen' },
            { icon: BookOpen, label: 'Verified Information' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-text-secondary dark:text-text-secondary-dark text-sm">
              <Icon className="w-4 h-4 text-saffron/70 dark:text-saffron/60" strokeWidth={1.75} />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
