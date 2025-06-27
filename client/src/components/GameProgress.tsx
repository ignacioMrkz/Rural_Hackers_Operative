import React from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";
import { gameText } from "@/lib/gameData";
import "../styles/retro.css";

const GameProgress: React.FC = () => {
  const { gameProgress, completedSections, resetProgress } = useBeesGame();

  return (
    <div className="terminal-window">
      <h3>{gameText.progress}: {gameProgress}%</h3>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${gameProgress}%` }}
        />
      </div>

      <div style={{ marginTop: "10px", fontSize: "0.9rem" }}>
        <p>
          Seccións completadas: {completedSections.size}/4
        </p>
        
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "10px" }}>
          {Array.from(completedSections).map(sectionId => (
            <span 
              key={sectionId}
              style={{ 
                color: "var(--terminal-amber)", 
                background: "var(--terminal-bg)",
                border: "1px solid var(--terminal-amber)",
                padding: "2px 6px",
                fontSize: "0.8rem"
              }}
            >
              ✓ {sectionId}
            </span>
          ))}
        </div>

        {gameProgress === 100 && (
          <div style={{ marginTop: "15px" }}>
            <p style={{ color: "var(--terminal-amber)", fontWeight: "bold" }}>
              🎉 ¡Parabéns! Completaches todo o programa das Polinizadoras Rurais! 🎉
            </p>
          </div>
        )}

        {gameProgress > 0 && (
          <button 
            className="back-button"
            onClick={resetProgress}
            style={{ 
              marginTop: "10px",
              color: "var(--terminal-pink)",
              borderColor: "var(--terminal-pink)"
            }}
          >
            🔄 Reiniciar Progreso
          </button>
        )}
      </div>
    </div>
  );
};

export default GameProgress;
