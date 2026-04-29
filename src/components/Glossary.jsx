import React, { useState, useMemo } from 'react';
import { Search, Globe2, Info } from 'lucide-react';

const GLOSSARY_TERMS = [
  { term: "ECI", fullForm: "Election Commission of India", description: "The constitutional body responsible for administering elections in India, established under Article 324" },
  { term: "EVM", fullForm: "Electronic Voting Machine", description: "A standalone electronic device used to cast and count votes, replacing traditional ballot papers" },
  { term: "VVPAT", fullForm: "Voter Verifiable Paper Audit Trail", description: "A printer attached to the EVM that prints a paper slip showing the candidate voted for, allowing the voter to verify their vote" },
  { term: "NOTA", fullForm: "None of the Above", description: "An option on the ballot allowing voters to reject all candidates without abstaining from voting" },
  { term: "MCC", fullForm: "Model Code of Conduct", description: "A set of guidelines issued by ECI that governs the behavior of political parties and candidates during elections" },
  { term: "EPIC", fullForm: "Elector Photo Identity Card", description: "The official voter ID card issued by ECI, required to vote at polling booths" },
  { term: "Constituency", fullForm: null, description: "A defined geographic area whose residents elect one representative to a legislative body" },
  { term: "Affidavit", fullForm: null, description: "A sworn written statement submitted by candidates declaring their assets, liabilities, criminal record, and educational qualifications" },
  { term: "Returning Officer", fullForm: null, description: "The government official responsible for conducting elections in a constituency and declaring results" },
  { term: "BLO", fullForm: "Booth Level Officer", description: "A government official responsible for maintaining the electoral roll at the booth level" },
  { term: "Form 6", fullForm: null, description: "The application form used by first-time voters to register their name on the electoral roll" },
  { term: "Booth Capturing", fullForm: null, description: "The illegal act of seizing a polling booth and casting fraudulent votes — a cognizable offence under election law" },
  { term: "Anti-Defection Law", fullForm: null, description: "A law under the Tenth Schedule of the Constitution that disqualifies elected members who switch parties" },
  { term: "Lok Sabha", fullForm: null, description: "The lower house of India's Parliament, consisting of 543 elected constituencies" },
  { term: "Rajya Sabha", fullForm: null, description: "The upper house of India's Parliament, whose members are elected by state legislative assemblies" },
  { term: "By-election", fullForm: null, description: "An election held to fill a vacancy in a constituency between two general elections" },
  { term: "Exit Poll", fullForm: null, description: "A survey conducted after voters leave polling booths to predict election results before official counting" },
  { term: "Psephology", fullForm: null, description: "The scientific study and analysis of elections and voting patterns" },
  { term: "Delimitation", fullForm: null, description: "The process of redrawing constituency boundaries based on population census data" },
  { term: "Mandate", fullForm: null, description: "The authority granted by voters to an elected representative or party to govern and implement their policies" }
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

export const GlossaryTooltip = ({ word, definition, children }) => {
  return (
    <div className="relative inline-block group cursor-help">
      <span className="border-b border-dashed border-gray-400 dark:border-gray-500">{children || word}</span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="font-bold mb-1 text-eci-blue-light">{word}</div>
        <div>{definition}</div>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
      </div>
    </div>
  );
};

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState(null);
  const [language, setLanguage] = useState("en");

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'bn', name: 'বাংলা' }
  ];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter(item => {
      const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (item.fullForm && item.fullForm.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLetter = activeLetter ? item.term.startsWith(activeLetter) : true;
      return matchesSearch && matchesLetter;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchTerm, activeLetter]);

  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={i} className="bg-yellow-200 dark:bg-yellow-800 text-gray-900 dark:text-white rounded-sm px-0.5">{part}</span> : 
        part
    );
  };

  return (
    <section className="py-16 bg-white dark:bg-surface-dark transition-colors duration-300 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <span className="h-px w-8 bg-eci-blue dark:bg-eci-blue-light"></span>
            <span className="text-eci-blue dark:text-eci-blue-light font-bold text-sm tracking-widest uppercase">
              MODULE 4
            </span>
            <span className="h-px w-8 bg-eci-blue dark:bg-eci-blue-light"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            <span className="text-eci-blue">Election</span> Glossary
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Every election term explained in plain, simple English
          </p>
        </div>

        {/* Controls: Search & Language */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search terms or definitions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search glossary terms"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-eci-blue dark:text-white transition-all"
            />
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
              <Globe2 className="w-4 h-4 text-gray-500 ml-2" />
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${language === lang.code ? 'bg-eci-blue text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            {language !== 'en' && (
              <span className="text-xs text-eci-blue dark:text-eci-blue-light mt-2 flex items-center gap-1 animate-pulse">
                <Info className="w-3 h-3" /> Translation coming soon
              </span>
            )}
          </div>
        </div>

        {/* A-Z Filter */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          <button 
            onClick={() => setActiveLetter(null)}
            aria-label="Show all terms"
            className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${!activeLetter ? 'bg-eci-blue text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border border-transparent'}`}
          >
            All
          </button>
          {ALPHABET.map(letter => {
            const hasTerms = GLOSSARY_TERMS.some(t => t.term.startsWith(letter));
            return (
              <button
                key={letter}
                onClick={() => hasTerms ? setActiveLetter(activeLetter === letter ? null : letter) : null}
                disabled={!hasTerms}
                aria-label={`Filter by letter ${letter}`}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
                  activeLetter === letter 
                    ? 'bg-eci-blue text-white shadow-md' 
                    : hasTerms 
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer border border-transparent hover:border-gray-300 dark:hover:border-gray-600' 
                      : 'bg-gray-50 dark:bg-gray-900/50 text-gray-300 dark:text-gray-600 cursor-not-allowed border border-dashed border-gray-200 dark:border-gray-800'
                }`}
              >
                {letter}
              </button>
            )
          })}
        </div>

        {/* Status Text */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
          Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} terms
        </div>

        {/* Grid */}
        {filteredTerms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all">
            {filteredTerms.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-eci-blue/30 dark:hover:border-eci-blue/50 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-eci-blue dark:text-eci-blue-light group-hover:text-blue-700 transition-colors">
                    {highlightText(item.term, searchTerm)}
                  </h3>
                </div>
                {item.fullForm && (
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {highlightText(item.fullForm, searchTerm)}
                  </p>
                )}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {highlightText(item.description, searchTerm)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-card-dark rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              We couldn't find any terms matching "{searchTerm}" {activeLetter && `starting with ${activeLetter}`}.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setActiveLetter(null); }}
              className="mt-4 px-4 py-2 text-eci-blue hover:bg-eci-blue/10 rounded-lg transition-colors text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
