import { useState, useEffect } from 'react';
import { Home, BarChart2, ClipboardList, BookOpen, Brain, MessageCircle } from 'lucide-react';

const MENU_ITEMS = [
  { label: 'Home',               icon: Home,          id: 'home' },
  { label: 'Election Timeline',  icon: BarChart2,      id: 'election-timeline' },
  { label: 'Voter Guide',        icon: ClipboardList,  id: 'voter-guide' },
  { label: 'Glossary',           icon: BookOpen,       id: 'glossary' },
  { label: 'Quiz',               icon: Brain,          id: 'quiz' },
  { label: 'Ask VoteWise AI',    icon: MessageCircle,  id: 'chat' },
];

export default function MenuBar({ onOpenChat }) {
  const [active, setActive] = useState('home');

  /* ── Intersection Observer — highlight visible section ── */
  useEffect(() => {
    const sectionIds = ['election-timeline', 'voter-guide', 'glossary', 'quiz'];
    const observers = [];

    const cb = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(cb, { threshold: 0.3 });
      obs.observe(el);
      observers.push(obs);
    });

    // detect scroll back to very top → activate Home
    const onScroll = () => {
      if (window.scrollY < 80) setActive('home');
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ── Click handler ── */
  const handleClick = (id) => {
    if (id === 'chat') {
      onOpenChat();
      return;
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActive('home');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActive(id);
    }
  };

  return (
    <>
      {/* ── Desktop menu bar (hidden on mobile) ── */}
      <nav
        aria-label="Section navigation"
        style={{
          width: '100%',
          height: '44px',
          background: '#1a1a2e',
          borderBottom: '2px solid #1A73E8',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
        className="hidden md:flex"
      >
        <ul style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}>
          {MENU_ITEMS.map(({ label, icon: Icon, id }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  aria-label={`Navigate to ${label}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 16px',
                    fontSize: '13px',
                    fontWeight: isActive ? '600' : '400',
                    color: isActive ? '#ffffff' : '#94A3B8',
                    background: 'none',
                    border: 'none',
                    borderBottom: isActive ? '2px solid #1A73E8' : '2px solid transparent',
                    cursor: 'pointer',
                    transition: 'color 0.2s, border-color 0.2s',
                    height: '44px',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderBottomColor = '#1A73E8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = '#94A3B8';
                      e.currentTarget.style.borderBottomColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Mobile bottom navigation bar (visible only below md) ── */}
      <nav
        aria-label="Bottom navigation"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '56px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 50,
          boxShadow: '0 -2px 12px rgba(0,0,0,0.08)',
        }}
        className="flex md:hidden"
      >
        {MENU_ITEMS.map(({ label, icon: Icon, id }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => handleClick(id)}
              aria-label={label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                height: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? '#1A73E8' : '#94A3B8',
                transition: 'color 0.2s',
              }}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            </button>
          );
        })}
      </nav>

      {/* Spacer so content isn't hidden behind mobile bottom nav */}
      <div className="block md:hidden" style={{ height: '56px' }} aria-hidden="true" />
    </>
  );
}
