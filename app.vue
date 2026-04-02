<template>
  <div class="app-container">
    <div class="bg-layer bg-aurora"></div>
    <div class="bg-layer bg-stars"></div>
    <div class="bg-layer bg-glow"></div>
    <NavBar />
    <NuxtPage />
    <MusicPlayer />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@300;400;600&family=ZCOOL+XiaoWei&display=swap');

:root {
  --primary-color: #ff4b8b;
  --bg-color: #0a0612;
  --text-color: #ffffff;
  --glow-color: rgba(255, 75, 139, 0.6);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Noto Serif SC', serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.app-container {
  min-height: 100vh;
  position: relative;
}

/* ===== Multi-layer Background ===== */
.bg-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

/* Layer 1: Deep gradient base */
.bg-aurora {
  z-index: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 10%, rgba(90, 30, 100, 0.5) 0%, transparent 60%),
    radial-gradient(ellipse 70% 50% at 80% 30%, rgba(30, 20, 80, 0.6) 0%, transparent 55%),
    radial-gradient(ellipse 60% 80% at 50% 90%, rgba(120, 30, 80, 0.35) 0%, transparent 50%),
    radial-gradient(ellipse 90% 40% at 60% 50%, rgba(20, 10, 50, 0.8) 0%, transparent 70%),
    linear-gradient(160deg, #0a0612 0%, #110a20 25%, #0d0618 50%, #130a1e 75%, #0a0612 100%);
  animation: aurora-shift 20s ease-in-out infinite alternate;
}

@keyframes aurora-shift {
  0% { filter: hue-rotate(0deg) brightness(1); }
  50% { filter: hue-rotate(10deg) brightness(1.05); }
  100% { filter: hue-rotate(-5deg) brightness(0.95); }
}

/* Layer 2: Sparse, soft stars */
.bg-stars {
  z-index: 1;
  background-image:
    radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 50%, transparent 100%),
    radial-gradient(1px 1px at 25% 55%, rgba(255,255,255,0.5) 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 40% 15%, rgba(255,255,255,0.7) 50%, transparent 100%),
    radial-gradient(1px 1px at 55% 70%, rgba(255,255,255,0.4) 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 70% 35%, rgba(255,255,255,0.6) 50%, transparent 100%),
    radial-gradient(1px 1px at 85% 80%, rgba(255,255,255,0.5) 50%, transparent 100%),
    radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.4) 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 90% 10%, rgba(255,255,255,0.6) 50%, transparent 100%),
    radial-gradient(1px 1px at 50% 45%, rgba(255,255,255,0.5) 50%, transparent 100%),
    radial-gradient(1px 1px at 35% 90%, rgba(255,255,255,0.4) 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 65% 5%, rgba(255,255,255,0.7) 50%, transparent 100%),
    radial-gradient(1px 1px at 5% 50%, rgba(255,255,255,0.5) 50%, transparent 100%),
    radial-gradient(1px 1px at 78% 62%, rgba(255,255,255,0.4) 50%, transparent 100%),
    radial-gradient(1.5px 1.5px at 45% 30%, rgba(255,255,255,0.6) 50%, transparent 100%),
    radial-gradient(1px 1px at 92% 48%, rgba(255,255,255,0.5) 50%, transparent 100%);
  animation: twinkle 6s ease-in-out infinite alternate;
}

@keyframes twinkle {
  0% { opacity: 0.6; }
  50% { opacity: 0.9; }
  100% { opacity: 0.7; }
}

/* Layer 3: Soft pink ambient glow */
.bg-glow {
  z-index: 1;
  background:
    radial-gradient(circle 400px at 30% 70%, rgba(255, 75, 139, 0.06) 0%, transparent 100%),
    radial-gradient(circle 300px at 75% 25%, rgba(180, 80, 200, 0.05) 0%, transparent 100%);
  animation: glow-drift 15s ease-in-out infinite alternate;
}

@keyframes glow-drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, -20px); }
}

/* ===== Common animations ===== */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}
</style>
