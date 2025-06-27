import React, { useState, useEffect, useRef, useCallback } from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";

interface VillageExplorerProps {
  onClose: () => void;
}

interface Character {
  id: string;
  name: string;
  x: number;
  y: number;
  emoji: string;
  activity: string;
  dialogue: string[];
  currentDialogue: number;
}

interface Player {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'left' | 'right';
}

interface Building {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  emoji: string;
  description: string;
}

const VillageExplorer: React.FC<VillageExplorerProps> = ({ onClose }) => {
  const { soundEnabled } = useBeesGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  
  const [player, setPlayer] = useState<Player>({ x: 400, y: 300, direction: 'down' });
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [gameMessage, setGameMessage] = useState("Benvido a Anceu Coliving! Explora e coñece aos residentes artísticos.");
  
  const keysPressed = useRef<Set<string>>(new Set());

  const characters: Character[] = [
    {
      id: 'shona',
      name: 'Shona',
      x: 150, y: 200,
      emoji: '👩‍🎨',
      activity: 'pintando mural de Rogelio',
      dialogue: [
        "Ola! Son Shona, estou pintando este mural de Rogelio.",
        "El foi un dos fundadores desta comunidade rural.",
        "A arte ten o poder de contar historias e preservar memorias.",
        "Te gusta ver como vai quedando o mural?"
      ],
      currentDialogue: 0
    },
    {
      id: 'nacho',
      name: 'Nacho',
      x: 300, y: 150,
      emoji: '🧔‍♂️',
      activity: 'falando sobre rural hackers e o futuro',
      dialogue: [
        "Que tal! Son Nacho, un dos organizadores de Rural Hackers.",
        "Estamos construíndo o futuro das comunidades rurais.",
        "Tecnoloxía, arte e sustentabilidade van da man.",
        "O rural non é o pasado, é o futuro da innovación!"
      ],
      currentDialogue: 0
    },
    {
      id: 'africa',
      name: 'África',
      x: 500, y: 180,
      emoji: '👩‍🦱',
      activity: 'camiñando con Pepe',
      dialogue: [
        "Ola! Son África, encantada de coñecerte.",
        "Pepe e eu estamos explorando os camiños rurais.",
        "A conexión coa natureza é fundamental para a creatividade.",
        "Cada paso nos inspira novas ideas!"
      ],
      currentDialogue: 0
    },
    {
      id: 'pepe',
      name: 'Pepe',
      x: 520, y: 200,
      emoji: '👨‍🌾',
      activity: 'acompañando a África',
      dialogue: [
        "Boas! Son Pepe, vivo aquí desde sempre.",
        "Coñezo cada recuncho deste valle.",
        "Os novos residentes trouxeron moita vida ao pobo.",
        "É bonito ver como arte e tradición se combinan."
      ],
      currentDialogue: 0
    },
    {
      id: 'agustin',
      name: 'Agustín',
      x: 200, y: 350,
      emoji: '👨‍💼',
      activity: 'falando sobre Anceu Coliving',
      dialogue: [
        "Saúdos! Son Agustín, coordinador de Anceu Coliving.",
        "Este espazo é un experimento de vida comunitaria.",
        "Combínamos traballo remoto con vida rural sustentable.",
        "Tes interese en formar parte da comunidade?"
      ],
      currentDialogue: 0
    },
    {
      id: 'anis',
      name: 'Anís',
      x: 350, y: 280,
      emoji: '👩‍💻',
      activity: 'coas gafas VR postas',
      dialogue: [
        "Ola! Son Anís, estou explorando realidade virtual.",
        "Estou desenvolvendo experiencias inmersivas para educación rural.",
        "Imaxina aprender agricultura cunhas gafas VR!",
        "A tecnoloxía pode achegar o rural ao mundo."
      ],
      currentDialogue: 0
    },
    {
      id: 'agatha',
      name: 'Agatha',
      x: 450, y: 320,
      emoji: '👩‍🏫',
      activity: 'falando con Jorge sobre transformación de conflitos',
      dialogue: [
        "Benvido! Son Agatha, traballo en transformación de conflitos.",
        "Jorge e eu estamos desenvolvendo metodoloxías para comunidades.",
        "O diálogo e a escoita son ferramentas poderosas.",
        "Cada conflito é unha oportunidade de crecemento."
      ],
      currentDialogue: 0
    },
    {
      id: 'jorge',
      name: 'Jorge',
      x: 470, y: 340,
      emoji: '👨‍🎓',
      activity: 'colaborando con Agatha',
      dialogue: [
        "Que tal! Son Jorge, especialista en mediación.",
        "Agatha e eu estamos creando espazos de diálogo.",
        "As comunidades rurais necesitan novas formas de resolver conflitos.",
        "A colaboración é a chave do noso traballo."
      ],
      currentDialogue: 0
    },
    {
      id: 'noelia',
      name: 'Noelia',
      x: 100, y: 400,
      emoji: '👩‍🎨',
      activity: 'facendo pegatinas',
      dialogue: [
        "Ola! Son Noelia, estou facendo pegatinas.",
        "Cada deseño conta unha historia da comunidade.",
        "A arte gráfica é unha forma de comunicación poderosa.",
        "Queres ver os meus últimos deseños?"
      ],
      currentDialogue: 0
    }
  ];

  const buildings: Building[] = [
    {
      id: 'fuchiqueira',
      name: 'Café de Reparación Fuchiqueira',
      x: 50, y: 450,
      width: 120,
      height: 80,
      emoji: '🔧',
      description: 'Un espazo onde os veciños reparan obxectos xuntos'
    },
    {
      id: 'coliving',
      name: 'Anceu Coliving',
      x: 300, y: 400,
      width: 150,
      height: 100,
      emoji: '🏠',
      description: 'Residencia colaborativa para artistas e creadores'
    },
    {
      id: 'workshop',
      name: 'Taller de Arte',
      x: 100, y: 100,
      width: 100,
      height: 80,
      emoji: '🎨',
      description: 'Espazo creativo para proxectos artísticos'
    },
    {
      id: 'tech-lab',
      name: 'Laboratorio Tech',
      x: 500, y: 100,
      width: 100,
      height: 80,
      emoji: '💻',
      description: 'Espazo de innovación tecnolóxica'
    }
  ];

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

  const checkCollision = (x: number, y: number, target: { x: number, y: number, width?: number, height?: number }) => {
    const targetWidth = target.width || 30;
    const targetHeight = target.height || 30;
    
    return x < target.x + targetWidth &&
           x + 20 > target.x &&
           y < target.y + targetHeight &&
           y + 20 > target.y;
  };

  const gameLoop = useCallback(() => {
    setPlayer(currentPlayer => {
      let newX = currentPlayer.x;
      let newY = currentPlayer.y;
      let newDirection = currentPlayer.direction;

      const speed = 3;

      // Handle movement
      if (keysPressed.current.has('ArrowUp') || keysPressed.current.has('KeyW')) {
        newY = Math.max(20, newY - speed);
        newDirection = 'up';
      }
      if (keysPressed.current.has('ArrowDown') || keysPressed.current.has('KeyS')) {
        newY = Math.min(480, newY + speed);
        newDirection = 'down';
      }
      if (keysPressed.current.has('ArrowLeft') || keysPressed.current.has('KeyA')) {
        newX = Math.max(20, newX - speed);
        newDirection = 'left';
      }
      if (keysPressed.current.has('ArrowRight') || keysPressed.current.has('KeyD')) {
        newX = Math.min(580, newX + speed);
        newDirection = 'right';
      }

      // Check character interactions
      if (keysPressed.current.has('Space')) {
        keysPressed.current.delete('Space'); // Prevent multiple triggers
        
        const nearCharacter = characters.find(char => 
          checkCollision(newX, newY, { x: char.x - 15, y: char.y - 15, width: 30, height: 30 })
        );
        
        if (nearCharacter) {
          setSelectedCharacter(nearCharacter);
          setShowDialogue(true);
          playSound("hit.mp3");
        }

        const nearBuilding = buildings.find(building => 
          checkCollision(newX, newY, building)
        );
        
        if (nearBuilding) {
          setGameMessage(`Estás en ${nearBuilding.name}: ${nearBuilding.description}`);
          playSound("success.mp3");
        }
      }

      return { x: newX, y: newY, direction: newDirection };
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [characters, buildings, playSound]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with grass background
    ctx.fillStyle = '#4a7c59';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grass texture
    ctx.fillStyle = '#5d8f66';
    for (let x = 0; x < canvas.width; x += 20) {
      for (let y = 0; y < canvas.height; y += 20) {
        if ((x + y) % 40 === 0) {
          ctx.fillRect(x, y, 10, 10);
        }
      }
    }

    // Draw paths
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 350, canvas.width, 20);
    ctx.fillRect(250, 0, 20, canvas.height);

    // Draw buildings
    buildings.forEach(building => {
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(building.x, building.y, building.width, building.height);
      
      ctx.fillStyle = '#654321';
      ctx.fillRect(building.x, building.y - 20, building.width, 20);
      
      ctx.font = '20px Arial';
      ctx.fillText(building.emoji, building.x + building.width/2 - 10, building.y + building.height/2 + 7);
      
      ctx.font = '10px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText(building.name, building.x, building.y - 5);
    });

    // Draw characters
    ctx.font = '24px Arial';
    characters.forEach(character => {
      // Character shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(character.x - 10, character.y + 15, 20, 5);
      
      // Character emoji
      ctx.fillText(character.emoji, character.x - 12, character.y + 8);
      
      // Character name
      ctx.font = '9px Arial';
      ctx.fillStyle = '#fff';
      ctx.fillText(character.name, character.x - 15, character.y - 10);
      
      // Activity indicator
      ctx.fillStyle = '#ffff00';
      ctx.fillRect(character.x + 15, character.y - 15, 8, 8);
      ctx.fillStyle = '#000';
      ctx.font = '8px Arial';
      ctx.fillText('!', character.x + 17, character.y - 8);
      
      ctx.font = '24px Arial';
    });

    // Draw player
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(player.x - 8, player.y + 15, 16, 4);
    
    const playerEmoji = player.direction === 'up' ? '🧑‍💻' : 
                       player.direction === 'down' ? '🧑‍💻' :
                       player.direction === 'left' ? '🧑‍💻' : '🧑‍💻';
    
    ctx.font = '20px Arial';
    ctx.fillText(playerEmoji, player.x - 10, player.y + 6);

    // Draw interaction hints
    const nearCharacter = characters.find(char => 
      checkCollision(player.x, player.y, { x: char.x - 15, y: char.y - 15, width: 30, height: 30 })
    );
    
    const nearBuilding = buildings.find(building => 
      checkCollision(player.x, player.y, building)
    );

    if (nearCharacter || nearBuilding) {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(player.x - 25, player.y - 40, 50, 20);
      ctx.fillStyle = '#fff';
      ctx.font = '10px Arial';
      ctx.fillText('Preme ESPAZO', player.x - 22, player.y - 28);
    }

    requestAnimationFrame(draw);
  }, [player, characters, buildings]);

  const nextDialogue = () => {
    if (selectedCharacter) {
      const newIndex = selectedCharacter.currentDialogue + 1;
      if (newIndex < selectedCharacter.dialogue.length) {
        setSelectedCharacter({
          ...selectedCharacter,
          currentDialogue: newIndex
        });
      } else {
        setShowDialogue(false);
        setSelectedCharacter(null);
        setGameMessage(`Completaches a conversa con ${selectedCharacter.name}!`);
        playSound("success.mp3");
      }
    }
  };

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
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameLoop]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="window window-opening resizable" style={{ 
      position: 'absolute', 
      top: '5%', 
      left: '10%', 
      width: '80%',
      height: '85%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>🏘️ Rural Hackers Village - Anceu Coliving Explorer</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      <div className="window-content" style={{ 
        height: 'calc(100% - 28px)', 
        overflow: 'hidden',
        padding: "0",
        position: 'relative'
      }}>
        {/* Game Canvas */}
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          style={{ 
            display: 'block',
            border: '2px inset #c0c0c0',
            background: '#4a7c59'
          }}
        />

        {/* Game UI */}
        <div className="win95-panel" style={{ 
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          padding: '4px 8px', 
          fontSize: '11px',
          background: '#c0c0c0',
          borderTop: '2px inset #c0c0c0'
        }}>
          <div style={{ marginBottom: '2px' }}>
            <strong>Controis:</strong> WASD/Frechas para mover, ESPAZO para interactuar
          </div>
          <div style={{ color: '#000080' }}>
            {gameMessage}
          </div>
        </div>

        {/* Dialogue System */}
        {showDialogue && selectedCharacter && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#c0c0c0',
            border: '2px outset #c0c0c0',
            padding: '16px',
            minWidth: '300px',
            maxWidth: '400px',
            zIndex: 200,
            boxShadow: '4px 4px 8px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '12px',
              borderBottom: '1px solid #999',
              paddingBottom: '8px'
            }}>
              <span style={{ fontSize: '20px', marginRight: '8px' }}>
                {selectedCharacter.emoji}
              </span>
              <div>
                <strong style={{ fontSize: '12px' }}>{selectedCharacter.name}</strong>
                <div style={{ fontSize: '10px', color: '#666' }}>
                  {selectedCharacter.activity}
                </div>
              </div>
            </div>
            
            <div style={{
              fontSize: '11px',
              lineHeight: '1.4',
              marginBottom: '12px',
              minHeight: '40px'
            }}>
              {selectedCharacter.dialogue[selectedCharacter.currentDialogue]}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '10px', color: '#666' }}>
                {selectedCharacter.currentDialogue + 1} / {selectedCharacter.dialogue.length}
              </span>
              <button 
                className="win95-button primary" 
                onClick={nextDialogue}
                style={{ fontSize: '10px', padding: '2px 8px' }}
              >
                {selectedCharacter.currentDialogue + 1 < selectedCharacter.dialogue.length ? 'Seguinte' : 'Rematar'}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="window-resize-handle"></div>
    </div>
  );
};

export default VillageExplorer;