import { useEffect, useRef } from "react";

type Agent = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
  size: number;
};

export default function SwarmCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isSmallScreen = window.matchMedia("(max-width: 720px)").matches;
    const count = isSmallScreen ? 11 : 25;
    const agents: Agent[] = Array.from({ length: count }, (_, index) => ({
      x: window.innerWidth * (0.35 + Math.random() * 0.3),
      y: window.innerHeight * (0.3 + Math.random() * 0.4),
      vx: 0,
      vy: 0,
      phase: (index / count) * Math.PI * 2,
      size: isSmallScreen ? 3.2 : 4 + Math.random() * 1.4,
    }));

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let activeTarget = "hero";
    let frame = 0;
    let running = true;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-swarm-target]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          activeTarget = visible[0].target.getAttribute("data-swarm-target") || "hero";
        }
      },
      { rootMargin: "-34% 0px -34% 0px", threshold: [0, 0.15, 0.35, 0.6] },
    );
    targets.forEach((target) => observer.observe(target));

    const drawCursor = (agent: Agent, index: number) => {
      const angle = Math.atan2(agent.vy, agent.vx) + Math.PI / 2;
      context.save();
      context.translate(agent.x, agent.y);
      context.rotate(angle);
      context.beginPath();
      context.moveTo(0, -agent.size * 1.9);
      context.lineTo(agent.size * 1.05, agent.size * 1.55);
      context.lineTo(0, agent.size * 0.82);
      context.lineTo(-agent.size * 0.72, agent.size * 1.55);
      context.closePath();
      context.fillStyle = index % 5 === 0 ? "rgba(255,255,255,.94)" : "rgba(214,214,220,.72)";
      context.strokeStyle = "rgba(255,255,255,.66)";
      context.lineWidth = 0.7;
      context.fill();
      context.stroke();
      context.restore();
    };

    const animate = (time: number) => {
      if (!running) return;
      context.clearRect(0, 0, width, height);

      const target = document.querySelector<HTMLElement>(
        '[data-swarm-target="' + activeTarget + '"]',
      );
      const rect = target?.getBoundingClientRect();
      const centerX = rect ? rect.left + rect.width * 0.5 : width * 0.5;
      const centerY = rect ? rect.top + rect.height * 0.5 : height * 0.48;
      const spreadX = Math.min(isSmallScreen ? 72 : 164, Math.max(30, (rect?.width ?? width) * 0.2));
      const spreadY = Math.min(isSmallScreen ? 42 : 92, Math.max(20, (rect?.height ?? height) * 0.13));

      agents.forEach((agent, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        const orbit = agent.phase + time * 0.00012 * direction;
        const wave = Math.sin(time * 0.00065 + agent.phase) * 9;
        const goalX = centerX + Math.cos(orbit) * spreadX + wave;
        const goalY = centerY + Math.sin(orbit) * spreadY;
        agent.vx = (agent.vx + (goalX - agent.x) * 0.014) * 0.86;
        agent.vy = (agent.vy + (goalY - agent.y) * 0.014) * 0.86;
        agent.x += agent.vx;
        agent.y += agent.vy;

        context.beginPath();
        context.moveTo(agent.x - agent.vx * 2.6, agent.y - agent.vy * 2.6);
        context.lineTo(agent.x, agent.y);
        context.strokeStyle = "rgba(227,227,232,.19)";
        context.lineWidth = 0.8;
        context.stroke();
        drawCursor(agent, index);
      });

      frame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    frame = window.requestAnimationFrame(animate);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      context.clearRect(0, 0, width, height);
    };
  }, []);

  return <canvas ref={canvasRef} className="swarm-canvas" aria-hidden="true" />;
}
