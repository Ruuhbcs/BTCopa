import { useEffect, useRef } from "react";

interface ConfettiProps {
  active: boolean; // toggle to true to trigger burst
  onFinished?: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

const BRAZIL_COLORS = [
  "#009B3A", // Green
  "#FEDF00", // Yellow
  "#002776", // Blue
  "#FFFFFF", // White
  "#22C55E", // Bright Green
  "#EAB308", // Golden Yellow
];

export default function Confetti({ active, onFinished }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (active) {
      triggerBurst();
    }
  }, [active]);

  const triggerBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Create 150-200 particles bursting from center and sides
    const count = 150 + Math.floor(Math.random() * 80);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      // Pick random spawn source: center-bottom, bottom-left, or bottom-right
      const source = Math.random();
      let startX = canvas.width / 2;
      let startY = canvas.height * 0.7; // start slightly low or center
      let baseSpeedY = -8 - Math.random() * 12;
      let baseSpeedX = (Math.random() * 12) - 6;

      if (source < 0.3) {
        // Bottom-left corner shooting up-right
        startX = 0;
        startY = canvas.height;
        baseSpeedX = 6 + Math.random() * 12;
        baseSpeedY = -12 - Math.random() * 10;
      } else if (source < 0.6) {
        // Bottom-right corner shooting up-left
        startX = canvas.width;
        startY = canvas.height;
        baseSpeedX = -6 - Math.random() * 12;
        baseSpeedY = -12 - Math.random() * 10;
      }

      particles.push({
        x: startX,
        y: startY,
        size: 5 + Math.random() * 10,
        color: BRAZIL_COLORS[Math.floor(Math.random() * BRAZIL_COLORS.length)],
        speedX: baseSpeedX,
        speedY: baseSpeedY,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 8) - 4,
        opacity: 1.0,
      });
    }

    particlesRef.current = [...particlesRef.current, ...particles];

    if (!animationFrameId.current) {
      animate();
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Gravity and air drag
      p.speedY += 0.28; // Gravity pulling down
      p.speedX *= 0.98;  // Wind resistance slowing horizontally
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      // Slow fade out once falling
      if (p.speedY > 0) {
        p.opacity -= 0.012;
      }

      // Remove particles off-screen or fully transparent
      if (p.opacity <= 0 || p.y > canvas.height + 20) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.opacity);

      // Random piece shapes (rectangle, circle, ribbon)
      if (i % 3 === 0) {
        // Rectangle
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (i % 3 === 1) {
        // Circle/Dot
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Triangular star
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    }

    if (particles.length > 0) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      animationFrameId.current = null;
      if (onFinished) {
        onFinished();
      }
    }
  };

  return (
    <canvas
      id="confetti-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 h-full w-full"
    />
  );
}
