import { useEffect, useRef } from "react";

export default function UpsideDownParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrame;

    const mouse = {
      x: null,
      y: null,
      radius: 180
    };

    const particles = [];
    const particleCount = 220;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        size: Math.random() * 1.8 + 0.8,

        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    // Mouse movement
    function handleMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handleMouseLeave() {
      mouse.x = null;
      mouse.y = null;
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    function animate() {

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      // =========================
      // PARTICLE MOVEMENT
      // =========================

      particles.forEach((particle) => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Screen wrapping
        if (particle.x < 0) {
          particle.x = canvas.width;
        }

        if (particle.x > canvas.width) {
          particle.x = 0;
        }

        if (particle.y < 0) {
          particle.y = canvas.height;
        }

        if (particle.y > canvas.height) {
          particle.y = 0;
        }


        // =========================
        // CURSOR INTERACTION
        // =========================

        if (
          mouse.x !== null &&
          mouse.y !== null
        ) {

          const dx =
            particle.x - mouse.x;

          const dy =
            particle.y - mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (
            distance <
            mouse.radius
          ) {

            const force =
              (mouse.radius -
                distance) /
              mouse.radius;

            const angle =
              Math.atan2(dy, dx);

            // Push particles away
            particle.x +=
              Math.cos(angle) *
              force *
              2;

            particle.y +=
              Math.sin(angle) *
              force *
              2;
          }
        }

      });


      // =========================
      // DRAW CONNECTION LINES
      // =========================

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {

        for (
          let j = i + 1;
          j < particles.length;
          j++
        ) {

          const dx =
            particles[i].x -
            particles[j].x;

          const dy =
            particles[i].y -
            particles[j].y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          // Connect nearby particles
          if (distance < 150) {

            const opacity =
              1 -
              distance / 120;

            ctx.beginPath();

            ctx.moveTo(
              particles[i].x,
              particles[i].y
            );

            ctx.lineTo(
              particles[j].x,
              particles[j].y
            );

            ctx.strokeStyle =
  `rgba(50, 150, 255, ${opacity * 0.3})`;

            ctx.lineWidth = 0.6;

            ctx.stroke();
          }
        }


        // =========================
        // CURSOR CONNECTION
        // =========================

        if (
          mouse.x !== null &&
          mouse.y !== null
        ) {

          const dx =
            particles[i].x -
            mouse.x;

          const dy =
            particles[i].y -
            mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
              dy * dy
            );

          if (distance < 220) {

            const opacity =
              1 -
              distance / 220;

            ctx.beginPath();

            ctx.moveTo(
              particles[i].x,
              particles[i].y
            );

            ctx.lineTo(
              mouse.x,
              mouse.y
            );

            ctx.strokeStyle =
  `rgba(80, 170, 255, ${opacity * 0.6})`;
            ctx.lineWidth = 0.8;

            ctx.stroke();
          }
        }

      }


      // =========================
      // DRAW PARTICLES
      // =========================

      particles.forEach(
        (particle) => {

          ctx.beginPath();

          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
          );

          ctx.fillStyle = "rgba(50, 150, 255, 0.9)";

          ctx.shadowBlur = 8;

          ctx.shadowColor =
  "rgba(50, 150, 255, 0.9)";

          ctx.fill();

          ctx.shadowBlur = 0;

        }
      );


      // =========================
      // CURSOR GLOW
      // =========================

      if (
        mouse.x !== null &&
        mouse.y !== null
      ) {

        const gradient =
          ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            100
          );
gradient.addColorStop(
  0,
  "rgba(50, 150, 255, 0.18)"
);

gradient.addColorStop(
  1,
  "rgba(50, 150, 255, 0)"
);

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.arc(
          mouse.x,
          mouse.y,
          100,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }


      animationFrame =
        requestAnimationFrame(
          animate
        );
    }

    animate();

    return () => {

      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="upside-down-particles"
    />
  );
}