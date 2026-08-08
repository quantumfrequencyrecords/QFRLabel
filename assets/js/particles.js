tsParticles.load("particles-js", {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 90, density: { enable: true, area: 900 } },
    color: { value: ["#00E7FF", "#7ADFFF", "#00B4D8"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.15, max: 0.55 },
      animation: { enable: true, speed: 0.8, minimumValue: 0.1 }
    },
    size: { value: { min: 1, max: 3.5 } },
    links: {
      enable: true,
      distance: 160,
      color: "#00E7FF",
      opacity: 0.12,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" }
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: true
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.35 } }
    }
  },
  detectRetina: true
});
