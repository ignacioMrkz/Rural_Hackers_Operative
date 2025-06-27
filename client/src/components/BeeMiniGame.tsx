import React, { useState, useEffect } from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";
import { gameText, beeMiniGameData } from "@/lib/gameData";
import "../styles/retro.css";

const BeeMiniGame: React.FC = () => {
  const { setCurrentView, soundEnabled } = useBeesGame();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [flowers, setFlowers] = useState<Array<{ id: number, pollinated: boolean }>>([]);

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

  // Initialize flowers
  useEffect(() => {
    setFlowers(
      Array.from({ length: beeMiniGameData.questions.length }, (_, i) => ({
        id: i,
        pollinated: false
      }))
    );
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    playSound("hit.mp3");
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const question = beeMiniGameData.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      setFlowers(prev => prev.map(flower => 
        flower.id === currentQuestion 
          ? { ...flower, pollinated: true }
          : flower
      ));
      playSound("success.mp3");
    } else {
      playSound("hit.mp3");
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < beeMiniGameData.questions.length) {
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
    setFlowers(prev => prev.map(flower => ({ ...flower, pollinated: false })));
    playSound("hit.mp3");
  };

  const handleBack = () => {
    playSound("hit.mp3");
    setCurrentView("menu");
  };

  const currentQ = beeMiniGameData.questions[currentQuestion];

  if (gameComplete) {
    const percentage = Math.round((score / beeMiniGameData.questions.length) * 100);
    
    return (
      <div className="terminal-container crt">
        <div className="terminal-header">
          <h1 className="terminal-title">🎉 Xogo Completado!</h1>
          <p className="terminal-subtitle">Resultado da túa aventura como Polinizadora</p>
        </div>

        <div className="terminal-window">
          <div className="mini-game">
            <h3>Puntuación Final</h3>
            <div style={{ fontSize: "2rem", margin: "20px 0" }}>
              {score}/{beeMiniGameData.questions.length} ({percentage}%)
            </div>

            <div style={{ margin: "20px 0" }}>
              <h4>Xardín Polinizado:</h4>
              <div style={{ fontSize: "2rem", margin: "10px 0" }}>
                {flowers.map(flower => (
                  <span key={flower.id} style={{ margin: "0 5px" }}>
                    {flower.pollinated ? "🌸" : "🌿"}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ margin: "20px 0", textAlign: "left" }}>
              {percentage >= 80 && (
                <p style={{ color: "var(--terminal-amber)" }}>
                  ¡Excelente! Es unha verdadeira Polinizadora Rural. Dominas os coñecementos básicos do programa.
                </p>
              )}
              {percentage >= 60 && percentage < 80 && (
                <p style={{ color: "var(--terminal-cyan)" }}>
                  ¡Ben feito! Tes un bo coñecemento do programa. Segue explorando para afondar máis.
                </p>
              )}
              {percentage < 60 && (
                <p style={{ color: "var(--terminal-pink)" }}>
                  Segue aprendendo! Revisa os contidos do programa para mellorar os teus coñecementos.
                </p>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button className="game-button" onClick={handleRestart}>
                🔄 Xogar de Novo
              </button>
              <button className="back-button" onClick={handleBack}>
                {gameText.back}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-container crt">
      <div className="terminal-header">
        <h1 className="terminal-title">🐝 Xogo das Abellas Polinizadoras</h1>
        <p className="terminal-subtitle">Pon a proba os teus coñecementos sobre o programa</p>
      </div>

      <div className="terminal-window">
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>Pregunta {currentQuestion + 1} de {beeMiniGameData.questions.length}</span>
            <span>Puntuación: {score}</span>
          </div>
          
          <div className="progress-bar" style={{ margin: "10px 0" }}>
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / beeMiniGameData.questions.length) * 100}%` }}
            />
          </div>

          <div style={{ margin: "10px 0", fontSize: "1.5rem", textAlign: "center" }}>
            {flowers.map(flower => (
              <span key={flower.id} style={{ margin: "0 3px" }}>
                {flower.pollinated ? "🌸" : "🌿"}
              </span>
            ))}
          </div>
        </div>

        <div className="mini-game">
          <h3>{currentQ.question}</h3>
          
          <div style={{ margin: "20px 0" }}>
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className="menu-option"
                onClick={() => handleAnswerSelect(index)}
                style={{
                  background: selectedAnswer === index ? "var(--terminal-blue)" : "none",
                  color: selectedAnswer === index ? "var(--terminal-bg)" : "var(--terminal-green)",
                  borderColor: selectedAnswer === index ? "var(--terminal-blue)" : "var(--terminal-green)"
                }}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="terminal-window" style={{ 
              borderColor: selectedAnswer === currentQ.correct ? "var(--terminal-green)" : "var(--terminal-pink)",
              marginTop: "20px"
            }}>
              <h4 style={{ 
                color: selectedAnswer === currentQ.correct ? "var(--terminal-green)" : "var(--terminal-pink)"
              }}>
                {selectedAnswer === currentQ.correct ? "✅ Correcto!" : "❌ Incorrecto"}
              </h4>
              <p>{currentQ.explanation}</p>
              {selectedAnswer !== currentQ.correct && (
                <p style={{ color: "var(--terminal-amber)" }}>
                  A resposta correcta era: {String.fromCharCode(65 + currentQ.correct)}. {currentQ.options[currentQ.correct]}
                </p>
              )}
            </div>
          )}

          <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {!showResult ? (
              <button 
                className="game-button"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Confirmar Resposta
              </button>
            ) : (
              <button 
                className="game-button"
                onClick={handleNextQuestion}
              >
                {currentQuestion + 1 < beeMiniGameData.questions.length ? "Seguinte Pregunta" : "Ver Resultado Final"}
              </button>
            )}
            
            <button className="back-button" onClick={handleBack}>
              {gameText.back}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeeMiniGame;
