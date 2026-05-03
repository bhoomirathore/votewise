import { useState, useEffect, useRef } from 'react'
import {
  UserCheck,
  ClipboardList,
  MapPin,
  Vote,
  CheckCircle,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  Building2,
  TrendingUp,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   Steps data — all hardcoded, no API calls
───────────────────────────────────────────── */
const STEPS = [
  {
    id: 'step-eligibility',
    number: 1,
    icon: UserCheck,
    title: 'Check Your Eligibility',
    description:
      'You must be an Indian citizen, 18 years or older, and a resident of the constituency where you want to vote.',
    body: 'Election Commission of India (ECI)',
    actionLabel: 'Check eligibility rules',
    actionHref: 'https://eci.gov.in',
    hasMap: false,
  },
  {
    id: 'step-register',
    number: 2,
    icon: ClipboardList,
    title: 'Register on the Voter List',
    description:
      "Apply online via the National Voters Service Portal. Fill Form 6 if registering for the first time. You will receive an Elector Photo Identity Card (EPIC).",
    body: 'National Voters Service Portal (NVSP)',
    actionLabel: 'Register now',
    actionHref: 'https://voters.eci.gov.in',
    hasMap: false,
  },
  {
    id: 'step-booth',
    number: 3,
    icon: MapPin,
    title: 'Find Your Polling Booth',
    description:
      'Every voter is assigned a specific polling booth based on their registered address. You can find yours using your EPIC number on the NVSP portal.',
    body: 'Booth Level Officer (BLO)',
    actionLabel: 'Find your booth',
    actionHref: 'https://voters.eci.gov.in/find-polling-station',
    hasMap: true,
    mapSrc:
      'https://maps.google.com/maps?q=polling+booth+near+me&output=embed',
  },
  {
    id: 'step-vote',
    number: 4,
    icon: Vote,
    title: 'Cast Your Vote',
    description:
      'Carry your EPIC card or any of the 12 approved alternate photo IDs to your polling booth. Press the button next to your chosen candidate on the EVM. Collect your VVPAT slip as confirmation.',
    body: 'Presiding Officer at the polling booth',
    actionLabel: 'View approved ID list',
    actionHref: 'https://eci.gov.in',
    hasMap: false,
  },
  {
    id: 'step-verify',
    number: 5,
    icon: CheckCircle,
    title: 'Verify Your Vote Was Counted',
    description:
      'After polling, results are declared constituency-wise. You can track live counting trends on the ECI results portal. Your vote is secret but your participation is counted.',
    body: 'Returning Officer (RO)',
    actionLabel: 'Track election results',
    actionHref: 'https://results.eci.gov.in',
    hasMap: false,
  },
]

const LS_KEY = 'votewise-voter-journey'

/* ─────────────────────────────────────────────
   Progress bar
───────────────────────────────────────────── */
function ProgressBar({ completed, total }) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0
  const allDone = completed === total

  return (
    <div className="mb-10 md:mb-12" aria-label={`Progress: ${completed} of ${total} steps completed`}>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Your Progress
        </span>
        <span
          className={`text-sm font-bold tabular-nums transition-colors duration-300 ${
            allDone ? 'text-green-500' : 'text-eci-blue dark:text-eci-blue-light'
          }`}
        >
          {completed}/{total} steps{allDone && ' 🎉'}
        </span>
      </div>

      <div className="relative h-3 w-full bg-gray-200 dark:bg-gray-700/60 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            background: allDone
              ? 'linear-gradient(90deg,#138808,#22c55e)'
              : 'linear-gradient(90deg,#FF9933,#E6872A)',
          }}
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
        />
        {/* Shimmer */}
        {pct > 0 && pct < 100 && (
          <div
            className="absolute inset-y-0 left-0 rounded-full opacity-60"
            style={{
              width: `${pct}%`,
              background:
                'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)',
              animation: 'shimmer 2s infinite',
            }}
          />
        )}
      </div>

      {allDone && (
        <p className="mt-2.5 text-center text-xs font-semibold text-green-500 animate-fade-in">
          You're all set to vote! 🗳️
        </p>
      )}
    </div>
  )
}



/* ─────────────────────────────────────────────
   Single step card
───────────────────────────────────────────── */
function StepCard({ step, checked, onToggle, index, total }) {
  const Icon = step.icon
  const isLast = index === total - 1
  const checkboxId = `${step.id}-checkbox`

  /* slight entrance delay per card */
  const delayMs = index * 80

  return (
    <div
      className={`
        relative flex gap-0 md:gap-0
        transition-all duration-500
      `}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {/* ── Left column: connector + number bubble ── */}
      <div className="flex flex-col items-center mr-4 md:mr-5 flex-shrink-0">
        {/* Number / check bubble */}
        <button
          id={checkboxId}
          role="checkbox"
          aria-checked={checked}
          aria-label={`Mark step ${step.number} "${step.title}" as completed`}
          onClick={onToggle}
          className={`
            relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
            border-2 font-bold text-sm transition-all duration-400 cursor-pointer
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            shadow-md flex-shrink-0
            ${checked
              ? 'bg-green-500 border-green-500 text-white scale-110 shadow-green-400/40 focus-visible:ring-green-500'
              : 'bg-white dark:bg-card-dark border-eci-blue text-eci-blue hover:bg-eci-blue/8 dark:hover:bg-eci-blue/15 focus-visible:ring-eci-blue'
            }
          `}
          style={checked ? { boxShadow: '0 0 0 4px rgba(34,197,94,0.2)' } : {}}
        >
          {checked ? (
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <span aria-hidden="true">{step.number}</span>
          )}
        </button>

        {/* Connector line */}
        {!isLast && (
          <div
            className={`
              w-0.5 flex-1 min-h-[2rem] mt-1 rounded-full transition-colors duration-500
              ${checked ? 'bg-green-400/50' : 'bg-border-light dark:bg-border-dark'}
            `}
          />
        )}
      </div>

      {/* ── Right column: card body ── */}
      <div
        className={`
          flex-1 mb-5 md:mb-6 rounded-2xl border-2 p-5 md:p-6
          transition-all duration-400 ease-out
          ${checked
            ? 'border-green-400/60 dark:border-green-500/50 bg-green-50/60 dark:bg-green-950/20 shadow-md shadow-green-400/10'
            : 'border-border-light dark:border-border-dark bg-white dark:bg-card-dark hover:border-eci-blue/40 hover:shadow-md dark:hover:border-eci-blue/30'
          }
        `}
      >
        {/* Card top row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Icon + title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`
                w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                transition-colors duration-400
                ${checked
                  ? 'bg-green-100 dark:bg-green-900/40'
                  : 'bg-eci-blue/10 dark:bg-eci-blue/15'
                }
              `}
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-400 ${
                  checked ? 'text-green-500' : 'text-eci-blue dark:text-eci-blue-light'
                }`}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </div>

            <h3
              className={`
                font-bold text-base md:text-lg leading-snug transition-all duration-300
                ${checked
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-900 dark:text-white'
                }
              `}
            >
              {step.title}
            </h3>
          </div>

          {/* Done badge */}
          <div
            className={`
              flex-shrink-0 transition-all duration-400
              ${checked ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
            `}
            aria-hidden={!checked}
          >
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
              Done ✓
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm md:text-base text-text-secondary dark:text-text-secondary-dark leading-relaxed mb-4">
          {step.description}
        </p>

        {/* Responsible body tag */}
        <div className="flex items-center gap-2 mb-4">
          <Building2
            className="w-3.5 h-3.5 text-text-secondary dark:text-text-secondary-dark flex-shrink-0"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-text-secondary dark:text-text-secondary-dark">
            {step.body}
          </span>
        </div>

        {/* Action link */}
        <a
          href={step.actionHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${step.actionLabel} — opens in a new tab`}
          className={`
            inline-flex items-center gap-1.5 text-sm font-semibold rounded-lg
            px-4 py-2 border transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
            ${checked
              ? 'border-green-300 dark:border-green-700 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/30 focus-visible:ring-green-500'
              : 'border-eci-blue/30 dark:border-eci-blue/40 text-eci-blue dark:text-eci-blue-light hover:bg-eci-blue/8 dark:hover:bg-eci-blue/15 focus-visible:ring-eci-blue'
            }
          `}
        >
          {step.actionLabel}
          <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
        </a>

        {/* Polling booth link card (replaces Google Maps iframe) */}
        {step.hasMap && (
          <div className="mt-4 p-4 bg-saffron-light border border-saffron rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Find your assigned polling booth using your EPIC number</p>
            <a
              href="https://voters.eci.gov.in/find-polling-station"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-saffron text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-saffron-dark transition-colors"
            >
              Find Your Polling Booth →
            </a>
          </div>
        )}

        {/* "I've completed this step" checkbox row */}
        <label
          htmlFor={`${checkboxId}-native`}
          className={`
            mt-5 flex items-center gap-2.5 cursor-pointer group w-fit
            select-none
          `}
          aria-label={`Mark "${step.title}" as completed`}
        >
          <input
            type="checkbox"
            id={`${checkboxId}-native`}
            checked={checked}
            onChange={onToggle}
            className="sr-only"
          />
          <div
            className={`
              w-5 h-5 rounded-md border-2 flex items-center justify-center
              transition-all duration-300
              ${checked
                ? 'bg-green-500 border-green-500'
                : 'border-gray-300 dark:border-gray-600 group-hover:border-eci-blue dark:group-hover:border-eci-blue-light'
              }
            `}
            aria-hidden="true"
          >
            {checked && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span
            className={`
              text-sm font-medium transition-colors duration-300
              ${checked
                ? 'text-green-600 dark:text-green-400'
                : 'text-text-secondary dark:text-text-secondary-dark group-hover:text-gray-700 dark:group-hover:text-gray-300'
              }
            `}
          >
            I've completed this step
          </span>
        </label>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Desktop horizontal stepper strip
───────────────────────────────────────────── */
function HorizontalStepper({ steps, checked }) {
  const completedCount = steps.filter((s) => checked[s.id]).length

  return (
    <div
      className="hidden md:flex items-center mb-10 relative"
      aria-hidden="true"
      role="presentation"
    >
      {steps.map((step, i) => {
        const Icon = step.icon
        const done = checked[step.id]
        const isLast = i === steps.length - 1

        return (
          <div key={step.id} className="flex items-center flex-1">
            {/* Bubble */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className={`
                  w-11 h-11 rounded-full flex items-center justify-center
                  border-2 shadow transition-all duration-400
                  ${done
                    ? 'bg-green-500 border-green-500 shadow-green-400/30'
                    : i < completedCount
                      ? 'bg-eci-blue border-eci-blue shadow-eci-blue/20'
                      : 'bg-white dark:bg-card-dark border-border-light dark:border-border-dark'
                  }
                `}
              >
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                ) : (
                  <Icon
                    className={`w-5 h-5 ${i < completedCount ? 'text-white' : 'text-text-secondary dark:text-text-secondary-dark'}`}
                    strokeWidth={1.75}
                  />
                )}
              </div>
              <span
                className={`
                  text-[11px] font-semibold text-center max-w-[72px] leading-tight
                  ${done ? 'text-green-500' : 'text-text-secondary dark:text-text-secondary-dark'}
                `}
              >
                {step.title.split(' ').slice(0, 3).join(' ')}
              </span>
            </div>

            {/* Connector */}
            {!isLast && (
              <div className="flex-1 mx-2 h-0.5 rounded-full overflow-hidden bg-border-light dark:bg-border-dark">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: done ? '100%' : '0%',
                    background: 'linear-gradient(90deg,#22c55e,#4ade80)',
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main exported component
───────────────────────────────────────────── */
export default function VoterGuide() {
  const [checked, setChecked] = useState(() => {
    try {
      const saved = localStorage.getItem(LS_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  /* Persist to localStorage whenever checked changes */
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(checked))
    } catch {
      /* ignore storage errors */
    }
  }, [checked])

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function resetJourney() {
    setChecked({})
    try {
      localStorage.removeItem(LS_KEY)
    } catch { /* ignore */ }
  }

  const completedCount = STEPS.filter((s) => checked[s.id]).length

  return (
    <section
      id="voter-guide"
      aria-labelledby="voter-guide-heading"
      className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 overflow-hidden"
      style={{ background: '#FFFFFF' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-green-400/5 dark:bg-green-500/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-eci-blue/5 dark:bg-eci-blue/3 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-10 md:mb-12">
          <div className="module-badge">
            <span className="module-badge-line" />
            <span className="module-badge-text">Module 2</span>
            <span className="module-badge-line" />
          </div>

          <h2
            id="voter-guide-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white"
          >
            Your{' '}
            <span className="text-gradient">Voter</span>{' '}
            Journey
          </h2>

          <p className="mt-4 text-base sm:text-lg text-text-secondary dark:text-text-secondary-dark max-w-xl mx-auto leading-relaxed">
            Five simple steps every Indian citizen needs to know before polling day.
          </p>
        </div>

        {/* ── Desktop horizontal stepper ── */}
        <HorizontalStepper steps={STEPS} checked={checked} />

        {/* ── Progress bar ── */}
        <ProgressBar completed={completedCount} total={STEPS.length} />

        {/* ── Vertical step cards ── */}
        <div
          role="list"
          aria-label="Voter journey steps"
          className="relative"
        >
          {STEPS.map((step, i) => (
            <div key={step.id} role="listitem">
              <StepCard
                step={step}
                checked={!!checked[step.id]}
                onToggle={() => toggle(step.id)}
                index={i}
                total={STEPS.length}
              />
            </div>
          ))}
        </div>

        {/* ── Reset button ── */}
        <div className="mt-2 flex justify-center">
          <button
            onClick={resetJourney}
            disabled={completedCount === 0}
            aria-label="Reset my voter journey — unchecks all completed steps"
            className={`
              inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
              border transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400
              ${completedCount > 0
                ? 'border-red-200 dark:border-red-800/60 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer'
                : 'border-border-light dark:border-border-dark text-gray-300 dark:text-gray-600 cursor-not-allowed opacity-50'
              }
            `}
          >
            <RotateCcw className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
            Reset my journey
          </button>
        </div>

        {/* ── Footer note ── */}
        <p className="text-center mt-8 text-xs text-text-secondary dark:text-text-secondary-dark">
          Your progress is saved locally on this device. All steps and links are sourced from the{' '}
          <span className="text-eci-blue dark:text-eci-blue-light font-medium">
            Election Commission of India
          </span>
          .
        </p>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  )
}
