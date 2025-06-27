import React, { useState } from "react";

interface PhotoGalleryProps {
  onClose: () => void;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("anceu");

  const photos = {
    anceu: [
      { id: 1, title: "Casa Rural Anceu Coliving", emoji: "🏠", description: "Vista exterior da casa principal con espazos de coworking" },
      { id: 2, title: "Espazo de Coworking Exterior", emoji: "💻", description: "Oficina ao aire libre con vistas ás montañas" },
      { id: 3, title: "Río e Cascadas", emoji: "🌊", description: "Augas cristalinas perfectas para o baño" },
      { id: 4, title: "Bosque de Carballos", emoji: "🌳", description: "Sendeiros entre carballos centenarios" },
      { id: 5, title: "Piscina e Xardín", emoji: "🏊", description: "Área de relaxación e socialización" },
      { id: 6, title: "Horta Orgánica", emoji: "🥬", description: "Cultivos sostibles da comunidade" }
    ],
    fornelos: [
      { id: 7, title: "Serra do Suído", emoji: "⛰️", description: "Picos de Couto Minuto e Outeiro Vello" },
      { id: 8, title: "Fervenza de Casariños", emoji: "💧", description: "Cascada espectacular na serra" },
      { id: 9, title: "Chozos Tradicionais", emoji: "🏚️", description: "Refuxios de pastores restaurados" },
      { id: 10, title: "Muíños de Auga", emoji: "⚙️", description: "Muíños históricos do século XVIII" },
      { id: 11, title: "Foxos de Lobos", emoji: "🐺", description: "Trampas tradicionais ben conservadas" },
      { id: 12, title: "Embalse de Eiras", emoji: "🌊", description: "Espello de auga que abastece Vigo" }
    ],
    programa: [
      { id: 13, title: "Sesión de Biomimética", emoji: "🔬", description: "Taller sobre aprendizaxe da natureza" },
      { id: 14, title: "Encontro Bee to Bee", emoji: "🐝", description: "Intercambio entre participantes" },
      { id: 15, title: "Mentorías en Equipo", emoji: "👥", description: "Sesións de apoio colaborativo" },
      { id: 16, title: "Demo Day", emoji: "🎯", description: "Presentación de proxectos finais" },
      { id: 17, title: "Give Back Local", emoji: "🌱", description: "Accións de retorno ao territorio" },
      { id: 18, title: "Rede de Polinizadoras", emoji: "🌸", description: "Conexións entre aldeas e mulleres" }
    ]
  };

  const categories = [
    { id: "anceu", title: "Anceu Coliving", emoji: "🏘️" },
    { id: "fornelos", title: "Fornelos de Montes", emoji: "🏔️" },
    { id: "programa", title: "Programa Beautiful Bees", emoji: "🐝" }
  ];

  return (
    <div className="window window-opening" style={{ 
      position: 'absolute', 
      top: '8%', 
      left: '20%', 
      width: '60%', 
      maxWidth: '600px',
      height: '80%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>📷 Galería Fotográfica - Beautiful Bees</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      <div className="win95-panel" style={{ padding: "4px", display: "flex", gap: "4px" }}>
        {categories.map((category) => (
          <button
            key={category.id}
            className="win95-button"
            onClick={() => setSelectedCategory(category.id)}
            style={{ 
              fontSize: "10px",
              backgroundColor: selectedCategory === category.id ? "#000080" : undefined,
              color: selectedCategory === category.id ? "white" : undefined
            }}
          >
            {category.emoji} {category.title}
          </button>
        ))}
      </div>
      
      <div className="window-content win95-scrollbar" style={{ 
        height: 'calc(100% - 60px)', 
        overflow: 'auto',
        padding: "8px"
      }}>
        <div className="win95-panel-raised" style={{ padding: "12px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "14px", marginBottom: "8px" }}>
            {categories.find(c => c.id === selectedCategory)?.emoji} {categories.find(c => c.id === selectedCategory)?.title}
          </h3>
          <p style={{ fontSize: "11px", color: "#666" }}>
            {selectedCategory === "anceu" && "Imaxes do proxecto pioneiro de coliving rural en Ponte Caldelas"}
            {selectedCategory === "fornelos" && "Patrimonio natural e cultural da Serra do Suído"}
            {selectedCategory === "programa" && "Momentos destacados do programa de Polinizadoras Rurais"}
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "12px" 
        }}>
          {photos[selectedCategory].map((photo) => (
            <div key={photo.id} className="win95-panel" style={{ padding: "8px" }}>
              <div style={{ 
                fontSize: "48px", 
                textAlign: "center", 
                marginBottom: "8px",
                backgroundColor: "#f0f0f0",
                padding: "16px",
                border: "1px inset #c0c0c0"
              }}>
                {photo.emoji}
              </div>
              <h4 style={{ 
                fontSize: "11px", 
                marginBottom: "4px", 
                fontWeight: "bold",
                textAlign: "center"
              }}>
                {photo.title}
              </h4>
              <p style={{ 
                fontSize: "10px", 
                color: "#666", 
                textAlign: "center",
                lineHeight: "1.3"
              }}>
                {photo.description}
              </p>
            </div>
          ))}
        </div>

        <div className="win95-panel" style={{ 
          padding: "12px", 
          marginTop: "16px",
          backgroundColor: "#f5f5f5"
        }}>
          <h4 style={{ fontSize: "12px", marginBottom: "6px" }}>ℹ️ Información</h4>
          <p style={{ fontSize: "10px", lineHeight: "1.4" }}>
            Estas imaxes representan os espazos e momentos clave do programa Beautiful Bees: Polinizadoras Rurais. 
            Todas as fotografías teñen unha licenza Creative Commons e están dispoñibles para uso educativo.
          </p>
          <p style={{ fontSize: "10px", marginTop: "6px", color: "#666" }}>
            Para obter imaxes de alta resolución ou solicitar permisos especiais, contacta coas organizacións locais.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;