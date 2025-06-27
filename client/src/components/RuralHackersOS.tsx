import React, { useState, useEffect } from "react";
import DraggableDesktop from "./DraggableDesktop";
import VillageExplorer from "./VillageExplorer";

interface RuralHackersOSProps {
  onOpenWindow: (windowType: string) => void;
}

const RuralHackersOS: React.FC<RuralHackersOSProps> = ({ onOpenWindow }) => {
  const [bootPhase, setBootPhase] = useState<'boot' | 'login' | 'desktop'>('boot');
  const [bootProgress, setBootProgress] = useState(0);
  const [bootText, setBootText] = useState('');
  const [username, setUsername] = useState('');
  const [showVillageGame, setShowVillageGame] = useState(false);

  const bootMessages = [
    'Rural Hackers OS v2.0.25',
    'Iniciando sistema...',
    'Cargando módulos de creatividad rural...',
    'Conectando con la comunidad...',
    'Preparando espacio colaborativo...',
    'Activando modo hacker rural...',
    'Sistema listo para crear'
  ];

  useEffect(() => {
    if (bootPhase === 'boot') {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            setBootPhase('login');
            return 100;
          }
          return newProgress;
        });
      }, 300);

      const textInterval = setInterval(() => {
        setBootText(bootMessages[Math.floor(Math.random() * bootMessages.length)]);
      }, 800);

      return () => {
        clearInterval(interval);
        clearInterval(textInterval);
      };
    }
  }, [bootPhase]);

  const handleLogin = () => {
    if (username.trim()) {
      setBootPhase('desktop');
    }
  };

  const handleOpenVillageGame = () => {
    setShowVillageGame(true);
  };

  if (bootPhase === 'boot') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: '#000',
        color: '#00ff00',
        fontFamily: 'Courier New, monospace',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Boot Logo */}
        <div style={{
          position: 'absolute',
          top: '20%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <img 
            src="/rural-hackers-logo.png" 
            alt="Rural Hackers"
            style={{
              width: '200px',
              height: 'auto',
              marginBottom: '20px',
              filter: 'brightness(0.8) contrast(1.2)'
            }}
          />
          <h1 style={{
            fontSize: '24px',
            margin: '0',
            textAlign: 'center',
            color: '#00ff00',
            textShadow: '0 0 10px #00ff00'
          }}>
            RURAL HACKERS OS
          </h1>
          <p style={{
            fontSize: '12px',
            margin: '5px 0 0 0',
            color: '#00aa00'
          }}>
            Version 2.0.25 - Coliving Edition
          </p>
        </div>

        {/* Boot Progress */}
        <div style={{
          position: 'absolute',
          bottom: '30%',
          width: '60%',
          maxWidth: '500px'
        }}>
          <div style={{
            width: '100%',
            height: '20px',
            border: '1px solid #00ff00',
            background: '#000',
            marginBottom: '10px'
          }}>
            <div style={{
              width: `${bootProgress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00ff00, #00aa00)',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          
          <div style={{
            fontSize: '12px',
            color: '#00aa00',
            textAlign: 'center',
            minHeight: '15px'
          }}>
            {bootText}
          </div>
          
          <div style={{
            fontSize: '10px',
            color: '#008800',
            textAlign: 'center',
            marginTop: '5px'
          }}>
            {Math.floor(bootProgress)}% completado
          </div>
        </div>

        {/* Retro Terminal Effects */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'repeating-linear-gradient(transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)',
          pointerEvents: 'none'
        }}></div>
      </div>
    );
  }

  if (bootPhase === 'login') {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a, #0f172a)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'MS Sans Serif, sans-serif'
      }}>
        <div style={{
          background: '#c0c0c0',
          border: '2px outset #c0c0c0',
          padding: '30px',
          minWidth: '400px',
          boxShadow: '4px 4px 8px rgba(0,0,0,0.5)'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <img 
              src="/rural-hackers-logo.png" 
              alt="Rural Hackers"
              style={{
                width: '80px',
                height: 'auto',
                marginBottom: '10px'
              }}
            />
            <h2 style={{
              fontSize: '16px',
              margin: '0 0 5px 0',
              color: '#000080'
            }}>
              Benvido a Rural Hackers OS
            </h2>
            <p style={{
              fontSize: '11px',
              margin: '0',
              color: '#666'
            }}>
              Introduce o teu nome de hacker rural
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '11px',
              marginBottom: '5px',
              color: '#000'
            }}>
              Nome de Usuario:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="rural_hacker"
              style={{
                width: '100%',
                padding: '4px',
                border: '2px inset #c0c0c0',
                fontSize: '11px',
                fontFamily: 'MS Sans Serif, sans-serif'
              }}
              autoFocus
            />
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px'
          }}>
            <button
              onClick={handleLogin}
              disabled={!username.trim()}
              className="win95-button primary"
              style={{
                flex: 1,
                padding: '6px',
                fontSize: '11px'
              }}
            >
              Acceder
            </button>
            <button
              onClick={() => setUsername('Hacker_Rural')}
              className="win95-button"
              style={{
                flex: 1,
                padding: '6px',
                fontSize: '11px'
              }}
            >
              Invitado
            </button>
          </div>

          <div style={{
            marginTop: '15px',
            fontSize: '10px',
            color: '#666',
            textAlign: 'center',
            borderTop: '1px solid #999',
            paddingTop: '10px'
          }}>
            🏡 Comunidade de arte, tecnoloxía e transformación rural
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="desktop">
      <DraggableDesktop onOpenWindow={(windowType) => {
        if (windowType === 'village-game') {
          handleOpenVillageGame();
        } else {
          onOpenWindow(windowType);
        }
      }} />
      
      {showVillageGame && (
        <VillageExplorer onClose={() => setShowVillageGame(false)} />
      )}

      {/* Rural Hackers Taskbar */}
      <div className="taskbar" style={{
        background: 'linear-gradient(90deg, #2d5a27, #1f3d1a)',
        borderTop: '1px solid #4a7c59'
      }}>
        <button className="start-button" style={{
          background: 'linear-gradient(90deg, #2d5a27, #4a7c59)',
          color: 'white'
        }}>
          <img 
            src="/attached_assets/Logo Rural Hackers_1750953371138.png" 
            alt="RH"
            style={{
              width: '16px',
              height: '16px',
              marginRight: '4px'
            }}
          />
          Rural Hackers
        </button>
        
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '11px'
        }}>
          Benvido, {username} | 🏡 Anceu Coliving - Comunidade Creativa
        </div>
        
        <div className="taskbar-clock" style={{ color: 'white' }}>
          {new Date().toLocaleTimeString('gl-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default RuralHackersOS;