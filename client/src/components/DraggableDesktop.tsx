import React, { useState, useRef } from "react";
import { useBeesGame } from "@/lib/stores/useBeesGame";

interface DesktopIcon {
  id: string;
  emoji: string;
  label: string;
  x: number;
  y: number;
  selected: boolean;
}

interface DraggableDesktopProps {
  onOpenWindow: (windowType: string) => void;
}

const DraggableDesktop: React.FC<DraggableDesktopProps> = ({ onOpenWindow }) => {
  const { completedSections } = useBeesGame();
  const [icons, setIcons] = useState<DesktopIcon[]>([
    { id: 'program', emoji: '📚', label: 'Beautiful Bees', x: 20, y: 20, selected: false },
    { id: 'village-game', emoji: '🏘️', label: 'Vila Rural Hackers', x: 100, y: 20, selected: false },
    { id: 'anceu-browser', emoji: '🌐', label: 'Anceu Explorer', x: 180, y: 20, selected: false },
    { id: 'fornelos-browser', emoji: '🏔️', label: 'Fornelos Info', x: 260, y: 20, selected: false },
    { id: 'bee-space-game', emoji: '🚀', label: 'Bee Spacecraft', x: 20, y: 120, selected: false },
    { id: 'nature-quiz', emoji: '🌿', label: 'Quiz Biomimético', x: 100, y: 120, selected: false },
    { id: 'memory-game', emoji: '🧠', label: 'Memoria Rural', x: 180, y: 120, selected: false },
    { id: 'photo-gallery', emoji: '📷', label: 'Galería', x: 260, y: 120, selected: false },
    { id: 'wikipedia', emoji: '📖', label: 'Wikipedia Rural', x: 20, y: 220, selected: false },
    { id: 'my-computer', emoji: '🖥️', label: 'O meu PC', x: 100, y: 220, selected: false },
    { id: 'recycle-bin', emoji: '🗑️', label: 'Papeleira', x: 180, y: 220, selected: false }
  ]);

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const draggedIcon = useRef<string | null>(null);

  const handleMouseDown = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    const icon = icons.find(i => i.id === iconId);
    if (!icon) return;

    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - icon.x,
      y: e.clientY - icon.y
    });

    setIcons(prev => prev.map(i => ({
      ...i,
      selected: i.id === iconId
    })));

    setIsDragging(true);
    draggedIcon.current = iconId;

    const handleMouseMove = (e: MouseEvent) => {
      if (!draggedIcon.current) return;
      
      setIcons(prev => prev.map(i => 
        i.id === draggedIcon.current 
          ? { ...i, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : i
      ));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      draggedIcon.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDoubleClick = (iconId: string) => {
    onOpenWindow(iconId);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIcons(prev => prev.map(i => ({ ...i, selected: false })));
    }
  };

  return (
    <div 
      className="desktop" 
      onClick={handleDesktopClick}
      style={{ position: 'relative', height: '100vh', width: '100vw' }}
    >
      {icons.map((icon) => (
        <div
          key={icon.id}
          className={`desktop-icon ${icon.selected ? 'selected' : ''} ${isDragging && draggedIcon.current === icon.id ? 'dragging' : ''}`}
          style={{ 
            left: `${icon.x}px`, 
            top: `${icon.y}px`,
            position: 'absolute'
          }}
          onMouseDown={(e) => handleMouseDown(e, icon.id)}
          onDoubleClick={() => handleDoubleClick(icon.id)}
        >
          <div className="desktop-icon-image">
            {icon.emoji}
          </div>
          <div className="desktop-icon-label">
            {icon.label}
          </div>
        </div>
      ))}

      {/* Start Menu when right-clicking */}
      <div style={{ 
        position: 'absolute', 
        bottom: '60px', 
        left: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '16px',
        border: '2px outset #c0c0c0',
        maxWidth: '320px',
        fontFamily: 'MS Sans Serif, sans-serif',
        fontSize: '11px',
        boxShadow: '4px 4px 8px rgba(0,0,0,0.3)',
        borderRadius: '2px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '16px', marginRight: '8px' }}>🐝</span>
          <strong>Beautiful Bees - Polinizadoras Rurais</strong>
        </div>
        <hr style={{ margin: '8px 0', border: '1px inset #c0c0c0' }} />
        <p style={{ margin: '0', lineHeight: '1.4' }}>
          Explora o programa de Polinizadoras Rurais con espazos interactivos de aprendizaxe.
          Fai dobre clic nas iconas para abrir aplicacións.
        </p>
        <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
          Seccións completadas: {completedSections.size}/4
        </div>
      </div>
    </div>
  );
};

export default DraggableDesktop;