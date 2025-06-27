import React, { useState } from "react";

interface AnceuBrowserProps {
  onClose: () => void;
}

const AnceuBrowser: React.FC<AnceuBrowserProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <div style={{ padding: "16px", lineHeight: "1.6" }}>
            <h1 style={{ color: "#0066cc", fontSize: "18px", marginBottom: "12px" }}>🌐 Anceu Coliving - Aldea Rural Digital</h1>
            
            <div style={{ backgroundColor: "#f0f8ff", padding: "12px", border: "1px solid #ccc", marginBottom: "16px" }}>
              <strong>📍 Localización:</strong> Parroquia de Anceu (Santo André), Ponte Caldelas, Pontevedra<br/>
              <strong>👥 Poboación:</strong> 96 habitantes<br/>
              <strong>📡 Conectividade:</strong> Fibra óptica 600 Mbps
            </div>

            <h2 style={{ color: "#006600", fontSize: "14px", marginTop: "16px" }}>Anceu Coliving - Innovación Rural</h2>
            <p>
              Anceu Coliving é un proxecto pioneiro de "coliving rural" que opera desde xullo 2020, 
              deseñado para revitalizar a aldea mediante a atracción de traballadores remotos e nómadas dixitais.
            </p>

            <h3 style={{ color: "#cc6600", fontSize: "12px", marginTop: "12px" }}>Características do Aloxamento</h3>
            <ul style={{ fontSize: "11px" }}>
              <li><strong>Capacidade:</strong> 16 camas, 13 baños</li>
              <li><strong>Estancia mínima:</strong> 1 mes</li>
              <li><strong>Instalacións:</strong> Espazos de coworking interior e exterior</li>
              <li><strong>Servicios:</strong> Piscina, xardín, cociña equipada, horta orgánica</li>
              <li><strong>Pet-friendly:</strong> Admite mascotas</li>
            </ul>

            <h3 style={{ color: "#cc6600", fontSize: "12px", marginTop: "12px" }}>Actividades Dispoñibles</h3>
            <ul style={{ fontSize: "11px" }}>
              <li>🥾 Sendeirismo polo bosque (a minutos a pé)</li>
              <li>🏊 Baño en río e cascadas</li>
              <li>🎨 Talleres de tecnoloxía, arte e cultura</li>
              <li>🧘 Yoga e meditación</li>
              <li>🌱 Actividades de agricultura sostible</li>
              <li>💡 Intercambio de coñecementos entre residentes</li>
            </ul>

            <div style={{ backgroundColor: "#fff5ee", padding: "8px", border: "1px solid #ddd", marginTop: "12px" }}>
              <strong>💡 Filosofía:</strong> "Pensa global, actúa local, revive rural" - enfocado en crear un impacto positivo 
              na comunidade local, fomentar a sostibilidade e promover o intercambio de coñecementos.
            </div>

            <div style={{ marginTop: "16px" }}>
              <button 
                className="win95-button" 
                onClick={() => setCurrentPage("gallery")}
                style={{ marginRight: "8px" }}
              >
                📷 Ver Fotos
              </button>
              <button 
                className="win95-button" 
                onClick={() => setCurrentPage("activities")}
                style={{ marginRight: "8px" }}
              >
                🎯 Actividades
              </button>
              <button 
                className="win95-button" 
                onClick={() => setCurrentPage("contact")}
              >
                📞 Contacto
              </button>
            </div>
          </div>
        );

      case "gallery":
        return (
          <div style={{ padding: "16px" }}>
            <h2 style={{ color: "#0066cc", fontSize: "16px", marginBottom: "12px" }}>📷 Galería Fotográfica de Anceu</h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div className="win95-panel" style={{ textAlign: "center", padding: "12px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏠</div>
                <strong>Casa Rural</strong><br/>
                <small>Coliving con 16 camas e espazos comunitarios</small>
              </div>
              
              <div className="win95-panel" style={{ textAlign: "center", padding: "12px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌊</div>
                <strong>Río e Cascadas</strong><br/>
                <small>Espazos naturais para o baño e relax</small>
              </div>
              
              <div className="win95-panel" style={{ textAlign: "center", padding: "12px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌲</div>
                <strong>Bosque Autóctono</strong><br/>
                <small>Sendeiros e natureza galega pristina</small>
              </div>
              
              <div className="win95-panel" style={{ textAlign: "center", padding: "12px" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>💻</div>
                <strong>Espazo Coworking</strong><br/>
                <small>Oficinas exteriores con vistas ás montañas</small>
              </div>
            </div>

            <div className="win95-panel" style={{ padding: "12px" }}>
              <h3 style={{ fontSize: "12px", color: "#006600" }}>Entorno Natural</h3>
              <p style={{ fontSize: "11px", lineHeight: "1.4" }}>
                Anceu está rodeado de natureza galega pristina, con acceso directo a bosques e ríos. 
                O ambiente tranquilo e sostible forma parte da "España Verde", ofrecendo unha experiencia 
                única de vida rural auténtica.
              </p>
            </div>

            <button className="win95-button" onClick={() => setCurrentPage("home")}>
              ← Volver ao inicio
            </button>
          </div>
        );

      case "activities":
        return (
          <div style={{ padding: "16px" }}>
            <h2 style={{ color: "#0066cc", fontSize: "16px", marginBottom: "12px" }}>🎯 Actividades e Proxectos</h2>
            
            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Rural Hackers</div>
              <p style={{ fontSize: "11px", padding: "8px" }}>
                Plataforma para aprender tecnoloxía, artes e creatividade. Organiza eventos como Do_Action 
                para usar WordPress para o ben común e fomentar a innovación tecnolóxica no rural.
              </p>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Accións Circulares</div>
              <p style={{ fontSize: "11px", padding: "8px" }}>
                Iniciativas de biodiversidade para ríos e bosques locais. Proxectos de sostibilidade 
                ambiental que conectan a comunidade coa natureza.
              </p>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Casa do Pobo</div>
              <p style={{ fontSize: "11px", padding: "8px" }}>
                Espazo público para actividades comunitarias desde 2023. Centro de encontro para 
                colaboracións con comunidades xóvenes de A Lama, Ponte Caldelas e Fornelos de Montes.
              </p>
            </div>

            <div className="win95-panel" style={{ padding: "12px", backgroundColor: "#f5f5f5" }}>
              <strong style={{ fontSize: "12px", color: "#cc6600" }}>Impacto Comunitario</strong><br/>
              <small style={{ fontSize: "10px" }}>
                Colaboración activa na creación de rutas que conecten Anceu con Fornelos de Montes, 
                promovendo novos camiños físicos e simbólicos entre veciñas e proxectos.
              </small>
            </div>

            <button className="win95-button" onClick={() => setCurrentPage("home")}>
              ← Volver ao inicio
            </button>
          </div>
        );

      case "contact":
        return (
          <div style={{ padding: "16px" }}>
            <h2 style={{ color: "#0066cc", fontSize: "16px", marginBottom: "12px" }}>📞 Información de Contacto</h2>
            
            <div className="win95-panel" style={{ padding: "12px", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "12px", color: "#006600" }}>Anceu Coliving</h3>
              <p style={{ fontSize: "11px", lineHeight: "1.6" }}>
                <strong>📧 Email:</strong> agustin@anceu.com<br/>
                <strong>📱 Teléfono:</strong> +34 626 943 874<br/>
                <strong>🌐 Web:</strong> anceu.com<br/>
                <strong>📍 Enderezo:</strong> Anceu, Ponte Caldelas, Pontevedra
              </p>
            </div>

            <div className="win95-panel" style={{ padding: "12px", marginBottom: "12px" }}>
              <h3 style={{ fontSize: "12px", color: "#006600" }}>Coordenadas GPS</h3>
              <p style={{ fontSize: "11px" }}>
                <strong>Latitude:</strong> 42º 21' 05.4" N<br/>
                <strong>Lonxitude:</strong> 8º 27' 59.1" W
              </p>
            </div>

            <div className="win95-panel" style={{ padding: "12px", backgroundColor: "#e6ffe6" }}>
              <strong style={{ fontSize: "12px", color: "#006600" }}>Valoración dos Visitantes</strong><br/>
              <div style={{ fontSize: "16px", margin: "4px 0" }}>⭐⭐⭐⭐⭐</div>
              <small style={{ fontSize: "10px" }}>
                4.9/5 estrelas baseado en 61 reseñas, destacando a comunidade, 
                a natureza e a experiencia de vida rural auténtica.
              </small>
            </div>

            <button className="win95-button" onClick={() => setCurrentPage("home")}>
              ← Volver ao inicio
            </button>
          </div>
        );

      default:
        return <div>Páxina non encontrada</div>;
    }
  };

  return (
    <div className="window window-opening" style={{ 
      position: 'absolute', 
      top: '8%', 
      left: '8%', 
      width: '84%', 
      maxWidth: '800px',
      height: '80%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>🌐 Anceu Explorer - Internet Explorer</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      <div className="win95-panel" style={{ padding: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "11px" }}>Enderezo:</span>
        <div className="win95-input" style={{ 
          flex: 1, 
          padding: "2px 4px",
          fontSize: "11px",
          backgroundColor: "white"
        }}>
          http://anceu.com/{currentPage}
        </div>
        <button className="win95-button" style={{ fontSize: "10px" }}>Ir</button>
      </div>
      
      <div className="window-content win95-scrollbar" style={{ 
        height: 'calc(100% - 60px)', 
        overflow: 'auto',
        backgroundColor: "white"
      }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default AnceuBrowser;