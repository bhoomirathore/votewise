import { useState, useRef, useEffect } from 'react'
import {
  Megaphone,
  ClipboardList,
  UserCheck,
  Mic2,
  Vote,
  BarChart3,
  Crown,
  ChevronDown,
  Clock,
  Users,
  Info,
  BookMarked,
  CheckCircle2,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   Timeline data — all hardcoded, no API calls
───────────────────────────────────────────── */
const STAGES = [
  {
    id: 'stage-announcement',
    number: 1,
    icon: Megaphone,
    title: 'Election Announcement',
    subtitle: 'Model Code of Conduct Activated',
    color: '#1A73E8',
    lightBg: 'bg-blue-50 dark:bg-blue-950/30',
    borderAccent: 'border-blue-300 dark:border-blue-700',
    badgeColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
    what: 'The Election Commission of India (ECI) formally announces election dates through a press conference. Simultaneously, the Model Code of Conduct (MCC) comes into force, restricting government activities to prevent misuse of state resources by ruling parties.',
    who: 'Election Commission of India (ECI) — a constitutional body under Article 324.',
    duration: 'Announcement is a single day event; MCC stays active until results are declared.',
    example: 'In the 2024 Lok Sabha General Election, ECI announced the schedule on 16 March 2024. The MCC immediately froze new government schemes and policy announcements by the ruling coalition.',
  },
  {
    id: 'stage-voter-roll',
    number: 2,
    icon: ClipboardList,
    title: 'Voter Roll Finalization',
    subtitle: 'Electoral Rolls Published & Corrections Closed',
    color: '#0F9D58',
    lightBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderAccent: 'border-emerald-300 dark:border-emerald-700',
    badgeColor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300',
    what: 'The final electoral roll (voter list) is published and made available online. Citizens can check their names, verify booth numbers, and raise last-minute correction requests. After the cutoff, no new additions or deletions are permitted.',
    who: 'ECI coordinates with State/UT Chief Electoral Officers and District Election Officers who manage grassroots booth-level verification.',
    duration: 'Corrections close ~7–10 days before the filing of nominations begins.',
    example: 'Before the 2023 Karnataka Assembly elections, ECI launched the Voter Helpline 1950 campaign to help citizens verify enrollment. Over 5.2 crore voters were registered, with a surge in first-time youth voters aged 18–19.',
  },
  {
    id: 'stage-nomination',
    number: 3,
    icon: UserCheck,
    title: 'Candidate Nomination & Scrutiny',
    subtitle: 'Filing, Scrutiny, and Withdrawal of Candidatures',
    color: '#F4B400',
    lightBg: 'bg-amber-50 dark:bg-amber-950/30',
    borderAccent: 'border-amber-300 dark:border-amber-700',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300',
    what: 'Candidates file nomination papers with a security deposit (₹25,000 for Lok Sabha; ₹10,000 for State Assembly). Returning Officers scrutinize each nomination for eligibility. Candidates can then withdraw within a set window. Surviving candidates receive official symbols.',
    who: 'Returning Officers (district-level IAS officers) oversee the process; political parties allocate reserved symbols to candidates.',
    duration: 'Nomination: ~2 weeks. Scrutiny: 1 day after last nomination date. Withdrawal: 2 days after scrutiny.',
    example: 'In the 2019 Varanasi Lok Sabha seat, Narendra Modi\'s nomination papers filled three lorry loads after his massive rally. The returning officer\'s scrutiny took hours but cleared all papers. 8 candidates ultimately contested after withdrawals.',
  },
  {
    id: 'stage-campaign',
    number: 4,
    icon: Mic2,
    title: 'Campaign Period',
    subtitle: 'Political Rallies, Debates & Outreach',
    color: '#AB47BC',
    lightBg: 'bg-purple-50 dark:bg-purple-950/30',
    borderAccent: 'border-purple-300 dark:border-purple-700',
    badgeColor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
    what: 'Candidates and parties campaign through rallies, door-to-door visits, print/digital advertising, and media debates. All campaign spending is monitored against statutory limits. Campaign must cease 48 hours before polling (the "silence period").',
    who: 'Political parties and candidates campaign; ECI\'s expenditure observers and media certification committees monitor compliance. Paid news cases are flagged to the Media Certification & Monitoring Committees (MCMCs).',
    duration: '14–21 days from the last date of withdrawal to polling day, ending 48 hours before voting.',
    example: 'During the 2024 Lok Sabha campaign, ECI seized ₹4,650 crore worth of cash, liquor, drugs, and freebies — the highest-ever seizure in Indian electoral history — highlighting enforcement during the campaign period.',
  },
  {
    id: 'stage-voting',
    number: 5,
    icon: Vote,
    title: 'Voting Day',
    subtitle: 'Polling at Booths Across the Country',
    color: '#1A73E8',
    lightBg: 'bg-sky-50 dark:bg-sky-950/30',
    borderAccent: 'border-sky-300 dark:border-sky-700',
    badgeColor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300',
    what: 'Registered voters cast their vote on Electronic Voting Machines (EVMs) at their designated polling booth. A Voter Verifiable Paper Audit Trail (VVPAT) slip is generated for transparency. Central paramilitary forces are deployed for security. Mock polling is done before opening.',
    who: 'Presiding Officers and Polling Officers manage each booth; Central and State police maintain order. Observers appointed by ECI oversee each constituency.',
    duration: 'Voting is typically 7 AM – 6 PM (varies by state/region). For Lok Sabha, voting happens across multiple phases spanning weeks.',
    example: 'The 2024 Lok Sabha election was conducted in 7 phases (19 April – 1 June 2024). Voter turnout was 65.79% — over 64 crore votes cast across 10.5 lakh polling stations, making it the world\'s largest democratic exercise.',
  },
  {
    id: 'stage-counting',
    number: 6,
    icon: BarChart3,
    title: 'Vote Counting & Results',
    subtitle: 'EVM Counting, Trends & Declaration',
    color: '#E53935',
    lightBg: 'bg-rose-50 dark:bg-rose-950/30',
    borderAccent: 'border-rose-300 dark:border-rose-700',
    badgeColor: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300',
    what: 'EVMs are transported under strict security from strong rooms to counting centres. Counting begins with postal ballots and ETPBS (Electronically Transmitted Postal Ballot System) first, then proceeds to EVM counting. Results are declared round-by-round; the Election Commission releases real-time data online.',
    who: 'Returning Officers declare constituency results; the ECI compiles the national picture. Candidates and authorized counting agents are permitted inside counting halls.',
    duration: 'Usually 1 counting day from 8 AM; results for all constituencies typically emerge within 12–18 hours for large elections.',
    example: 'On 4 June 2024 (counting day for 2024 Lok Sabha), trends began rolling in from 8 AM. By afternoon, the NDA coalition\'s tally was confirmed. The ECI\'s live dashboard logged over 2 crore page views — a record for civic technology engagement.',
  },
  {
    id: 'stage-oath',
    number: 7,
    icon: Crown,
    title: 'Oath Taking & Government Formation',
    subtitle: 'Cabinet Sworn In; New Governance Begins',
    color: '#FF6F00',
    lightBg: 'bg-orange-50 dark:bg-orange-950/30',
    borderAccent: 'border-orange-300 dark:border-orange-700',
    badgeColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300',
    what: 'The party or coalition with majority support stakes its claim to form the government. The President (for Union) or Governor (for States) invites the leader to form the government. The Prime Minister/Chief Minister and Cabinet Ministers are sworn in. The outgoing government enters caretaker status until the new ministry is constituted.',
    who: 'The President of India (for Centre) or State Governor administers the oath; the Chief Justice of the relevant court is often present. The winning party/coalition elects its legislative party leader before the swearing-in.',
    duration: 'From results to oath-taking: typically 7–15 days, allowing coalition negotiations and President/Governor deliberations.',
    example: 'On 9 June 2024, Narendra Modi was sworn in as Prime Minister for a third consecutive term at Rashtrapati Bhavan. 72 Cabinet Ministers took the oath, including members from NDA alliance partners — the largest cabinet in recent memory.',
  },
]

/* ─────────────────────────────────────────────
   Info row sub-component
───────────────────────────────────────────── */
function InfoRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex gap-3 items-start">
      <div
        className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}18` }}
      >
        <Icon className="w-3.5 h-3.5" style={{ color }} strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary dark:text-text-secondary-dark mb-1">
          {label}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Animated expand panel
───────────────────────────────────────────── */
function ExpandPanel({ stage, isOpen }) {
  const panelRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (panelRef.current) {
      setHeight(isOpen ? panelRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div
      style={{ height, overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.4,0,0.2,1)' }}
      role="region"
      aria-label={`Details for ${stage.title}`}
    >
      <div ref={panelRef}>
        <div className={`mx-4 mb-4 md:mx-6 md:mb-6 rounded-xl border ${stage.borderAccent} ${stage.lightBg} p-4 md:p-5 grid gap-4 sm:grid-cols-2`}>
          <InfoRow icon={Info} label="What Happens" value={stage.what} color={stage.color} />
          <InfoRow icon={Users} label="Who is Responsible" value={stage.who} color={stage.color} />
          <InfoRow icon={Clock} label="Typical Duration" value={stage.duration} color={stage.color} />
          <InfoRow icon={BookMarked} label="Real Example" value={stage.example} color={stage.color} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Single stage card
───────────────────────────────────────────── */
function StageCard({ stage, isActive, onToggle, isLast }) {
  const Icon = stage.icon

  return (
    <div className="relative flex md:flex-col items-stretch">
      {/* Connector line */}
      {!isLast && (
        <>
          {/* Desktop: horizontal connector */}
          <div
            className="hidden md:block absolute top-[2.65rem] left-[calc(50%+2rem)] right-0 h-0.5 z-0"
            style={{
              background: isActive
                ? `linear-gradient(90deg, ${stage.color}80, ${stage.color}20)`
                : 'var(--connector-color, #E2E8F4)',
            }}
          />
          {/* Mobile: vertical connector */}
          <div
            className="md:hidden absolute left-[1.65rem] top-[4.2rem] bottom-0 w-0.5 z-0"
            style={{
              background: isActive
                ? `linear-gradient(180deg, ${stage.color}80, ${stage.color}10)`
                : 'var(--connector-color, #E2E8F4)',
            }}
          />
        </>
      )}

      <div className="flex-1 z-10">
        <button
          id={stage.id}
          aria-expanded={isActive}
          aria-controls={`${stage.id}-panel`}
          onClick={onToggle}
          className={`
            group w-full text-left rounded-2xl border-2 transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            ${isActive
              ? 'border-[color:var(--stage-color)] shadow-lg shadow-[color:var(--stage-color)]/20 bg-white dark:bg-card-dark'
              : 'border-border-light dark:border-border-dark bg-white/70 dark:bg-card-dark/70 hover:border-[color:var(--stage-color)]/50 hover:bg-white dark:hover:bg-card-dark hover:shadow-md'
            }
          `}
          style={{ '--stage-color': stage.color, focusRingColor: stage.color }}
        >
          {/* Card header */}
          <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5">
            {/* Number + icon bubble */}
            <div className="relative flex-shrink-0">
              <div
                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-105"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${stage.color}, ${stage.color}cc)`
                    : `${stage.color}15`,
                }}
              >
                <Icon
                  className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300"
                  style={{ color: isActive ? '#fff' : stage.color }}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
              {/* Stage number badge */}
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white shadow"
                style={{ backgroundColor: stage.color }}
                aria-hidden="true"
              >
                {stage.number}
              </span>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  className="font-bold text-sm md:text-base text-gray-900 dark:text-white leading-tight"
                >
                  {stage.title}
                </h3>
                {isActive && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${stage.color}18`, color: stage.color }}
                  >
                    <CheckCircle2 className="w-2.5 h-2.5" strokeWidth={2.5} />
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-0.5 leading-snug truncate">
                {stage.subtitle}
              </p>
            </div>

            {/* Chevron */}
            <ChevronDown
              className="w-5 h-5 flex-shrink-0 transition-transform duration-300 text-text-secondary dark:text-text-secondary-dark"
              style={{
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                color: isActive ? stage.color : undefined,
              }}
              aria-hidden="true"
            />
          </div>
        </button>

        {/* Expand panel */}
        <div id={`${stage.id}-panel`}>
          <ExpandPanel stage={stage} isOpen={isActive} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Desktop dot-connector timeline strip
───────────────────────────────────────────── */
function TimelineStrip({ activeIdx }) {
  return (
    <div className="hidden md:flex items-center justify-between mb-6 px-6 relative" aria-hidden="true">
      {STAGES.map((stage, i) => (
        <div key={stage.id} className="flex flex-col items-center gap-1 relative z-10 flex-1">
          {/* Dot */}
          <div
            className="w-3 h-3 rounded-full border-2 transition-all duration-300"
            style={{
              borderColor: stage.color,
              backgroundColor: i <= activeIdx ? stage.color : 'transparent',
              boxShadow: i === activeIdx ? `0 0 0 4px ${stage.color}30` : 'none',
            }}
          />
        </div>
      ))}
      {/* Full progress bar behind */}
      <div className="absolute top-[5px] left-[calc(100%/14)] right-[calc(100%/14)] h-0.5 bg-border-light dark:bg-border-dark z-0 rounded-full">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            background: 'linear-gradient(90deg, #1A73E8, #4a9af5)',
            width: activeIdx < 0 ? '0%' : `${((activeIdx + 0.5) / STAGES.length) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main exported component
───────────────────────────────────────────── */
export default function ElectionTimeline() {
  const [activeId, setActiveId] = useState(null)

  const activeIdx = STAGES.findIndex((s) => s.id === activeId)

  function toggle(id) {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="election-timeline"
      aria-labelledby="timeline-heading"
      className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-surface-light dark:bg-surface-dark overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-eci-blue/5 dark:bg-eci-blue/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-300/8 dark:bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-eci-blue/10 dark:bg-eci-blue/15 border border-eci-blue/20 dark:border-eci-blue/30 mb-5">
            <BarChart3 className="w-3.5 h-3.5 text-eci-blue dark:text-eci-blue-light" />
            <span className="text-xs sm:text-sm font-semibold text-eci-blue dark:text-eci-blue-light tracking-wide uppercase">
              Module 1
            </span>
          </div>
          <h2
            id="timeline-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white"
          >
            Election{' '}
            <span className="text-gradient">Timeline</span>{' '}
            Explorer
          </h2>
          <p className="mt-4 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark max-w-2xl mx-auto leading-relaxed">
            India's election journey unfolds in <strong className="text-gray-800 dark:text-gray-200">7 key stages</strong>.
            Click any stage to discover what happens, who's responsible, and a real example.
          </p>
        </div>

        {/* Progress strip (desktop only) */}
        <TimelineStrip activeIdx={activeIdx} />

        {/* Stage cards grid — single column on mobile, responsive single column stacked on desktop too */}
        <div
          className="grid grid-cols-1 gap-3 md:gap-4"
          role="list"
          aria-label="Election timeline stages"
        >
          {STAGES.map((stage, i) => (
            <div key={stage.id} role="listitem">
              <StageCard
                stage={stage}
                isActive={activeId === stage.id}
                onToggle={() => toggle(stage.id)}
                isLast={i === STAGES.length - 1}
              />
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-center mt-8 text-xs text-text-secondary dark:text-text-secondary-dark">
          All information is sourced from the{' '}
          <span className="text-eci-blue dark:text-eci-blue-light font-medium">
            Election Commission of India
          </span>{' '}
          and publicly available data. Non-partisan &amp; verified.
        </p>
      </div>
    </section>
  )
}
