import React, { useState, useEffect, useRef, useCallback } from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";

interface BeeSpaceGameProps {
  onClose: () => void;
}

interface Flower {
  id: number;
  x: number;
  y: number;
  pollinated: boolean;
  type: 'sunflower' | 'daisy' | 'tulip' | 'rose';
}

interface Bee {
  x: number;
  y: number;
  pollen: number;
}

const BeeSpaceGame: React.FC<BeeSpaceGameProps> = ({ onClose }) => {
  const { soundEnabled } = useBeesGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'completed'>('menu');
  const [bee, setBee] = useState<Bee>({ x: 300, y: 300, pollen: 0 });
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level, setLevel] = useState(1);
  
  const keysPressed = useRef<Set<string>>(new Set());

  const flowerEmojis = {
    sunflower: '🌻',
    daisy: '🌼', 
    tulip: '🌷',
    rose: '🌹'
  };

  const playSound = (soundFile: string) => {
    if (!soundEnabled) return;
    
    try {
      const audio = new Audio(`/sounds/${soundFile}`);
      audio.volume = 0.3;
      audio.play().catch(console.warn);
    } catch (error) {
      console.warn("Sound playback failed:", error);
    }
  };

  const generateFlowers = useCallback(() => {
    const newFlowers: Flower[] = [];
    const flowerTypes: (keyof typeof flowerEmojis)[] = ['sunflower', 'daisy', 'tulip', 'rose'];
    
    for (let i = 0; i < 8 + level * 2; i++) {
      newFlowers.push({
        id: i,
        x: Math.random() * 560 + 20,
        y: Math.random() * 360 + 20,
        pollinated: false,
        type: flowerTypes[Math.floor(Math.random() * flowerTypes.length)]
      });
    }
    setFlowers(newFlowers);
  }, [level]);

  const startGame = () => {
    setGameState('playing');
    setBee({ x: 300, y: 300, pollen: 0 });
    setScore(0);
    setTimeLeft(60);
    generateFlowers();
    playSound("success.mp3");
  };

  const checkCollision = (bee: Bee, flower: Flower) => {
    const distance = Math.sqrt(
      Math.pow(bee.x - flower.x, 2) + Math.pow(bee.y - flower.y, 2)
    );
    return distance < 30;
  };

  const gameLoop = useCallback(() => {
    if (gameState !== 'playing') return;

    setBee(currentBee => {
      let newX = currentBee.x;
      let newY = currentBee.y;
      let newPollen = currentBee.pollen;

      // Handle movement
      if (keysPressed.current.has('ArrowUp') || keysPressed.current.has('KeyW')) {
        newY = Math.max(20, newY - 3);
      }
      if (keysPressed.current.has('ArrowDown') || keysPressed.current.has('KeyS')) {
        newY = Math.min(380, newY + 3);
      }
      if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('KeyA')) {
        newX = Math.max(20, newX - 3);
      }
      if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('KeyD')) {
        newX = Math.min(580, newX + 3);
      }

      const newBee = { x: newX, y: newY, pollen: newPollen };

      // Check flower collisions
      setFlowers(currentFlowers => {
        return currentFlowers.map(flower => {
          if (!flower.pollinated && checkCollision(newBee, flower)) {
            playSound("hit.mp3");
            setScore(prev => prev + 10);
            newBee.pollen += 1;
            return { ...flower, pollinated: true };
          }
          return flower;
        });
      });

      return newBee;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, playSound]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#001122';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 50; i++) {
      const x = (i * 37) % canvas.width;
      const y = (i * 67) % canvas.height;
      ctx.fillRect(x, y, 1, 1);
    }

    if (gameState === 'playing') {
      // Draw flowers
      ctx.font = '24px Arial';
      flowers.forEach(flower => {
        ctx.fillStyle = flower.pollinated ? '#666' : '#fff';
        ctx.fillText(flowerEmojis[flower.type], flower.x - 12, flower.y + 8);
        
        if (!flower.pollinated) {
          // Glow effect
          ctx.shadowColor = '#ffff00';
          ctx.shadowBlur = 10;
          ctx.fillText(flowerEmojis[flower.type], flower.x - 12, flower.y + 8);
          ctx.shadowBlur = 0;
        }
      });

      // Draw bee spacecraft
      ctx.font = '20px Arial';
      ctx.fillStyle = '#ffff00';
      ctx.shadowColor = '#ff8800';
      ctx.shadowBlur = 5;
      ctx.fillText('🚀', bee.x - 10, bee.y + 6);
      ctx.shadowBlur = 0;

      // Draw bee trail
      ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
      ctx.fillText('🐝', bee.x - 25, bee.y + 6);
      ctx.fillText('🐝', bee.x - 40, bee.y + 6);
    }

    requestAnimationFrame(draw);
  }, [gameState, flowers, bee]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.code);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
      
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameState('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current);
        }
      };
    }
  }, [gameState, gameLoop]);

  useEffect(() => {
    draw();
  }, [draw]);

  useEffect(() => {
    const pollinatedCount = flowers.filter(f => f.pollinated).length;
    if (pollinatedCount === flowers.length && flowers.length > 0 && gameState === 'playing') {
      setLevel(prev => prev + 1);
      setTimeLeft(prev => prev + 15);
      generateFlowers();
      playSound("success.mp3");
    }
  }, [flowers, gameState, generateFlowers, playSound]);

  return (
    <div className="window window-opening resizable" style={{ 
      position: 'absolute', 
      top: '10%', 
      left: '15%', 
      width: '70%', 
      maxWidth: '700px',
      height: '75%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>🚀 Nave Espacial das Abellas - Polinización Galáctica</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      <div className="window-content" style={{ 
        height: 'calc(100% - 28px)', 
        overflow: 'hidden',
        padding: "0"
      }}>
        {gameState === 'menu' && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            background: 'linear-gradient(45deg, #001122, #002244)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀🐝</div>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Nave Espacial das Abellas</h2>
            <p style={{ fontSize: '12px', marginBottom: '20px', maxWidth: '400px', lineHeight: '1.4' }}>
              Pilota a túa nave espacial coa abella e poliniza todas as flores da galaxia!
              Usa as teclas WASD ou as frechas para moverte.
            </p>
            
            <div className="win95-panel" style={{ padding: '12px', marginBottom: '16px', background: 'rgba(255,255,255,0.1)' }}>
              <h3 style={{ fontSize: '12px', marginBottom: '8px' }}>Como xogar:</h3>
              <ul style={{ fontSize: '11px', textAlign: 'left', lineHeight: '1.4' }}>
                <li>🚀 Move a nave espacial coas teclas WASD ou frechas</li>
                <li>🌻 Toca as flores para polinizalas</li>
                <li>⏰ Completa todos os niveis antes de que se acabe o tempo</li>
                <li>🌟 Cada flor polinizada suma 10 puntos</li>
              </ul>
            </div>

            <button 
              className="win95-button primary" 
              onClick={startGame}
              style={{ 
                fontSize: '14px', 
                padding: '8px 16px',
                background: '#ffaa00',
                color: '#000'
              }}
            >
              🚀 Comezar Misión
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div style={{ height: '100%', position: 'relative' }}>
            <div className="win95-panel" style={{ 
              padding: '4px 8px', 
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '11px',
              background: '#c0c0c0'
            }}>
              <span>Puntuación: {score}</span>
              <span>Nivel: {level}</span>
              <span>Pole: {bee.pollen}</span>
              <span>Tempo: {timeLeft}s</span>
            </div>
            
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              style={{ 
                display: 'block',
                border: '2px inset #c0c0c0',
                background: '#001122'
              }}
            />
            
            <div className="win95-panel" style={{ 
              padding: '4px 8px', 
              fontSize: '10px',
              background: '#c0c0c0'
            }}>
              Usa WASD ou frechas para mover a nave. Poliniza todas as flores para avanzar ao seguinte nivel!
            </div>
          </div>
        )}

        {gameState === 'completed' && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            background: 'linear-gradient(45deg, #001122, #002244)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏆🐝</div>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Misión Completada!</h2>
            
            <div className="win95-panel" style={{ 
              padding: '16px', 
              marginBottom: '20px', 
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid #ffaa00'
            }}>
              <h3 style={{ fontSize: '14px', marginBottom: '8px', color: '#ffaa00' }}>Resultados da Misión</h3>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Puntuación Final: {score}</p>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Niveis Completados: {level}</p>
              <p style={{ fontSize: '12px', marginBottom: '4px' }}>Pole Recollido: {bee.pollen}</p>
              
              <div style={{ marginTop: '12px', fontSize: '11px' }}>
                {score >= 200 && <p style={{ color: '#00ff00' }}>⭐ Excelente Polinizador Galáctico!</p>}
                {score >= 100 && score < 200 && <p style={{ color: '#ffaa00' }}>⭐ Bo Traballo Espacial!</p>}
                {score < 100 && <p style={{ color: '#ff6600' }}>⭐ Segue Practicando!</p>}
              </div>
            </div>

            <button 
              className="win95-button primary" 
              onClick={startGame}
              style={{ 
                fontSize: '12px', 
                padding: '6px 12px',
                marginRight: '8px'
              }}
            >
              🔄 Xogar de Novo
            </button>
          </div>
        )}
      </div>
      <div className="window-resize-handle"></div>
    </div>
  );
};

export default BeeSpaceGame;