import React from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";
import { gameText } from "@/lib/gameData";
import { useTerminalEffect, useGlitchEffect } from "@/hooks/useTerminalEffect";
import GameProgress from "./GameProgress";
import "../styles/retro.css";

const Terminal: React.FC = () => {
  const { currentView, setCurrentView, soundEnabled, toggleSound } = useBeesGame();
  const { displayedText } = useTerminalEffect(gameText.welcome, 30);
  const { isGlitching } = useGlitchEffect(gameText.title);

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

  const handleMenuClick = (view: "section" | "villages" | "minigame") => {
    playSound("hit.mp3");
    setCurrentView(view);
  };

  return (
    <div className="terminal-container crt flicker">
      <div className="terminal-header">
        <h1 
          className={`terminal-title ${isGlitching ? 'glitch' : ''}`}
          data-text={gameText.title}
        >
          {gameText.title}
        </h1>
        <p className="terminal-subtitle">{gameText.subtitle}</p>
      </div>

      <div className="terminal-window">
        <div className="typing-effect">
          {displayedText}
        </div>

        <GameProgress />

        <div style={{ marginTop: "20px" }}>
          <h2>{gameText.mainMenu}</h2>
          
          <button 
            className="menu-option"
            onClick={() => handleMenuClick("section")}
          >
            📚 Explorar Contidos do Programa
          </button>
          
          <button 
            className="menu-option"
            onClick={() => handleMenuClick("villages")}
          >
            🏘️ Descubrir as Aldeas
          </button>
          
          <button 
            className="menu-option"
            onClick={() => handleMenuClick("minigame")}
          >
            🎮 Xogo das Abellas Polinizadoras
          </button>

          <div style={{ marginTop: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button 
              className="back-button"
              onClick={toggleSound}
              style={{ 
                color: soundEnabled ? "var(--terminal-green)" : "var(--terminal-pink)",
                borderColor: soundEnabled ? "var(--terminal-green)" : "var(--terminal-pink)"
              }}
            >
              {soundEnabled ? "🔊 Son Activado" : "🔇 Son Desactivado"}
            </button>
          </div>
        </div>
      </div>

      <div className="terminal-window" style={{ marginTop: "20px", fontSize: "0.9rem" }}>
        <p>
          <span className="bee-icon">🐝</span>
          Utiliza este terminal para explorar o programa Beautiful Bees: Polinizadoras Rurais
          <span className="bee-icon">🐝</span>
        </p>
        <p style={{ color: "var(--terminal-cyan)" }}>
          Sistema v2.0.25 - Territorio conectado - Comunidade activa
        </p>
      </div>
    </div>
  );
};

export default Terminal;
