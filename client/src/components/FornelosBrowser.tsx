import React, { useState } from "react";

interface FornelosBrowserProps {
  onClose: () => void;
}

const FornelosBrowser: React.FC<FornelosBrowserProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <div style={{ padding: "16px", lineHeight: "1.6" }}>
            <h1 style={{ color: "#0066cc", fontSize: "18px", marginBottom: "12px" }}>🏔️ Fornelos de Montes - Terra de Auga e Montañas</h1>
            
            <div style={{ backgroundColor: "#f0fff0", padding: "12px", border: "1px solid #ccc", marginBottom: "16px" }}>
              <strong>📍 Localización:</strong> Fornelos de Montes, Pontevedra, Galicia<br/>
              <strong>🏘️ Parroquias:</strong> 7 parroquias, 24 núcleos de poboación<br/>
              <strong>🌧️ Particularidade:</strong> O lugar máis chuvioso de Galicia (ata 2,862 mm anuais)
            </div>

            <h2 style={{ color: "#006600", fontSize: "14px", marginTop: "16px" }}>Serra do Suído - Corazón Natural</h2>
            <p style={{ fontSize: "11px" }}>
              Fornelos de Montes está situado na Serra do Suído, declarada lugar de interese pola Unión Europea. 
              Os seus picos principais son Couto Minuto (1,061m) e Outeiro Vello (1,008m). Os lugareños din que 
              "dos seus montes nacen 100 riachuelos".
            </p>

            <h3 style={{ color: "#cc6600", fontSize: "12px", marginTop: "12px" }}>Rede Hidrográfica</h3>
            <ul style={{ fontSize: "11px" }}>
              <li><strong>Río Oitavén:</strong> 32 km de lonxitude, nace na Serra do Suído</li>
              <li><strong>Embalse de Eiras:</strong> Abastece de auga á cidade de Vigo</li>
              <li><strong>Fervenza de Casariños:</strong> Cascada espectacular</li>
              <li><strong>Praia fluvial:</strong> Para actividades recreativas</li>
            </ul>

            <h3 style={{ color: "#cc6600", fontSize: "12px", marginTop: "12px" }}>Patrimonio Histórico</h3>
            <ul style={{ fontSize: "11px" }}>
              <li>🗿 <strong>Petroglifos de Xampardiño</strong> (Idade do Bronce)</li>
              <li>🏰 <strong>Castro da Idade de Ferro</strong> no Monte da Cidade</li>
              <li>🌉 <strong>Acueducto de pedra</strong> do século XVIII (1787)</li>
              <li>⚔️ Restos da <strong>Torre de Alemparte</strong> (Revoltas Irmandiñas)</li>
            </ul>

            <div style={{ backgroundColor: "#fff5ee", padding: "8px", border: "1px solid #ddd", marginTop: "12px" }}>
              <strong>🏛️ Arquitectura Etnográfica:</strong> 40 chozos (refuxios de pastores), foxos de lobos, 
              parideiras, 15 muíños de auga, 30 fontes e lavadeiros, pontes de pedra históricos.
            </div>

            <div style={{ marginTop: "16px" }}>
              <button 
                className="win95-button" 
                onClick={() => setCurrentPage("heritage")}
                style={{ marginRight: "8px" }}
              >
                🏛️ Patrimonio
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
                onClick={() => setCurrentPage("legends")}
              >
                📜 Lendas
              </button>
            </div>
          </div>
        );

      case "heritage":
        return (
          <div style={{ padding: "16px" }}>
            <h2 style={{ color: "#0066cc", fontSize: "16px", marginBottom: "12px" }}>🏛️ Patrimonio Cultural e Natural</h2>
            
            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Arquitectura Tradicional</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", padding: "8px" }}>
                <div className="win95-panel" style={{ textAlign: "center", padding: "8px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "4px" }}>🏠</div>
                  <strong style={{ fontSize: "11px" }}>40 Chozos</strong><br/>
                  <small style={{ fontSize: "10px" }}>Refuxios de pastores</small>
                </div>
                
                <div className="win95-panel" style={{ textAlign: "center", padding: "8px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "4px" }}>⚙️</div>
                  <strong style={{ fontSize: "11px" }}>15 Muíños</strong><br/>
                  <small style={{ fontSize: "10px" }}>Muíños de auga históricos</small>
                </div>
                
                <div className="win95-panel" style={{ textAlign: "center", padding: "8px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "4px" }}>⛲</div>
                  <strong style={{ fontSize: "11px" }}>30 Fontes</strong><br/>
                  <small style={{ fontSize: "10px" }}>Fontes e lavadeiros</small>
                </div>
                
                <div className="win95-panel" style={{ textAlign: "center", padding: "8px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "4px" }}>🐺</div>
                  <strong style={{ fontSize: "11px" }}>Foxos de Lobos</strong><br/>
                  <small style={{ fontSize: "10px" }}>Trampas tradicionais</small>
                </div>
              </div>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Vestigios Arqueolóxicos</div>
              <div style={{ padding: "8px" }}>
                <p style={{ fontSize: "11px", lineHeight: "1.4", marginBottom: "8px" }}>
                  <strong>Petroglifos de Xampardiño:</strong> Gravados da Idade do Bronce na parroquia de Calvos, 
                  testemuños da presenza humana milenaria na zona.
                </p>
                <p style={{ fontSize: "11px", lineHeight: "1.4", marginBottom: "8px" }}>
                  <strong>Castro do Monte da Cidade:</strong> Asentamento da Idade de Ferro que domina o val, 
                  estratéxicamente situado para o control do territorio.
                </p>
                <p style={{ fontSize: "11px", lineHeight: "1.4" }}>
                  <strong>Acueducto do século XVIII:</strong> Obra de enxeñería de 1787 que aínda hoxe 
                  demostra a mestría construtiva dos nosos devanceiros.
                </p>
              </div>
            </div>

            <div className="win95-panel" style={{ padding: "12px", backgroundColor: "#f0f8ff" }}>
              <strong style={{ fontSize: "12px", color: "#006600" }}>Guerra Irmandiña (1467-1469)</strong><br/>
              <small style={{ fontSize: "10px" }}>
                Fornelos foi protagonista nas revoltas populares galegas contra a nobreza feudal. 
                Pedro Madruga, conde de Camiña, tivo gran influencia na zona durante este período histórico.
              </small>
            </div>

            <button className="win95-button" onClick={() => setCurrentPage("home")}>
              ← Volver ao inicio
            </button>
          </div>
        );

      case "activities":
        return (
          <div style={{ padding: "16px" }}>
            <h2 style={{ color: "#0066cc", fontSize: "16px", marginBottom: "12px" }}>🎯 Turismo Activo e Actividades</h2>
            
            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Deportes Acuáticos</div>
              <div style={{ padding: "8px" }}>
                <h3 style={{ fontSize: "12px", color: "#006600", marginBottom: "6px" }}>Fornelos Wake Club</h3>
                <p style={{ fontSize: "11px", lineHeight: "1.4", marginBottom: "8px" }}>
                  Centro de wakeboard e deportes acuáticos no río Oitavén. Parque acuático hinchable, 
                  alquiler de paddle surf e kayak. Eventos de música en vivo durante o verán.
                </p>
                <div style={{ backgroundColor: "#e6f3ff", padding: "6px", border: "1px solid #ccc" }}>
                  <small style={{ fontSize: "10px" }}>
                    O río Oitavén ofrece augas cristalinas ideais para deportes acuáticos e baño recreativo.
                  </small>
                </div>
              </div>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Rutas de Sendeirismo</div>
              <div style={{ padding: "8px" }}>
                <ul style={{ fontSize: "11px", lineHeight: "1.4" }}>
                  <li><strong>PR-G 164:</strong> Ruta de 17 km polo Monte da Cidade</li>
                  <li><strong>Sendeiro das Greas (GR-58):</strong> Gran percorrido galego</li>
                  <li><strong>Ruta dos Chozos:</strong> Pola arquitectura tradicional</li>
                  <li><strong>Ruta dos Foxos dos Lobos de Campo:</strong> Patrimonio etnográfico</li>
                </ul>
              </div>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Casa Rural A Loba</div>
              <div style={{ padding: "8px" }}>
                <p style={{ fontSize: "11px", lineHeight: "1.4", marginBottom: "6px" }}>
                  <strong>Enderezo:</strong> As Estacas, 2 - 36851 Fornelos de Montes<br/>
                  <strong>Teléfono:</strong> +34 650 956 466<br/>
                  <strong>Email:</strong> omarlorenzo@gmail.com
                </p>
                <div style={{ backgroundColor: "#f0fff0", padding: "6px", border: "1px solid #ccc" }}>
                  <small style={{ fontSize: "10px" }}>
                    Servicios: Aparcamento, instalacións infantís, cociña, TV común. 
                    Base ideal para explorar a Serra do Suído.
                  </small>
                </div>
              </div>
            </div>

            <div className="win95-panel" style={{ padding: "12px", backgroundColor: "#fff5ee" }}>
              <strong style={{ fontSize: "12px", color: "#cc6600" }}>Mellor Época para Visitar</strong><br/>
              <small style={{ fontSize: "10px" }}>
                Todo o ano, aínda que a alta pluviosidade require roupa impermeable. 
                Primavera e verán ideais para sendeirismo e deportes acuáticos.
              </small>
            </div>

            <button className="win95-button" onClick={() => setCurrentPage("home")}>
              ← Volver ao inicio
            </button>
          </div>
        );

      case "legends":
        return (
          <div style={{ padding: "16px" }}>
            <h2 style={{ color: "#0066cc", fontSize: "16px", marginBottom: "12px" }}>📜 Lendas e Tradicións</h2>
            
            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">A Lenda do Alén</div>
              <div style={{ padding: "12px" }}>
                <div style={{ fontSize: "32px", textAlign: "center", margin: "8px 0" }}>👻</div>
                <h3 style={{ fontSize: "12px", color: "#006600", marginBottom: "8px" }}>A Vila dos Mortos</h3>
                <p style={{ fontSize: "11px", lineHeight: "1.6", marginBottom: "8px" }}>
                  Os chozos están envoltos na lenda do Alén, coñecida como "A vila dos mortos". 
                  Segundo as tradicións locais, era un lugar mítico onde os anciáns ían a morrer, 
                  unha aldea invisible entre os mundos.
                </p>
                <div style={{ backgroundColor: "#f5f5f5", padding: "8px", border: "1px solid #ddd" }}>
                  <small style={{ fontSize: "10px", fontStyle: "italic" }}>
                    Esta lenda reflicte a profunda conexión dos habitantes de Fornelos coa natureza 
                    e o misterio das montañas que os rodean.
                  </small>
                </div>
              </div>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Os 100 Riachuelos</div>
              <div style={{ padding: "12px" }}>
                <div style={{ fontSize: "32px", textAlign: "center", margin: "8px 0" }}>💧</div>
                <p style={{ fontSize: "11px", lineHeight: "1.6", marginBottom: "8px" }}>
                  Os lugareños din que "dos montes de Fornelos nacen 100 riachuelos". Esta tradición oral 
                  celebra a riqueza hidrográfica da zona e a súa importancia como nacente de augas.
                </p>
                <div style={{ backgroundColor: "#e6f7ff", padding: "8px", border: "1px solid #ccc" }}>
                  <small style={{ fontSize: "10px" }}>
                    A abundancia de auga converteu a Fornelos no lugar máis chuvioso de Galicia, 
                    cun ecosistema único e exuberante.
                  </small>
                </div>
              </div>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Tradicións dos Foxos de Lobos</div>
              <div style={{ padding: "12px" }}>
                <div style={{ fontSize: "32px", textAlign: "center", margin: "8px 0" }}>🐺</div>
                <p style={{ fontSize: "11px", lineHeight: "1.6", marginBottom: "8px" }}>
                  Os foxos de lobos son trampas tradicionais escavadas na terra para cazar lobos que 
                  atacaban o gando. Estas estruturas representan a enxeñería popular e a loita ancestral 
                  entre humanos e natureza salvaxe.
                </p>
                <div style={{ backgroundColor: "#fff0f0", padding: "8px", border: "1px solid #ddd" }}>
                  <small style={{ fontSize: "10px" }}>
                    Hoxe en día son patrimonio etnográfico que nos conta a historia da convivencia 
                    entre as comunidades rurais e a fauna salvaxe das montañas galegas.
                  </small>
                </div>
              </div>
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
      top: '10%', 
      left: '12%', 
      width: '80%', 
      maxWidth: '800px',
      height: '75%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>🏔️ Fornelos Navigator - Internet Explorer</span>
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
          http://fornelos.gal/{currentPage}
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

export default FornelosBrowser;