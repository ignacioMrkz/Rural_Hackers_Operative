import React from "react";

interface ProgramWindowProps {
  onClose: () => void;
}

const ProgramWindow: React.FC<ProgramWindowProps> = ({ onClose }) => {
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
        <span>📚 Beautiful Bees - Polinizadoras Rurais</span>
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
          Beautiful Bees: Polinizadoras Rurais
        </h2>
        
        <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>Sobre o Programa</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Beautiful Bees é un programa transformador que une mulleres, territorios e saberes 
            en procesos de aprendizaxe colectiva profunda. Explora os principios biomíméticos, 
            coñece as aldeas galegas e aprende sobre sustentabilidade rural.
          </p>
        </div>

        <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>Exploración</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Descubre Anceu Coliving e Fornelos de Montes, dous espazos únicos onde arte, 
            tecnoloxía e vida rural converxen para crear comunidades sostibles e creativas.
          </p>
        </div>

        <div className="win95-panel" style={{ padding: '12px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>Actividades</h3>
          <ul style={{ fontSize: '11px', lineHeight: '1.4', margin: '0', paddingLeft: '16px' }}>
            <li>Xogos educativos sobre polinización</li>
            <li>Exploración interactiva das aldeas</li>
            <li>Quiz sobre biomimética</li>
            <li>Galería fotográfica dos proxectos</li>
          </ul>
        </div>
      </div>
      <div className="window-resize-handle"></div>
    </div>
  );
};

export default ProgramWindow;