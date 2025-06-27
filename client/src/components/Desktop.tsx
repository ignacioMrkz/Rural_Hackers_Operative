import React from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";

interface DesktopProps {
  onOpenWindow: (windowType: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onOpenWindow }) => {
  const { completedSections, gameProgress } = useBeesGame();

  const handleDoubleClick = (windowType: string) => {
    onOpenWindow(windowType);
  };

  return (
    <>
      {/* Row 1 - Main Programs */}
      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('program')} style={{ left: '20px', top: '20px' }}>
        <div className="desktop-icon-image">📚</div>
        <div className="desktop-icon-label">Programa Beautiful Bees</div>
      </div>

      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('anceu-browser')} style={{ left: '100px', top: '20px' }}>
        <div className="desktop-icon-image">🌐</div>
        <div className="desktop-icon-label">Anceu Explorer</div>
      </div>

      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('fornelos-browser')} style={{ left: '180px', top: '20px' }}>
        <div className="desktop-icon-image">🏔️</div>
        <div className="desktop-icon-label">Fornelos Navigator</div>
      </div>

      {/* Row 2 - Games and Activities */}
      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('game')} style={{ left: '20px', top: '120px' }}>
        <div className="desktop-icon-image">🎮</div>
        <div className="desktop-icon-label">Xogo das Abellas</div>
      </div>

      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('nature-quiz')} style={{ left: '100px', top: '120px' }}>
        <div className="desktop-icon-image">🌿</div>
        <div className="desktop-icon-label">Quiz Biomimético</div>
      </div>

      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('memory-game')} style={{ left: '180px', top: '120px' }}>
        <div className="desktop-icon-image">🧠</div>
        <div className="desktop-icon-label">Memoria Rural</div>
      </div>

      {/* Row 3 - Tools */}
      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('villages')} style={{ left: '20px', top: '220px' }}>
        <div className="desktop-icon-image">🗺️</div>
        <div className="desktop-icon-label">Mapa Interactivo</div>
      </div>

      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('photo-gallery')} style={{ left: '100px', top: '220px' }}>
        <div className="desktop-icon-image">📷</div>
        <div className="desktop-icon-label">Galería Fotográfica</div>
      </div>

      <div className="desktop-icon" onDoubleClick={() => handleDoubleClick('wikipedia')} style={{ left: '180px', top: '220px' }}>
        <div className="desktop-icon-image">📖</div>
        <div className="desktop-icon-label">Wikipedia Rural</div>
      </div>

      {/* Progress Icon */}
      <div className="desktop-icon" style={{ position: 'absolute', right: '20px', top: '20px' }}>
        <div className="desktop-icon-image">📊</div>
        <div className="desktop-icon-label">
          Progreso: {gameProgress}%<br/>
          {completedSections.size}/4 seccións
        </div>
      </div>

      {/* Welcome Message with nature theme */}
      <div style={{ 
        position: 'absolute', 
        bottom: '60px', 
        left: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '16px',
        border: '2px outset #c0c0c0',
        maxWidth: '320px',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        boxShadow: '4px 4px 8px rgba(0,0,0,0.3)'
      }}>
        <strong>🐝 Escritorio das Polinizadoras Rurais</strong><br/>
        <hr style={{ margin: '8px 0', border: '1px inset #c0c0c0' }} />
        Explora Anceu e Fornelos de Montes coa súa riqueza natural e cultural.<br/>
        <small style={{ color: '#666' }}>Fai dobre clic para abrir aplicacións</small>
      </div>
    </>
  );
};

export default Desktop;