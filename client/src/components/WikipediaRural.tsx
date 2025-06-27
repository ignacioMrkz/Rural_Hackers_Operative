import React, { useState } from "react";

interface WikipediaRuralProps {
  onClose: () => void;
}

const WikipediaRural: React.FC<WikipediaRuralProps> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

  const articles = {
    home: {
      title: "Wikipedia Rural Galega",
      content: `
        <h2>Benvid@ á Wikipedia Rural Galega</h2>
        <p>Enciclopedia libre sobre o patrimonio natural e cultural das aldeas galegas.</p>
        
        <h3>Artigos destacados:</h3>
        <ul>
          <li><a href="#" onclick="setCurrentPage('biomimetica')">🔬 Biomimética</a></li>
          <li><a href="#" onclick="setCurrentPage('anceu')">🏘️ Anceu</a></li>
          <li><a href="#" onclick="setCurrentPage('fornelos')">🏔️ Fornelos de Montes</a></li>
          <li><a href="#" onclick="setCurrentPage('serra-suido')">⛰️ Serra do Suído</a></li>
          <li><a href="#" onclick="setCurrentPage('polinizacion')">🐝 Polinización</a></li>
          <li><a href="#" onclick="setCurrentPage('coliving')">🏠 Coliving Rural</a></li>
        </ul>

        <h3>Categorías:</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 12px 0;">
          <div class="win95-panel" style="padding: 8px;">
            <strong>🌿 Natureza</strong><br/>
            <small>Flora, fauna, ecosistemas</small>
          </div>
          <div class="win95-panel" style="padding: 8px;">
            <strong>🏛️ Patrimonio</strong><br/>
            <small>Arquitectura, historia, tradicións</small>
          </div>
          <div class="win95-panel" style="padding: 8px;">
            <strong>💡 Innovación</strong><br/>
            <small>Tecnoloxía rural, sostibilidade</small>
          </div>
          <div class="win95-panel" style="padding: 8px;">
            <strong>👥 Comunidade</strong><br/>
            <small>Proxectos, iniciativas sociais</small>
          </div>
        </div>
      `
    },
    biomimetica: {
      title: "Biomimética",
      content: `
        <h2>Biomimética</h2>
        <p><strong>Biomimética</strong> (do grego <em>bios</em>, vida, e <em>mimesis</em>, imitar) é unha disciplina científica que estuda a natureza como fonte de inspiración para a innovación tecnolóxica.</p>

        <h3>Definición</h3>
        <p>A biomimética busca solucións sostibles aos problemas humanos mediante o estudo das funcións biológicas, procesos e elementos naturais.</p>

        <h3>Principios fundamentais</h3>
        <ul>
          <li><strong>Nature-based thinking:</strong> Aprender dos sistemas naturais</li>
          <li><strong>Being-based thinking:</strong> Integrar conciencia e propósito</li>
          <li><strong>Connecting-based thinking:</strong> Crear redes colaborativas</li>
        </ul>

        <h3>Exemplos na natureza galega</h3>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0;">
          <strong>🐝 Abellas e organización social:</strong> As colmeas inspiran modelos de colaboración e eficiencia organizativa.
        </div>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0;">
          <strong>🌊 Sistemas hídricos:</strong> Os ríos galegos mostran patróns de distribución eficiente de recursos.
        </div>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0;">
          <strong>🌳 Bosques autóctonos:</strong> Redes de comunicación subterránea entre árbores.
        </div>

        <h3>Aplicacións no programa Beautiful Bees</h3>
        <p>O programa utiliza os principios biomimét(r)icos para deseñar experiencias de aprendizaxe que conectan mulleres, territorios e saberes.</p>
      `
    },
    anceu: {
      title: "Anceu",
      content: `
        <h2>Anceu</h2>
        <p><strong>Anceu</strong> é unha aldea na parroquia de Santo André de Anceu, concello de Ponte Caldelas, provincia de Pontevedra.</p>

        <h3>Xeografía</h3>
        <ul>
          <li><strong>Coordenadas:</strong> 42°21'05.4"N 8°27'59.1"W</li>
          <li><strong>Altitude:</strong> Aproximadamente 400 metros sobre o nivel do mar</li>
          <li><strong>Poboación:</strong> 96 habitantes (censo 2023)</li>
        </ul>

        <h3>Historia</h3>
        <p>Anceu formaba parte das rutas históricas de arrieiros desde O Ribeiro ata Pontevedra. O histórico Ponte Anceu conecta os municipios de A Lama e Fornelos de Montes.</p>

        <h3>Anceu Coliving (2020-presente)</h3>
        <p>Proxecto pioneiro de coliving rural que opera desde xullo de 2020, deseñado para revitalizar a aldea mediante a atracción de traballadores remotos.</p>
        
        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #f0f8ff;">
          <strong>Características técnicas:</strong>
          <ul>
            <li>Fibra óptica 600 Mbps (Áurea Telecom)</li>
            <li>16 camas, 13 baños</li>
            <li>Espazos de coworking interior e exterior</li>
            <li>Piscina, xardín, horta orgánica</li>
          </ul>
        </div>

        <h3>Impacto comunitario</h3>
        <p>O proxecto desenvolve iniciativas como Rural Hackers, Accións Circulares e a Casa do Pobo para fomentar a colaboración local.</p>
      `
    },
    fornelos: {
      title: "Fornelos de Montes",
      content: `
        <h2>Fornelos de Montes</h2>
        <p><strong>Fornelos de Montes</strong> é un municipio da provincia de Pontevedra, na comarca de Vigo, coñecido por ser o lugar máis chuvioso de Galicia.</p>

        <h3>Organización territorial</h3>
        <ul>
          <li><strong>Parroquias:</strong> 7 (Calvos, Estacas, Fornelos de Montes, Lage, Oitaven, Traspielas, Ventín)</li>
          <li><strong>Núcleos de poboación:</strong> 24</li>
          <li><strong>Superficie:</strong> Aproximadamente 50 km²</li>
        </ul>

        <h3>Xeografía</h3>
        <p>Situado na <strong>Serra do Suído</strong>, con picos como Couto Minuto (1,061m) e Outeiro Vello (1,008m). Atravesado polos ríos Oitavén, Barragán e Parada.</p>

        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #f0fff0;">
          <strong>🌧️ Clima:</strong> Ata 2,862 mm de precipitación anual, o máis alto de Galicia.
        </div>

        <h3>Patrimonio arqueolóxico</h3>
        <ul>
          <li><strong>Petroglifos de Xampardiño:</strong> Gravados da Idade do Bronce</li>
          <li><strong>Castro do Monte da Cidade:</strong> Asentamento da Idade de Ferro</li>
          <li><strong>Acueducto de 1787:</strong> Obra de enxeñería do século XVIII</li>
        </ul>

        <h3>Arquitectura etnográfica</h3>
        <ul>
          <li>40 chozos (refuxios de pastores)</li>
          <li>Foxos de lobos (trampas tradicionais)</li>
          <li>15 muíños de auga</li>
          <li>30 fontes e lavadeiros</li>
        </ul>

        <h3>Guerra Irmandiña</h3>
        <p>Durante as Revoltas Irmandiñas (1467-1469), Fornelos foi escenario de loitas populares contra a nobreza feudal.</p>
      `
    },
    "serra-suido": {
      title: "Serra do Suído",
      content: `
        <h2>Serra do Suído</h2>
        <p>A <strong>Serra do Suído</strong> é un sistema montañoso situado no sur da provincia de Pontevedra, declarado lugar de interese pola Unión Europea.</p>

        <h3>Xeografía física</h3>
        <ul>
          <li><strong>Pico máis alto:</strong> Couto Minuto (1,061 m)</li>
          <li><strong>Outros picos:</strong> Outeiro Vello (1,008 m)</li>
          <li><strong>Extensión:</strong> Abarca varios municipios incluíndo Fornelos de Montes</li>
        </ul>

        <h3>Hidrografía</h3>
        <p>Os lugareños din que "dos seus montes nacen 100 riachuelos". A serra é fonte de numerosos cursos de auga:</p>
        <ul>
          <li><strong>Río Oitavén:</strong> 32 km, nace na serra</li>
          <li><strong>Embalse de Eiras:</strong> Abastece Vigo</li>
          <li><strong>Fervenza de Casariños:</strong> Cascada emblemática</li>
        </ul>

        <h3>Biodiversidade</h3>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #f5fff5;">
          <strong>Flora:</strong> Bosques autóctonos de carballo, bidueiro e castiñeiro. Importantes poboacións de fieitos e musgos debido á alta humidade.
        </div>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #fff5f5;">
          <strong>Fauna:</strong> Territorio de gran riqueza ornitológica. Aves rapaces, mamíferos forestais e anfibios adaptados ao clima húmido.
        </div>

        <h3>Valor ecolóxico</h3>
        <p>A serra representa un ecosistema único caracterizado pola súa alta pluviosidade e biodiversidade, sendo crucial para a conservación ambiental da rexión.</p>
      `
    },
    polinizacion: {
      title: "Polinización",
      content: `
        <h2>Polinización</h2>
        <p>A <strong>polinización</strong> é o proceso polo cal o pole é transferido desde os estames (órganos masculinos) ata o pistilo (órgano feminino) das flores, permitindo a fecundación e reprodución das plantas.</p>

        <h3>Tipos de polinización</h3>
        <ul>
          <li><strong>Entomófila:</strong> Realizada por insectos (abellas, bolboretas, escarabajos)</li>
          <li><strong>Anemófila:</strong> Realizada polo vento</li>
          <li><strong>Hidrófila:</strong> Realizada pola auga</li>
          <li><strong>Ornitófila:</strong> Realizada por aves</li>
        </ul>

        <h3>As abellas como polinizadoras</h3>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #fffaf0;">
          <strong>🐝 Proceso de polinización por abellas:</strong>
          <ol>
            <li>A abella visita a flor en busca de néctar</li>
            <li>O pole adhírese ao seu corpo</li>
            <li>Ao visitar outra flor, parte do pole transfírese</li>
            <li>Prodúcese a fecundación e formación de sementes</li>
          </ol>
        </div>

        <h3>Importancia ecolóxica</h3>
        <p>Aproximadamente o 80% das plantas con flor dependen da polinización animal. As abellas son responsables de polinizar:</p>
        <ul>
          <li>Cultivos alimentarios (mazás, ameixas, kiwis)</li>
          <li>Plantas silvestres nativas</li>
          <li>Especies ornamentais</li>
        </ul>

        <h3>Metáfora das Polinizadoras Rurais</h3>
        <p>No programa Beautiful Bees, as participantes actúan como "polinizadoras" que levan coñecementos, ideas e conexións entre territorios e comunidades rurais.</p>
      `
    },
    coliving: {
      title: "Coliving Rural",
      content: `
        <h2>Coliving Rural</h2>
        <p>O <strong>coliving rural</strong> é un modelo de vida compartida en contornos rurais que combina espazos privados e comunitarios para fomentar a colaboración e o intercambio de coñecementos.</p>

        <h3>Características do modelo</h3>
        <ul>
          <li><strong>Espazos compartidos:</strong> Cociñas, salas comúns, oficinas</li>
          <li><strong>Privacidade:</strong> Cuartos individuais ou studios</li>
          <li><strong>Tecnoloxía:</strong> Internet de alta velocidade</li>
          <li><strong>Comunidade:</strong> Actividades e eventos organizados</li>
        </ul>

        <h3>Beneficios para o territorio rural</h3>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #f0f8f0;">
          <strong>Revitalización demográfica:</strong> Atrae poboación nova aos núcleos rurais, especialmente profesionais remotos e emprendedores.
        </div>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #f0f0f8;">
          <strong>Dinamización económica:</strong> Xera consumo local, empregos e oportunidades de negocio para os habitantes locais.
        </div>
        <div class="win95-panel" style="padding: 8px; margin: 8px 0; background: #f8f0f0;">
          <strong>Intercambio cultural:</strong> Facilita o intercambio entre saberes urbanos e rurais, creando sinergias innovadoras.
        </div>

        <h3>Casos de éxito en Galicia</h3>
        <p><strong>Anceu Coliving</strong> é un exemplo pioneiro que desde 2020 demostra a viabilidade do modelo, atraendo residentes de múltiples nacionalidades e profesións.</p>

        <h3>Impacto na sostibilidade</h3>
        <p>O coliving rural promove modelos de vida máis sostibles mediante o uso compartido de recursos e a conexión directa coa natureza.</p>
      `
    }
  };

  const handleSearch = () => {
    const searchLower = searchTerm.toLowerCase();
    const foundArticle = Object.keys(articles).find(key => 
      articles[key].title.toLowerCase().includes(searchLower) ||
      articles[key].content.toLowerCase().includes(searchLower)
    );
    
    if (foundArticle) {
      setCurrentPage(foundArticle);
    }
  };

  const renderArticle = () => {
    const article = articles[currentPage] || articles.home;
    
    return (
      <div 
        style={{ padding: "16px", lineHeight: "1.6", fontSize: "11px" }}
        dangerouslySetInnerHTML={{ 
          __html: article.content.replace(
            /onclick="setCurrentPage\('([^']+)'\)"/g, 
            `onclick="(function() { setCurrentPage('$1'); })()"`
          )
        }}
      />
    );
  };

  return (
    <div className="window window-opening" style={{ 
      position: 'absolute', 
      top: '5%', 
      left: '15%', 
      width: '70%', 
      maxWidth: '700px',
      height: '85%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>📖 Wikipedia Rural - Enciclopedia Libre</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="win95-panel" style={{ padding: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
        <button 
          className="win95-button" 
          onClick={() => setCurrentPage("home")}
          style={{ fontSize: "10px" }}
        >
          🏠 Inicio
        </button>
        <div style={{ flex: 1, display: "flex", gap: "4px" }}>
          <input
            type="text"
            className="win95-input"
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, fontSize: "11px" }}
          />
          <button 
            className="win95-button" 
            onClick={handleSearch}
            style={{ fontSize: "10px" }}
          >
            🔍 Buscar
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="win95-panel" style={{ padding: "4px", display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {Object.entries(articles).filter(([key]) => key !== 'home').map(([key, article]) => (
          <button
            key={key}
            className="win95-button"
            onClick={() => setCurrentPage(key)}
            style={{ 
              fontSize: "9px", 
              padding: "2px 6px",
              backgroundColor: currentPage === key ? "#000080" : undefined,
              color: currentPage === key ? "white" : undefined
            }}
          >
            {article.title}
          </button>
        ))}
      </div>
      
      <div className="window-content win95-scrollbar" style={{ 
        height: 'calc(100% - 80px)', 
        overflow: 'auto',
        backgroundColor: "white"
      }}>
        {renderArticle()}
      </div>
    </div>
  );
};

export default WikipediaRural;