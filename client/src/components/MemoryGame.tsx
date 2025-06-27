import React, { useState, useEffect } from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";

interface MemoryGameProps {
  onClose: () => void;
}

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC<MemoryGameProps> = ({ onClose }) => {
  const { soundEnabled } = useBeesGame();
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const cardPairs = [
    "🐝", "🌻", "🌿", "🏔️", "🌊", "🌳", "🍯", "🦋"
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

  const initializeGame = () => {
    const gameCards: Card[] = [];
    cardPairs.forEach((content, index) => {
      gameCards.push(
        { id: index * 2, content, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, content, isFlipped: false, isMatched: false }
      );
    });
    
    // Shuffle cards
    for (let i = gameCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
    }
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameComplete(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);
      
      setTimeout(() => {
        if (firstCard && secondCard && firstCard.content === secondCard.content) {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          playSound("success.mp3");
          
          if (matches + 1 === cardPairs.length) {
            setGameComplete(true);
          }
        } else {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          playSound("hit.mp3");
        }
        setFlippedCards([]);
        setMoves(prev => prev + 1);
      }, 1000);
    }
  }, [flippedCards, cards, matches, cardPairs.length]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    playSound("hit.mp3");
    setCards(prev => prev.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ));
    setFlippedCards(prev => [...prev, cardId]);
  };

  return (
    <div className="window window-opening" style={{ 
      position: 'absolute', 
      top: '12%', 
      left: '30%', 
      width: '40%', 
      maxWidth: '400px',
      height: '70%',
      zIndex: 100
    }}>
      <div className="window-titlebar">
        <span>🧠 Memoria Rural - Xogo de Memoria</span>
        <div className="window-controls">
          <button className="window-button" onClick={onClose}>×</button>
        </div>
      </div>
      
      <div className="window-content win95-scrollbar" style={{ 
        height: 'calc(100% - 28px)', 
        overflow: 'auto',
        padding: "8px"
      }}>
        {gameComplete ? (
          <div style={{ textAlign: "center", padding: "16px" }}>
            <div className="win95-panel-raised" style={{ padding: "16px", marginBottom: "12px" }}>
              <h3>🎉 Parabéns!</h3>
              <div style={{ fontSize: "32px", margin: "12px 0" }}>🏆</div>
              <p>Completaches o xogo en {moves} movementos!</p>
            </div>

            <div className="win95-panel" style={{ padding: "12px", marginBottom: "12px" }}>
              {moves <= 12 && (
                <p style={{ color: '#008000' }}>
                  ¡Excelente memoria! Lembras moi ben os elementos da natureza galega.
                </p>
              )}
              {moves > 12 && moves <= 20 && (
                <p style={{ color: '#000080' }}>
                  ¡Ben feito! Tes unha boa memoria para os símbolos naturais.
                </p>
              )}
              {moves > 20 && (
                <p style={{ color: '#800000' }}>
                  Segue practicando para mellorar a túa memoria visual.
                </p>
              )}
            </div>

            <div className="win95-panel" style={{ textAlign: "center" }}>
              <button 
                className="win95-button primary" 
                onClick={initializeGame}
                style={{ marginRight: "8px" }}
              >
                🔄 Xogar de Novo
              </button>
              <button className="win95-button" onClick={onClose}>
                Pechar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="win95-panel" style={{ padding: "8px", marginBottom: "12px" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Parellas: {matches}/{cardPairs.length}</span>
                <span>Movementos: {moves}</span>
              </div>
              
              <div className="win95-progress" style={{ margin: '8px 0' }}>
                <div 
                  className="win95-progress-fill" 
                  style={{ width: `${(matches / cardPairs.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="win95-groupbox" style={{ marginBottom: "12px" }}>
              <div className="win95-groupbox-title">Taboleiro de Xogo</div>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(4, 1fr)", 
                gap: "4px", 
                padding: "8px"
              }}>
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: card.isFlipped || card.isMatched ? "#ffffff" : "#c0c0c0",
                      border: "2px outset #c0c0c0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      cursor: card.isFlipped || card.isMatched ? "default" : "pointer",
                      userSelect: "none"
                    }}
                    onMouseDown={(e) => {
                      if (!card.isFlipped && !card.isMatched) {
                        e.currentTarget.style.border = "2px inset #c0c0c0";
                      }
                    }}
                    onMouseUp={(e) => {
                      if (!card.isFlipped && !card.isMatched) {
                        e.currentTarget.style.border = "2px outset #c0c0c0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!card.isFlipped && !card.isMatched) {
                        e.currentTarget.style.border = "2px outset #c0c0c0";
                      }
                    }}
                  >
                    {(card.isFlipped || card.isMatched) ? card.content : "❓"}
                  </div>
                ))}
              </div>
            </div>

            <div className="win95-panel" style={{ padding: "8px" }}>
              <strong style={{ fontSize: "11px" }}>Instrucións:</strong><br/>
              <small style={{ fontSize: "10px" }}>
                Fai clic nas tarxetas para revelar os símbolos da natureza galega. 
                Atopa as parellas coincidentes para gañar puntos.
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryGame;