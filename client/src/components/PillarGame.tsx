import React, { useState } from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";
import { gameText } from "@/lib/gameData";
import { useTerminalEffect } from "@/hooks/useTerminalEffect";
import "../styles/retro.css";

const PillarGame: React.FC = () => {
  const { 
    currentSectionId, 
    setCurrentView, 
    completeSection, 
    completedSections,
    soundEnabled 
  } = useBeesGame();
  
  const [showContent, setShowContent] = useState(false);
  const section = gameText.sections.find(s => s.id === currentSectionId);
  
  const { displayedText, isTyping } = useTerminalEffect(
    section?.content || "", 
    showContent ? 20 : 0
  );

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

  React.useEffect(() => {
    if (section) {
      setShowContent(true);
      playSound("success.mp3");
    }
  }, [section]);

  const handleComplete = () => {
    if (section && !completedSections.has(section.id)) {
      completeSection(section.id);
      playSound("success.mp3");
    }
  };

  const handleBack = () => {
    playSound("hit.mp3");
    setCurrentView("section");
  };

  if (!section) {
    return (
      <div className="terminal-container">
        <div className="terminal-window">
          <p style={{ color: "var(--terminal-pink)" }}>
            ❌ Error: Sección non encontrada
          </p>
          <button className="back-button" onClick={handleBack}>
            {gameText.back}
          </button>
        </div>
      </div>
    );
  }

  const isCompleted = completedSections.has(section.id);

  return (
    <div className="terminal-container crt">
      <div className="terminal-header">
        <h1 className="terminal-title">{section.title}</h1>
        <p className="terminal-subtitle">{section.description}</p>
      </div>

      <div className="terminal-window">
        <div className="terminal-content">
          {showContent && (
            <div style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}>
              {displayedText}
              {isTyping && <span style={{ animation: "blink-caret 0.75s step-end infinite" }}>|</span>}
            </div>
          )}
        </div>

        {!isTyping && (
          <div style={{ marginTop: "30px" }}>
            {!isCompleted ? (
              <button 
                className="game-button"
                onClick={handleComplete}
                style={{ 
                  background: "var(--terminal-amber)",
                  color: "var(--terminal-bg)",
                  borderColor: "var(--terminal-amber)"
                }}
              >
                ✓ Marcar como Completado
              </button>
            ) : (
              <div style={{ 
                color: "var(--terminal-amber)", 
                fontSize: "1.2rem",
                margin: "20px 0"
              }}>
                ✅ {gameText.completed}
              </div>
            )}
          </div>
        )}

        <button className="back-button" onClick={handleBack}>
          {gameText.back}
        </button>
      </div>

      {/* Interactive elements based on section */}
      {section.id === "pillars" && !isTyping && (
        <div className="mini-game">
          <h3>Os Tres Pilares en Acción</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
            <div className="village-card">
              <h4 style={{ color: "var(--terminal-green)" }}>🌿 Nature-based</h4>
              <p>Aprender dos ciclos naturais e aplicar a sabiduría do territorio aos nosos proxectos.</p>
            </div>
            <div className="village-card">
              <h4 style={{ color: "var(--terminal-blue)" }}>🧘 Being-based</h4>
              <p>Cultivar a conciencia persoal e o equilibrio para liderar con propósito.</p>
            </div>
            <div className="village-card">
              <h4 style={{ color: "var(--terminal-pink)" }}>🤝 Connecting-based</h4>
              <p>Crear redes reais entre mulleres, xeracións e comunidades.</p>
            </div>
          </div>
        </div>
      )}

      {section.id === "stages" && !isTyping && (
        <div className="mini-game">
          <h3>Percorrido Transformador</h3>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" }}>
            <div style={{ textAlign: "center", flex: "1", minWidth: "150px" }}>
              <div style={{ fontSize: "3rem", color: "var(--terminal-amber)" }}>💡</div>
              <h4 style={{ color: "var(--terminal-amber)" }}>Inspiración</h4>
            </div>
            <div style={{ textAlign: "center", flex: "1", minWidth: "150px" }}>
              <div style={{ fontSize: "3rem", color: "var(--terminal-blue)" }}>🏠</div>
              <h4 style={{ color: "var(--terminal-blue)" }}>Co-living</h4>
            </div>
            <div style={{ textAlign: "center", flex: "1", minWidth: "150px" }}>
              <div style={{ fontSize: "3rem", color: "var(--terminal-green)" }}>🌱</div>
              <h4 style={{ color: "var(--terminal-green)" }}>Give Back</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PillarGame;
