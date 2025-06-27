import React from "react";

interface GameWindowProps {
  onClose: () => void;
}

const GameWindow: React.FC<GameWindowProps> = ({ onClose }) => {
  return (
    <div className="window window-opening resizable" style={{ 
      position: 'absolute', 
      top: '10%', 
      left: '15%', 
      width: '70%',
      height: '75%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>🎮 Centro de Xogos - Rural Hackers</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      <div className="window-content" style={{ 
        height: 'calc(100% - 28px)', 
        overflow: 'auto',
        padding: "16px"
      }}>
        <h2 style={{ fontSize: '16px', marginBottom: '16px', color: '#000080' }}>
          Centro de Xogos Educativos
        </h2>
        
        <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>🚀 Nave Espacial das Abellas</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Pilota unha nave espacial coa abella e poliniza flores na galaxia. 
            Xogo de acción con misións de polinización e puntuacións.
          </p>
        </div>

        <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>🏘️ Vila Rural Hackers</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Explora Anceu Coliving en estilo Minecraft/Pokemon. Coñece aos residentes artísticos,
            visita o Café de Reparación Fuchiqueira e descubre proxectos creativos.
          </p>
        </div>

        <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>🌿 Quiz Biomimético</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Pon a proba os teus coñecementos sobre biomimética e innovación natural.
            Aprende sobre os principios da natureza aplicados á tecnoloxía.
          </p>
        </div>

        <div className="win95-panel" style={{ padding: '12px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>🧠 Memoria Rural</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Xogo de memoria con elementos da vida rural galega. 
            Desenvolve a memoria mentres aprendes sobre tradición e modernidade.
          </p>
        </div>
      </div>
      <div className="window-resize-handle"></div>
    </div>
  );
};

export default GameWindow;