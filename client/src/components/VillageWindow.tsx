import React from "react";

interface VillageWindowProps {
  onClose: () => void;
}

const VillageWindow: React.FC<VillageWindowProps> = ({ onClose }) => {
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
        <span>🗺️ Mapa Interactivo - Aldeas Rurais</span>
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
          Exploración das Aldeas Galegas
        </h2>
        
        <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>🏔️ Anceu Coliving</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Unha residencia colaborativa para artistas e creadores no corazón de Galicia.
            Espazo de vida comunitaria que combina traballo remoto con sustentabilidade rural.
          </p>
        </div>

        <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>🌿 Fornelos de Montes</h3>
          <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0' }}>
            Unha aldea na Serra do Suído onde se desenvolven proxectos de innovación rural
            e transformación social a través da arte e a tecnoloxía.
          </p>
        </div>

        <div className="win95-panel" style={{ padding: '12px' }}>
          <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>🎯 Actividades Dispoñibles</h3>
          <ul style={{ fontSize: '11px', lineHeight: '1.4', margin: '0', paddingLeft: '16px' }}>
            <li>Exploración interactiva das aldeas</li>
            <li>Navegadores temáticos de cada lugar</li>
            <li>Información sobre proxectos locais</li>
            <li>Conectar con residentes e artistas</li>
          </ul>
        </div>
      </div>
      <div className="window-resize-handle"></div>
    </div>
  );
};

export default VillageWindow;