import React, { useState } from 'react';
import { BookOpen, Award, BarChart3, TrendingUp, ArrowRight, CheckCircle, XCircle, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import './App.css';

// Database completo delle domande con spiegazioni dettagliate
const questionDatabase = {
  reasoning: [
    {
      id: 1,
      question: "Se tutti i manager sono leader e alcuni leader sono innovatori, quale delle seguenti affermazioni è necessariamente vera?",
      options: [
        "Tutti i manager sono innovatori",
        "Alcuni manager potrebbero essere innovatori",
        "Nessun manager è innovatore",
        "Tutti gli innovatori sono manager"
      ],
      correct: 1,
      explanation: "La logica sillogistica ci dice che se tutti i manager sono leader (A⊆B) e alcuni leader sono innovatori (B∩C≠∅), allora è possibile ma non necessario che alcuni manager siano innovatori. La risposta corretta usa 'potrebbero' che indica possibilità, non certezza."
    },
    {
      id: 2,
      question: "In una sequenza: 2, 6, 12, 20, 30, __. Qual è il numero successivo?",
      options: ["40", "42", "44", "46"],
      correct: 1,
      explanation: "La sequenza segue il pattern n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, quindi 6×7=42. Ogni numero è il prodotto di due numeri consecutivi."
    },
    {
      id: 3,
      question: "Se il progetto A richiede 3 giorni in più del progetto B, e il progetto B richiede la metà del tempo del progetto C che dura 12 giorni, quanto dura il progetto A?",
      options: ["6 giorni", "9 giorni", "12 giorni", "15 giorni"],
      correct: 1,
      explanation: "Progetto C = 12 giorni. Progetto B = 12/2 = 6 giorni. Progetto A = B + 3 = 6 + 3 = 9 giorni. È importante seguire l'ordine logico delle relazioni."
    },
    {
      id: 4,
      question: "Completa l'analogia: LIBRO:BIBLIOTECA = QUADRO:?",
      options: ["Cornice", "Museo", "Artista", "Colore"],
      correct: 1,
      explanation: "La relazione è 'luogo dove è conservato/esposto'. I libri si trovano in biblioteca, i quadri si trovano al museo. La cornice è parte del quadro, non il luogo dove viene conservato."
    },
    {
      id: 5,
      question: "Se in un ufficio lavorano 20 persone e il 40% sono donne, quante donne in più servirebbero per raggiungere la parità di genere?",
      options: ["2", "4", "6", "8"],
      correct: 0,
      explanation: "Donne attuali: 20 × 40% = 8. Per la parità servono 10 donne (50%). Differenza: 10 - 8 = 2 donne in più."
    }
  ],
  euKnowledge: [
    {
      id: 1,
      question: "Qual è l'istituzione UE che rappresenta i cittadini europei eletti direttamente?",
      options: [
        "Consiglio dell'Unione Europea",
        "Commissione Europea",
        "Parlamento Europeo",
        "Consiglio Europeo"
      ],
      correct: 2,
      explanation: "Il Parlamento Europeo è l'unica istituzione UE i cui membri sono eletti direttamente dai cittadini ogni 5 anni. Il Consiglio UE rappresenta i governi nazionali, la Commissione è nominata, il Consiglio Europeo riunisce i capi di Stato."
    },
    {
      id: 2,
      question: "Quale trattato ha istituito l'Unione Europea nella sua forma attuale?",
      options: [
        "Trattato di Roma (1957)",
        "Trattato di Maastricht (1992)",
        "Trattato di Lisbona (2007)",
        "Trattato di Nizza (2001)"
      ],
      correct: 1,
      explanation: "Il Trattato di Maastricht (1992) ha istituito l'Unione Europea, introducendo la cittadinanza europea, la politica estera comune e preparando l'euro. Il Trattato di Lisbona (2007) ha riformato le istituzioni ma non ha creato l'UE."
    },
    {
      id: 3,
      question: "Quanti Commissari compongono la Commissione Europea?",
      options: ["20", "27", "30", "Uno per ogni Stato membro"],
      correct: 3,
      explanation: "Dal Trattato di Lisbona, c'è un Commissario per ogni Stato membro (attualmente 27). Ogni Commissario ha un portafoglio specifico ed è responsabile di determinate politiche UE."
    },
    {
      id: 4,
      question: "Quale principio regola la ripartizione delle competenze tra UE e Stati membri?",
      options: [
        "Principio di sussidiarietà",
        "Principio di proporzionalità",
        "Principio di solidarietà",
        "Principio di coesione"
      ],
      correct: 0,
      explanation: "Il principio di sussidiarietà stabilisce che l'UE deve agire solo quando gli obiettivi non possono essere raggiunti meglio a livello nazionale, regionale o locale. È sancito dall'art. 5 TUE."
    },
    {
      id: 5,
      question: "Qual è l'obiettivo principale della Politica di Coesione dell'UE?",
      options: [
        "Promuovere il commercio internazionale",
        "Ridurre le disparità regionali",
        "Garantire la sicurezza interna",
        "Proteggere l'ambiente"
      ],
      correct: 1,
      explanation: "La Politica di Coesione mira a ridurre le disparità economiche, sociali e territoriali tra le regioni UE, attraverso i Fondi Strutturali e di Investimento Europei (Fondi SIE)."
    }
  ],
  digitalComp: [
    {
      id: 1,
      question: "Nel framework DigComp 2.2, quale area di competenza include la capacità di proteggere i dati personali?",
      options: [
        "Alfabetizzazione su informazioni e dati",
        "Sicurezza",
        "Comunicazione e collaborazione",
        "Creazione di contenuti digitali"
      ],
      correct: 1,
      explanation: "L'Area 4 'Sicurezza' del DigComp 2.2 copre la protezione dei dispositivi, dei dati personali e della privacy, oltre alla protezione della salute e dell'ambiente."
    },
    {
      id: 2,
      question: "Quale livello DigComp corrisponde a un utente 'autonomo'?",
      options: [
        "Livello 1-2 (Base)",
        "Livello 3-4 (Intermedio)",
        "Livello 5-6 (Avanzato)",
        "Livello 7-8 (Altamente specializzato)"
      ],
      correct: 1,
      explanation: "Il livello 3-4 (Intermedio) corrisponde a un utente autonomo che può svolgere compiti da solo, risolvere problemi ben definiti e supportare altri in compiti semplici."
    },
    {
      id: 3,
      question: "Cos'è il 'phishing'?",
      options: [
        "Un virus informatico che danneggia i file",
        "Una tecnica per rubare informazioni personali fingendosi enti affidabili",
        "Un metodo per accelerare la connessione internet",
        "Un sistema di backup automatico"
      ],
      correct: 1,
      explanation: "Il phishing è un attacco informatico che usa email, messaggi o siti web contraffatti per ingannare le vittime e ottenere dati sensibili (password, dati bancari). È una minaccia alla sicurezza digitale."
    },
    {
      id: 4,
      question: "Quale delle seguenti NON è una buona pratica per creare password sicure?",
      options: [
        "Usare almeno 12 caratteri",
        "Includere maiuscole, minuscole, numeri e simboli",
        "Usare la stessa password per più account",
        "Cambiarla regolarmente"
      ],
      correct: 2,
      explanation: "Usare la stessa password per più account è pericoloso: se un account viene compromesso, tutti gli altri sono a rischio. Ogni account dovrebbe avere una password unica."
    },
    {
      id: 5,
      question: "Nel contesto del DigComp, cosa significa 'netiquette'?",
      options: [
        "Velocità della connessione internet",
        "Regole di comportamento online",
        "Sistema di protezione antivirus",
        "Formato di file compresso"
      ],
      correct: 1,
      explanation: "La netiquette è l'insieme delle regole di comportamento e buone maniere nella comunicazione online, parte della competenza 'Comunicazione e collaborazione' del DigComp."
    }
  ]
};

const EPSOQuizApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const categories = [
    {
      id: 'reasoning',
      title: 'Test di Ragionamento',
      icon: <TrendingUp className="w-8 h-8" />,
      description: 'Logica, sequenze numeriche, ragionamento verbale e astratto',
      weight: '25%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'euKnowledge',
      title: 'Conoscenza UE',
      icon: <BookOpen className="w-8 h-8" />,
      description: 'Istituzioni, trattati, politiche e funzionamento dell\'Unione Europea',
      weight: '25%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'digitalComp',
      title: 'Competenze Digitali',
      icon: <BarChart3 className="w-8 h-8" />,
      description: 'DigComp 2.2: sicurezza, gestione dati, comunicazione digitale',
      weight: '25%',
      color: 'from-green-500 to-green-600'
    }
  ];

  const startQuiz = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
    setCurrentView('quiz');
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = questionDatabase[selectedCategory][currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct;
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion.question,
      selectedAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct,
      isCorrect: isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionDatabase[selectedCategory].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const backToHome = () => {
    setCurrentView('home');
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EPSO AD5 Quiz
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Preparati per il concorso EPSO/AD/427/26 con quiz interattivi che simulano 
            le quattro fasi di valutazione del processo selettivo
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Struttura del Concorso AD5
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-bold text-blue-900 mb-2">Fase 1</div>
              <div className="text-sm text-gray-700">Test di Ragionamento (25%)</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-bold text-purple-900 mb-2">Fase 2</div>
              <div className="text-sm text-gray-700">Conoscenza UE (25%)</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-bold text-green-900 mb-2">Fase 3</div>
              <div className="text-sm text-gray-700">Competenze Digitali (25%)</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="font-bold text-orange-900 mb-2">Fase 4</div>
              <div className="text-sm text-gray-700">Prova Scritta EUFTE (25%)</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>Soglia di superamento:</strong> Punteggio totale minimo di 40/80 punti (50%), 
              con almeno 10/20 punti in ciascuna delle quattro prove.
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
            >
              <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  {category.icon}
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    {category.weight}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-white/90 text-sm">{category.description}</p>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Domande disponibili</span>
                    <span className="font-semibold">
                      {questionDatabase[category.id].length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${category.color} h-2 rounded-full`}
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => startQuiz(category.id)}
                  className={`w-full bg-gradient-to-r ${category.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center group`}
                >
                  Inizia Quiz
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>Scadenza candidature: 10 Marzo 2026 | Preparazione completa per EPSO/AD/427/26</p>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const questions = questionDatabase[selectedCategory];
    const currentQuestion = questions[currentQuestionIndex];
    const currentCategory = categories.find(c => c.id === selectedCategory);
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    if (quizCompleted) {
      const percentage = (score / questions.length) * 100;
      const passed = percentage >= 50;

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
          <div className="max-w-3xl mx-auto pt-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r ${passed ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600'} flex items-center justify-center`}>
                  {passed ? (
                    <CheckCircle className="w-12 h-12 text-white" />
                  ) : (
                    <XCircle className="w-12 h-12 text-white" />
                  )}
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {passed ? 'Ottimo lavoro!' : 'Continua a studiare'}
                </h2>
                <p className="text-gray-600">
                  Hai completato il quiz su {currentCategory.title}
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    {score}/{questions.length}
                  </div>
                  <div className="text-lg text-gray-600">
                    {percentage.toFixed(0)}% corrette
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                  <div 
                    className={`bg-gradient-to-r ${passed ? 'from-green-400 to-green-600' : 'from-red-400 to-red-600'} h-4 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                
                <div className="text-center text-sm text-gray-600 mt-4">
                  {passed ? (
                    <span className="text-green-700 font-semibold">✓ Superi la soglia del 50% richiesta</span>
                  ) : (
                    <span className="text-red-700 font-semibold">✗ Sotto la soglia del 50% richiesta</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-gray-700 mb-3">Riepilogo risposte:</h3>
                {answeredQuestions.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    {q.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">{q.question}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={restartQuiz}
                  className={`flex-1 bg-gradient-to-r ${currentCategory.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center`}
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Ripeti Quiz
                </button>
                <button
                  onClick={backToHome}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Torna alla Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto pt-8">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={backToHome}
              className="text-gray-600 hover:text-gray-800 flex items-center mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Torna alla Home
            </button>
            <div className={`bg-gradient-to-r ${currentCategory.color} text-white p-6 rounded-2xl shadow-lg`}>
              <h2 className="text-2xl font-bold mb-2">{currentCategory.title}</h2>
              <div className="flex items-center justify-between">
                <span className="text-white/90">
                  Domanda {currentQuestionIndex + 1} di {questions.length}
                </span>
                <span className="bg-white/20 px-4 py-1 rounded-full font-semibold">
                  Punteggio: {score}/{currentQuestionIndex + (showExplanation ? 1 : 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${currentCategory.color} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correct;
                const showCorrect = showExplanation && isCorrect;
                const showWrong = showExplanation && isSelected && !isCorrect;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      showCorrect
                        ? 'border-green-500 bg-green-50'
                        : showWrong
                        ? 'border-red-500 bg-red-50'
                        : isSelected
                        ? `border-${currentCategory.color.split('-')[1]}-500 bg-${currentCategory.color.split('-')[1]}-50`
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-800">{option}</span>
                      {showCorrect && <CheckCircle className="w-6 h-6 text-green-600" />}
                      {showWrong && <XCircle className="w-6 h-6 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">Spiegazione:</h4>
                <p className="text-gray-700 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Precedente
            </button>
            
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`flex-1 bg-gradient-to-r ${currentCategory.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                Conferma Risposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className={`flex-1 bg-gradient-to-r ${currentCategory.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center`}
              >
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    Prossima Domanda
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </>
                ) : (
                  'Vedi Risultati'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'home' && renderHome()}
      {currentView === 'quiz' && renderQuiz()}
    </div>
  );
};

export default EPSOQuizApp;
