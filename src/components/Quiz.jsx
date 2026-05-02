import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Share2, RefreshCw, ChevronRight, Trophy } from 'lucide-react';

const QUIZ_DATA = {
  Beginner: [
    {
      id: 1,
      question: "What does ECI stand for?",
      options: [
        "Election Council of India",
        "Election Commission of India",
        "Electoral Committee of India",
        "Executive Commission of India"
      ],
      correctAnswer: 1,
      explanation: "The Election Commission of India is a constitutional body established under Article 324, responsible for administering all elections in India"
    },
    {
      id: 2,
      question: "What is the minimum age to vote in India?",
      options: [
        "16 years",
        "21 years",
        "18 years",
        "25 years"
      ],
      correctAnswer: 2,
      explanation: "The 61st Constitutional Amendment in 1988 lowered the voting age from 21 to 18 years"
    },
    {
      id: 3,
      question: "What does NOTA stand for?",
      options: [
        "None of the Allowed",
        "None of the Above",
        "Not on the Agenda",
        "No Other Than Abstain"
      ],
      correctAnswer: 1,
      explanation: "NOTA allows voters to reject all candidates. It was introduced by the Supreme Court in 2013"
    }
  ],
  Intermediate: [
    {
      id: 4,
      question: "What is the Model Code of Conduct?",
      options: [
        "A law passed by Parliament",
        "Guidelines issued by ECI to govern party and candidate behavior during elections",
        "A code for voters to follow on polling day",
        "Rules for counting votes"
      ],
      correctAnswer: 1,
      explanation: "The MCC is a set of guidelines issued by the ECI that comes into force the moment election dates are announced"
    },
    {
      id: 5,
      question: "What is VVPAT?",
      options: [
        "A type of ballot paper",
        "A voter registration form",
        "A printer attached to EVM that shows a paper slip of the vote cast",
        "A voting verification portal"
      ],
      correctAnswer: 2,
      explanation: "VVPAT — Voter Verifiable Paper Audit Trail — allows voters to verify their vote was recorded correctly"
    },
    {
      id: 6,
      question: "How many seats are there in the Lok Sabha?",
      options: [
        "250",
        "543",
        "545",
        "500"
      ],
      correctAnswer: 1,
      explanation: "The Lok Sabha has 543 elected seats representing constituencies across India"
    },
    {
      id: 7,
      question: "What is Form 6 used for?",
      options: [
        "Filing a complaint against a candidate",
        "Applying for a new voter registration",
        "Requesting a postal ballot",
        "Reporting booth capturing"
      ],
      correctAnswer: 1,
      explanation: "Form 6 is the application form used by first-time voters to register their name on the electoral roll"
    }
  ],
  Advanced: [
    {
      id: 8,
      question: "What is Delimitation?",
      options: [
        "The process of counting votes",
        "The disqualification of a candidate",
        "The redrawing of constituency boundaries based on census data",
        "The announcement of election dates"
      ],
      correctAnswer: 2,
      explanation: "Delimitation is carried out by the Delimitation Commission to ensure equal representation based on population changes"
    },
    {
      id: 9,
      question: "Under which Schedule of the Constitution does the Anti-Defection Law fall?",
      options: [
        "Seventh Schedule",
        "Ninth Schedule",
        "Tenth Schedule",
        "Eighth Schedule"
      ],
      correctAnswer: 2,
      explanation: "The Anti-Defection Law is contained in the Tenth Schedule, added by the 52nd Constitutional Amendment in 1985"
    },
    {
      id: 10,
      question: "What is Psephology?",
      options: [
        "The study of constitutional law",
        "The scientific study and statistical analysis of elections and voting patterns",
        "The process of voter registration",
        "The study of political parties"
      ],
      correctAnswer: 1,
      explanation: "Psephology combines statistics, sociology, and political science to analyze electoral trends and predict outcomes"
    }
  ]
};

const Quiz = () => {
  const [level, setLevel] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [highScore, setHighScore] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedScore = localStorage.getItem('votewise-quiz-highscore');
    if (savedScore) {
      setHighScore(parseInt(savedScore, 10));
    }
  }, []);

  const handleStart = (selectedLevel) => {
    setLevel(selectedLevel);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setShowResults(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  const handleOptionClick = (optionIndex) => {
    if (isAnswered) return;
    
    const questions = QUIZ_DATA[level];
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setUserAnswers(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        selectedAnswer: currentQuestion.options[optionIndex],
        correctAnswer: currentQuestion.options[currentQuestion.correctAnswer],
        isCorrect,
        explanation: currentQuestion.explanation
      }
    ]);
  };

  const handleNextQuestion = () => {
    const questions = QUIZ_DATA[level];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz(questions.length);
    }
  };

  const finishQuiz = (totalQuestions) => {
    setShowResults(true);
    const newScore = score + (isAnswered && selectedOption === QUIZ_DATA[level][currentQuestionIndex].correctAnswer ? 0 : 0); // score already updated on click
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Update high score
    if (percentage > highScore) {
      setHighScore(percentage);
      localStorage.setItem('votewise-quiz-highscore', percentage.toString());
    }
  };

  const handleShare = async () => {
    const total = QUIZ_DATA[level].length;
    const text = `I scored ${score}/${total} on the VoteWise Election Quiz! Test your civic knowledge at VoteWise — Know Your Vote #VoteWise #KnowYourVote #ElectionEducation`;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const getResultFeedback = (percentage) => {
    if (percentage === 100) return "Perfect! You are an election expert!";
    if (percentage >= 70) return "Great job! You know your elections well!";
    if (percentage >= 40) return "Good effort! Keep learning with VoteWise!";
    return "Keep exploring! VoteWise is here to help you learn!";
  };

  const renderLevelSelection = () => (
    <div className="grid md:grid-cols-3 gap-6 mt-8">
      {[
        { name: 'Beginner', questions: 3, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800', desc: 'Start with the basics' },
        { name: 'Intermediate', questions: 4, color: 'text-amber-600 dark:text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-200 dark:border-amber-800', desc: 'Test your working knowledge' },
        { name: 'Advanced', questions: 3, color: 'text-red-600 dark:text-red-500', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800', desc: 'For the true election geeks' }
      ].map((lvl) => (
        <button
          key={lvl.name}
          onClick={() => handleStart(lvl.name)}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${lvl.bg} ${lvl.border} group focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-${lvl.name === 'Beginner' ? 'green' : lvl.name === 'Intermediate' ? 'amber' : 'red'}-500 dark:focus:ring-offset-gray-900`}
          aria-label={`Start ${lvl.name} quiz with ${lvl.questions} questions`}
        >
          <div className={`text-2xl font-bold mb-2 ${lvl.color}`}>{lvl.name}</div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{lvl.desc}</p>
          <div className="text-sm font-medium px-4 py-1.5 rounded-full bg-white dark:bg-gray-800 shadow-sm text-gray-700 dark:text-gray-300">
            {lvl.questions} Questions
          </div>
        </button>
      ))}
    </div>
  );

  const renderQuizMode = () => {
    const questions = QUIZ_DATA[level];
    const currentQ = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all">
        {/* Progress Bar */}
        <div className="h-2 bg-gray-100 dark:bg-gray-700 w-full">
          <div 
            className="h-full bg-[#1A73E8] transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-bold text-[#1A73E8] tracking-wider uppercase">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {level}
            </span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            {currentQ.question}
          </h3>
          
          <div className="space-y-4">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedOption === index;
              const isCorrectAnswer = currentQ.correctAnswer === index;
              
              let buttonStyles = "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:border-[#1A73E8] hover:bg-blue-50 dark:hover:bg-blue-900/20";
              
              if (isAnswered) {
                if (isCorrectAnswer) {
                  buttonStyles = "bg-[#22C55E] border-[#22C55E] text-white shadow-md";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyles = "bg-[#EF4444] border-[#EF4444] text-white shadow-md";
                } else {
                  buttonStyles = "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 opacity-70 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between font-medium ${buttonStyles} focus:outline-none focus:ring-4 focus:ring-[#1A73E8]/30 dark:focus:ring-[#1A73E8]/50`}
                  aria-label={`Option ${index + 1}: ${option}`}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                  {isAnswered && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
          
          {isAnswered && (
            <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl animate-fade-in">
              <h4 className="font-bold text-[#1A73E8] dark:text-blue-400 mb-2 flex items-center gap-2">
                Explanation
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {currentQ.explanation}
              </p>
            </div>
          )}
          
          {isAnswered && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 bg-[#1A73E8] hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                aria-label={currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderResults = () => {
    const total = QUIZ_DATA[level].length;
    const percentage = Math.round((score / total) * 100);
    
    return (
      <div className="max-w-4xl mx-auto mt-8 animate-fade-in">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden p-8 text-center border border-gray-100 dark:border-gray-700 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1A73E8]/10 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#1A73E8] to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              {score} / {total}
            </h3>
            <p className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-6">
              {getResultFeedback(percentage)}
            </p>
            
            {highScore > 0 && (
              <div className="inline-block bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-500 px-4 py-2 rounded-full font-bold text-sm border border-yellow-200 dark:border-yellow-800/50 mb-8">
                Your High Score: {highScore}%
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => setLevel(null)}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-all focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
                aria-label="Try another quiz"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1A73E8] hover:bg-blue-700 text-white font-bold shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                aria-label="Share your score"
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                {copied ? "Copied!" : "Share Your Score"}
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 px-2">Question Breakdown</h4>
          <div className="space-y-4">
            {userAnswers.map((ans, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${ans.isCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500'}`}>
                    {ans.isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{ans.question}</h5>
                    {!ans.isCorrect && (
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">You answered: </span>
                        <span className="text-red-600 dark:text-red-400 font-medium">{ans.selectedAnswer}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Correct answer: </span>
                      <span className="text-green-600 dark:text-green-400 font-medium">{ans.correctAnswer}</span>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                      {ans.explanation}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 px-6 sm:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#1A73E8] dark:text-blue-400 text-sm font-bold tracking-widest uppercase mb-4">
          Module 5
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-gray-900 dark:text-white">
          Test Your <span className="text-[#1A73E8]">Knowledge</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-medium">
          How well do you know the Indian election process? Find out now!
        </p>
      </div>

      {!level && !showResults && renderLevelSelection()}
      {level && !showResults && renderQuizMode()}
      {showResults && renderResults()}
    </section>
  );
};

export default Quiz;
