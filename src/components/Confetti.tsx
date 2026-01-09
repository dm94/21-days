import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
  shape: 'circle' | 'square';
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  particleCount?: number;
}

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
];

const Confetti: React.FC<ConfettiProps> = ({ 
  isActive, 
  duration = 3000, 
  particleCount = 50 
}) => {
  const [particles, setParticles] = useState<ConfettiPiece[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const createParticle = (id: number): ConfettiPiece => {
      return {
        id,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 8 + 4,
        velocityX: (Math.random() - 0.5) * 4,
        velocityY: Math.random() * 3 + 2,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: Math.random() > 0.5 ? 'circle' : 'square',
      };
    };

    const startTimeout = setTimeout(() => {
      setIsVisible(true);
      
      // Create initial particles
      const initialParticles = Array.from({ length: particleCount }, (_, i) => 
        createParticle(i)
      );
      setParticles(initialParticles);
    }, 0);

    // Animation loop
    const animationInterval = setInterval(() => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.velocityX,
          y: particle.y + particle.velocityY,
          rotation: particle.rotation + particle.rotationSpeed,
          velocityY: particle.velocityY + 0.1, // Gravity
        })).filter(particle => 
          particle.y < window.innerHeight + 50 && 
          particle.x > -50 && 
          particle.x < window.innerWidth + 50
        )
      );
    }, 16); // ~60fps

    // Clean up after duration
    const timeout = setTimeout(() => {
      setIsVisible(false);
      clearInterval(animationInterval);
      setTimeout(() => setParticles([]), 1000); // Allow fade out
    }, duration);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(timeout);
      clearTimeout(startTimeout);
      setIsVisible(false);
      setParticles([]);
    };
  }, [isActive, duration, particleCount]);

  if (!isVisible && particles.length === 0) {
    return null;
  }

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ overflow: 'hidden' }}
    >
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute transition-transform duration-75 ease-linear"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            borderRadius: particle.shape === 'circle' ? '50%' : '0%',
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
