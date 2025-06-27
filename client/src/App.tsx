import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useBeesGame } from "@/lib/stores/useBeesGame";
import { gameText } from "@/lib/gameData";
import RuralHackersOS from "@/components/RuralHackersOS";
import ProgramWindow from "@/components/ProgramWindow";
import VillageWindow from "@/components/VillageWindow";
import GameWindow from "@/components/GameWindow";
import AnceuBrowser from "@/components/AnceuBrowser";
import FornelosBrowser from "@/components/FornelosBrowser";
import NatureQuiz from "@/components/NatureQuiz";
import MemoryGame from "@/components/MemoryGame";
import WikipediaRural from "@/components/WikipediaRural";
import PhotoGallery from "@/components/PhotoGallery";
import BeeSpaceGame from "@/components/BeeSpaceGame";
import VillageExplorer from "@/components/VillageExplorer";
import "./styles/windows95.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Main App Component
function App() {
  const { calculateProgress } = useBeesGame();
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  useEffect(() => {
    const soundFiles = ["hit.mp3", "success.mp3", "background.mp3"];
    soundFiles.forEach(sound => {
      const audio = new Audio(`/sounds/${sound}`);
      audio.preload = "auto";
    });
  }, []);

  const handleOpenWindow = (windowType: string) => {
    if (!openWindows.includes(windowType)) {
      setOpenWindows([...openWindows, windowType]);
    }
    setShowStartMenu(false);
  };

  const handleCloseWindow = (windowType: string) => {
    setOpenWindows(openWindows.filter(w => w !== windowType));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="desktop">
        <RuralHackersOS onOpenWindow={handleOpenWindow} />
        
        {openWindows.includes('program') && (
          <ProgramWindow onClose={() => handleCloseWindow('program')} />
        )}
        
        {openWindows.includes('villages') && (
          <VillageWindow onClose={() => handleCloseWindow('villages')} />
        )}
        
        {openWindows.includes('game') && (
          <GameWindow onClose={() => handleCloseWindow('game')} />
        )}

        {openWindows.includes('anceu-browser') && (
          <AnceuBrowser onClose={() => handleCloseWindow('anceu-browser')} />
        )}

        {openWindows.includes('fornelos-browser') && (
          <FornelosBrowser onClose={() => handleCloseWindow('fornelos-browser')} />
        )}

        {openWindows.includes('nature-quiz') && (
          <NatureQuiz onClose={() => handleCloseWindow('nature-quiz')} />
        )}

        {openWindows.includes('memory-game') && (
          <MemoryGame onClose={() => handleCloseWindow('memory-game')} />
        )}

        {openWindows.includes('wikipedia') && (
          <WikipediaRural onClose={() => handleCloseWindow('wikipedia')} />
        )}

        {openWindows.includes('photo-gallery') && (
          <PhotoGallery onClose={() => handleCloseWindow('photo-gallery')} />
        )}

        {openWindows.includes('bee-space-game') && (
          <BeeSpaceGame onClose={() => handleCloseWindow('bee-space-game')} />
        )}

        {openWindows.includes('village-game') && (
          <VillageExplorer onClose={() => handleCloseWindow('village-game')} />
        )}

        {showStartMenu && (
          <div style={{
            position: 'fixed',
            bottom: '30px',
            left: '2px',
            width: '250px',
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            zIndex: 1000,
            boxShadow: '4px 4px 8px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              background: 'linear-gradient(90deg, #000080, #0080ff)',
              color: 'white',
              padding: '8px 12px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}>
              🐝 Beautiful Bees - Polinizadoras Rurais
            </div>
            <div style={{ padding: '4px' }}>
              <button className="win95-button" onClick={() => handleOpenWindow('program')} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                📚 Programa Beautiful Bees
              </button>
              <button className="win95-button" onClick={() => handleOpenWindow('bee-space-game')} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                🚀 Nave Espacial das Abellas
              </button>
              <button className="win95-button" onClick={() => handleOpenWindow('anceu-browser')} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                🌐 Anceu Explorer
              </button>
              <button className="win95-button" onClick={() => handleOpenWindow('fornelos-browser')} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                🏔️ Fornelos Navigator
              </button>
              <hr style={{ margin: '4px 0', border: '1px inset #c0c0c0' }} />
              <button className="win95-button" onClick={() => handleOpenWindow('nature-quiz')} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                🌿 Quiz Biomimético
              </button>
              <button className="win95-button" onClick={() => handleOpenWindow('memory-game')} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                🧠 Memoria Rural
              </button>
              <button className="win95-button" onClick={() => handleOpenWindow('photo-gallery')} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                📷 Galería Fotográfica
              </button>
              <hr style={{ margin: '4px 0', border: '1px inset #c0c0c0' }} />
              <button className="win95-button" onClick={() => setShowStartMenu(false)} style={{ width: '100%', textAlign: 'left', margin: '1px 0' }}>
                ❌ Pechar
              </button>
            </div>
          </div>
        )}
        
        <div className="taskbar">
          <button 
            className="start-button"
            onClick={() => setShowStartMenu(!showStartMenu)}
            style={{
              backgroundColor: showStartMenu ? '#a0a0a0' : undefined,
              border: showStartMenu ? '2px inset #c0c0c0' : '2px outset #c0c0c0'
            }}
          >
            <div className="start-button-icon">🐝</div>
            Inicio
          </button>
          
          <div style={{ flex: 1, display: 'flex', gap: '2px', padding: '0 4px' }}>
            {openWindows.map(windowType => (
              <button
                key={windowType}
                className="win95-button"
                style={{
                  fontSize: '10px',
                  padding: '2px 6px',
                  height: '20px',
                  border: '1px inset #c0c0c0'
                }}
                onClick={() => {/* Focus window logic could go here */}}
              >
                {windowType === 'program' && '📚'}
                {windowType === 'bee-space-game' && '🚀'}
                {windowType === 'anceu-browser' && '🌐'}
                {windowType === 'fornelos-browser' && '🏔️'}
                {windowType === 'nature-quiz' && '🌿'}
                {windowType === 'memory-game' && '🧠'}
                {windowType === 'photo-gallery' && '📷'}
                {windowType === 'wikipedia' && '📖'}
              </button>
            ))}
          </div>
          
          <div className="taskbar-clock">
            {new Date().toLocaleTimeString('gl-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
