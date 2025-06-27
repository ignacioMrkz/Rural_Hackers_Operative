import React, { useState, useEffect } from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";

interface NatureQuizProps {
  onClose: () => void;
}

const NatureQuiz: React.FC<NatureQuizProps> = ({ onClose }) => {
  const { soundEnabled } = useBeesGame();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const quizData = [
    {
      question: "¿Que significa 'biomimética'?",
      options: [
        "Copia exacta da natureza",
        "Aprender da natureza para deseñar solucións sostibles",
        "Estudo dos animais",
        "Imitación de plantas"
      ],
      correct: 1,
      explanation: "A biomimética é unha disciplina que aprende da natureza para deseñar solucións sostibles e innovadoras."
    },
    {
      question: "¿Cal é unha característica da Serra do Suído?",
      options: [
        "É o lugar máis seco de Galicia",
        "Ten só un río",
        "É o lugar máis chuvioso de Galicia",
        "Non ten montañas"
      ],
      correct: 2,
      explanation: "Fornelos de Montes na Serra do Suído é coñecido por ser o lugar máis chuvioso de Galicia."
    },
    {
      question: "¿Como funcionan as abellas na polinización?",
      options: [
        "Só recollen mel",
        "Transportan pole entre flores, facilitando a reprodución",
        "Só fan néctar",
        "Non interactúan coas plantas"
      ],
      correct: 1,
      explanation: "As abellas transportan pole de flor en flor, permitindo a reprodución das plantas e mantendo os ecosistemas."
    },
    {
      question: "¿Que son os foxos de lobos?",
      options: [
        "Casas para lobos",
        "Trampas tradicionais para cazar lobos",
        "Lugares onde viven lobos",
        "Sendeiros para lobos"
      ],
      correct: 1,
      explanation: "Os foxos de lobos son trampas tradicionais escavadas na terra para cazar lobos que atacaban o gando."
    },
    {
      question: "¿Cal é o obxectivo do 'nature-based thinking'?",
      options: [
        "Vivir sempre no bosque",
        "Aprender do territorio e aplicar os seus ciclos aos nosos procesos",
        "Plantar moitas árbores",
        "Evitar a tecnoloxía"
      ],
      correct: 1,
      explanation: "O pensamento baseado na natureza busca comprender os ciclos naturais e aplicar esta sabiduría aos nosos procesos vitais."
    }
  ];

  const playSound = (soundFile: string) => {
    if (!soundEnabled) return;
    
    try {
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.volume = 0.3;
      audio.play().catch(console.warn);
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    playSound("hit.mp3");
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const question = quizData[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      playSound("success.mp3");
    } else {
      playSound("hit.mp3");
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
      playSound("success.mp3");
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameComplete(false);
    playSound("hit.mp3");
  };

  const currentQ = quizData[currentQuestion];

  return (
    <div className="window window-opening" style={{ 
      position: 'absolute', 
      top: '15%', 
      left: '25%', 
      width: '50%', 
      maxWidth: '500px',
      height: '65%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>🌿 Quiz Biomimético - Coñecementos da Natureza</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      <div className="window-content win95-scrollbar" style={{ 
        height: 'calc(100% - 28px)', 
        overflow: 'auto' 
      }}>
        {gameComplete ? (
          <div style={{ padding: "16px" }}>
            <div className="win95-panel-raised" style={{ textAlign: "center", padding: "16px" }}>
              <h3>🎉 Quiz Completado!</h3>
              <div style={{ fontSize: "24px", margin: "12px 0" }}>
                {score >= quizData.length * 0.8 ? "🌟" : score >= quizData.length * 0.6 ? "🌱" : "🌿"}
              </div>
              <p>Puntuación: {score}/{quizData.length} ({Math.round((score / quizData.length) * 100)}%)</p>
            </div>

            <div className="win95-panel" style={{ padding: "12px", margin: "12px 0" }}>
              {score >= quizData.length * 0.8 && (
                <p style={{ color: '#008000' }}>
                  ¡Excelente! Demostras un gran coñecemento da biomimética e os territorios rurais galegos.
                </p>
              )}
              {score >= quizData.length * 0.6 && score < quizData.length * 0.8 && (
                <p style={{ color: '#000080' }}>
                  ¡Ben feito! Tes unha boa base sobre natureza e sostibilidade.
                </p>
              )}
              {score < quizData.length * 0.6 && (
                <p style={{ color: '#800000' }}>
                  Segue explorando! A natureza ten moito que ensinar sobre innovación sostible.
                </p>
              )}
            </div>

            <div className="win95-panel" style={{ textAlign: "center" }}>
              <button 
                className="win95-button primary" 
                onClick={handleRestart}
                style={{ marginRight: "8px" }}
              >
                🔄 Repetir Quiz
              </button>
              <button className="win95-button" onClick={onClose}>
                Pechar
              </button>
            </div>
          </div>
        ) : (
          <div style={{ padding: "16px" }}>
            <div className="win95-panel" style={{ padding: "8px", marginBottom: "12px" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Pregunta {currentQuestion + 1} de {quizData.length}</span>
                <span>Puntuación: {score}</span>
              </div>
              
              <div className="win95-progress" style={{ margin: '8px 0' }}>
                <div 
                  className="win95-progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="win95-panel-raised" style={{ padding: "12px", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "12px", marginBottom: "8px" }}>{currentQ.question}</h3>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Opcións de Resposta</div>
              <div className="win95-listbox">
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={`win95-listbox-item ${selectedAnswer === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </div>
                ))}
              </div>
            </div>

            {showResult && (
              <div className="win95-panel" style={{ 
                padding: "12px",
                borderColor: selectedAnswer === currentQ.correct ? '#008000' : '#800000',
                backgroundColor: selectedAnswer === currentQ.correct ? '#f0fff0' : '#fff0f0',
                marginBottom: "12px"
              }}>
                <h4 style={{ 
                  color: selectedAnswer === currentQ.correct ? '#008000' : '#800000',
                  fontSize: "12px",
                  marginBottom: "6px"
                }}>
                  {selectedAnswer === currentQ.correct ? "✅ Correcto!" : "❌ Incorrecto"}
                </h4>
                <p style={{ fontSize: "11px", marginBottom: "6px" }}>{currentQ.explanation}</p>
                {selectedAnswer !== currentQ.correct && (
                  <p style={{ fontSize: "11px", color: '#000080' }}>
                    A resposta correcta era: {String.fromCharCode(65 + currentQ.correct)}. {currentQ.options[currentQ.correct]}
                  </p>
                )}
              </div>
            )}

            <div className="win95-panel" style={{ textAlign: "center" }}>
              {!showResult ? (
                <button 
                  className="win95-button primary"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                >
                  Confirmar Resposta
                </button>
              ) : (
                <button 
                  className="win95-button primary"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion + 1 < quizData.length ? "Seguinte Pregunta" : "Ver Resultado Final"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NatureQuiz;