<template>
  <div class="moments-page">
    <header class="page-header">
      <h1 class="page-title">心动瞬间</h1>
      <p class="page-desc">那些让我心跳加速的时刻</p>
    </header>

    <section class="pulse-section">
      <div class="pulse-line-wrap">
        <svg class="pulse-svg" viewBox="0 0 2400 80" preserveAspectRatio="none">
          <path :d="pulsePath" fill="none" stroke="url(#pulseGrad)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          <defs>
            <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stop-color="#ff4b8b" stop-opacity="0" />
              <stop offset="50%" stop-color="#ff4b8b" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#ff4b8b" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div class="teaser-heart">♥</div>

      <h2 class="teaser-title">敬请期待</h2>
      <p class="teaser-desc">藏着好多关于你的心动瞬间<br />正在悄悄准备，等你来揭晓</p>
    </section>

    <section class="locked-section">
      <div class="locked-grid">
        <div
          v-for="i in 8"
          :key="i"
          class="locked-card"
          :class="{ shake: shakingIndex === i }"
          :style="{ transitionDelay: `${i * 0.06}s`, animationDelay: `${i * 0.3}s` }"
          @click="peek(i)"
        >
          <span class="locked-icon">🔒</span>
        </div>
      </div>
      <transition name="fade">
        <p v-if="hintVisible" class="peek-hint">别着急嘛，马上就好～</p>
      </transition>
    </section>
  </div>
</template>

<script setup>
const pulsePath = computed(() => {
  const unit = (n) => {
    const o = n * 400
    return `M${o},40 H${o + 60} L${o + 75},15 L${o + 90},65 L${o + 105},10 L${o + 120},70 L${o + 135},40 H${o + 400}`
  }
  return Array.from({ length: 6 }, (_, i) => unit(i)).join(' ')
})

const shakingIndex = ref(null)
const hintVisible = ref(false)
let hintTimer = null

function peek(i) {
  shakingIndex.value = i
  setTimeout(() => {
    if (shakingIndex.value === i) shakingIndex.value = null
  }, 500)

  hintVisible.value = false
  requestAnimationFrame(() => {
    hintVisible.value = true
  })
  clearTimeout(hintTimer)
  hintTimer = setTimeout(() => {
    hintVisible.value = false
  }, 1800)
}
</script>

<style scoped>
.moments-page {
  position: relative;
  z-index: 1;
  padding-top: 80px;
  min-height: 100vh;
  padding-bottom: 5rem;
}

.page-header {
  text-align: center;
  padding: 3rem 2rem 1rem;
}

.page-title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 3rem;
  background: linear-gradient(45deg, #ff9a9e, #fecfef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 0 20px var(--glow-color));
  margin-bottom: 0.5rem;
}

.page-desc {
  color: rgba(252, 228, 236, 0.7);
  letter-spacing: 4px;
  font-size: 1.1rem;
}

/* Pulse / teaser */
.pulse-section {
  max-width: 700px;
  margin: 2rem auto 0;
  padding: 0 2rem;
  text-align: center;
}

.pulse-line-wrap {
  width: 100%;
  height: 60px;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
}

.pulse-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 2400px;
  height: 60px;
  animation: pulse-scroll 2.4s linear infinite;
  filter: drop-shadow(0 0 6px rgba(255, 75, 139, 0.6));
}

@keyframes pulse-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-400px); }
}

.teaser-heart {
  font-size: 3rem;
  color: var(--primary-color);
  animation: heartbeat 1.3s infinite;
  filter: drop-shadow(0 0 20px var(--glow-color));
  margin: 1.5rem 0 1rem;
}

.teaser-title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 3rem;
  letter-spacing: 6px;
  background: linear-gradient(45deg, #ff9a9e, #ff4b8b, #fecfef);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 0 24px var(--glow-color));
  margin-bottom: 1rem;
}

.teaser-desc {
  color: rgba(252, 228, 236, 0.65);
  letter-spacing: 2px;
  line-height: 2;
  font-size: 1rem;
}

/* Locked preview grid */
.locked-section {
  max-width: 720px;
  margin: 3.5rem auto 0;
  padding: 0 2rem;
  text-align: center;
}

.locked-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.locked-card {
  aspect-ratio: 3 / 4;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(255, 75, 139, 0.12), rgba(120, 30, 100, 0.18));
  border: 1px solid rgba(255, 75, 139, 0.18);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: float-soft 3.5s ease-in-out infinite;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
}

.locked-card:hover {
  border-color: rgba(255, 75, 139, 0.45);
  box-shadow: 0 8px 24px rgba(255, 75, 139, 0.15);
}

.locked-icon {
  font-size: 1.3rem;
  opacity: 0.55;
  filter: grayscale(0.3);
}

@keyframes float-soft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.locked-card.shake {
  animation: shake-card 0.5s ease;
}

@keyframes shake-card {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px) rotate(-2deg); }
  40% { transform: translateX(6px) rotate(2deg); }
  60% { transform: translateX(-4px) rotate(-1deg); }
  80% { transform: translateX(4px) rotate(1deg); }
}

.peek-hint {
  margin-top: 1.5rem;
  color: rgba(252, 228, 236, 0.6);
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.1rem;
  letter-spacing: 2px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .page-title { font-size: 2.5rem; }
  .teaser-title { font-size: 2.2rem; }
  .locked-grid { grid-template-columns: repeat(4, 1fr); gap: 0.7rem; }
}

@media (max-width: 480px) {
  .locked-grid { grid-template-columns: repeat(4, 1fr); }
}
</style>
