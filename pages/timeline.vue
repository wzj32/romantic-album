<template>
  <div class="moments-page">
    <header class="page-header">
      <h1 class="page-title">心动瞬间</h1>
      <p class="page-desc">那些让我心跳加速的时刻</p>
    </header>

    <p class="cards-hint">点击卡片，翻开心动</p>

    <div class="cards-grid">
      <div
        v-for="(moment, index) in moments"
        :key="index"
        class="card-wrapper"
        :class="{ flipped: flippedCards.has(index), visible: visibleCards.has(index) }"
        :data-index="index"
        :style="{ transitionDelay: `${index * 0.06}s` }"
        @click="flipCard(index)"
      >
        <div class="card-inner">
          <div class="card-front">
            <div class="front-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="front-heart">♥</div>
            <div class="front-tip">点击翻开</div>
          </div>
          <div class="card-back" :style="{ background: `linear-gradient(135deg, ${moment.color[0]}, ${moment.color[1]})` }">
            <p class="back-text">{{ moment.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-area">
      <button class="flip-all-btn" v-if="!allFlipped" @click="flipAll">全部翻开</button>
      <div class="ending" v-if="allFlipped">
        <div class="ending-heart">♥</div>
        <p>每一个瞬间，都是我喜欢你的理由</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const moments = [
  { color: ['#ff6b9d', '#c44569'], text: '你笑起来的样子，眼睛弯成月牙，整个世界都亮了' },
  { color: ['#a855f7', '#6d28d9'], text: '你认真专注时的眼神，让我看了就移不开' },
  { color: ['#3b82f6', '#1e40af'], text: '你轻声说晚安的那一刻，我知道今晚会做好梦' },
  { color: ['#f59e0b', '#b45309'], text: '你不经意说的那句话，我反复回味了好多遍' },
  { color: ['#ec4899', '#9d174d'], text: '你突然转头看我的瞬间，我的心跳快了一拍' },
  { color: ['#10b981', '#065f46'], text: '你开心大笑的样子，是我见过最好看的风景' },
  { color: ['#f97316', '#7c2d12'], text: '你开心的样子，让我觉得做什么都值得' },
  { color: ['#ff4b8b', '#6b0030'], text: '遇见你这件事，是我最好的运气' },
]

const flippedCards = ref(new Set())
const visibleCards = ref(new Set())

const allFlipped = computed(() => flippedCards.value.size === moments.length)

function flipCard(index) {
  const next = new Set(flippedCards.value)
  if (next.has(index)) {
    next.delete(index)
  } else {
    next.add(index)
  }
  flippedCards.value = next
}

function flipAll() {
  flippedCards.value = new Set(moments.map((_, i) => i))
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Number(entry.target.getAttribute('data-index'))
        visibleCards.value = new Set([...visibleCards.value, idx])
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.card-wrapper[data-index]').forEach(el => {
    observer.observe(el)
  })
})
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
  padding: 3rem 2rem 1.5rem;
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

.cards-hint {
  text-align: center;
  color: rgba(255, 255, 255, 0.35);
  font-size: 0.9rem;
  letter-spacing: 3px;
  margin-bottom: 3rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Entry animation */
.card-wrapper {
  opacity: 0;
  transform: translateY(24px) scale(0.95);
  transition: opacity 0.5s ease, transform 0.5s ease;
  perspective: 1000px;
  cursor: pointer;
  aspect-ratio: 3 / 4;
}

.card-wrapper.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* 3D flip */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
}

.card-wrapper.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
}

/* Front */
.card-front {
  background: linear-gradient(135deg, rgba(40, 20, 60, 0.9), rgba(25, 15, 45, 0.95));
  border: 1px solid rgba(255, 75, 139, 0.2);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  gap: 0.6rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.card-wrapper:hover:not(.flipped) .card-front {
  border-color: rgba(255, 75, 139, 0.5);
  box-shadow: 0 12px 32px rgba(255, 75, 139, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.front-number {
  font-size: 0.75rem;
  color: rgba(255, 75, 139, 0.4);
  letter-spacing: 2px;
  align-self: flex-start;
}

.front-heart {
  font-size: 2.2rem;
  color: var(--primary-color);
  animation: heartbeat 2s infinite;
  filter: drop-shadow(0 0 8px var(--glow-color));
}

.front-tip {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.25);
  letter-spacing: 2px;
}

/* Back */
.card-back {
  border: none;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transform: rotateY(180deg);
  text-align: center;
  padding: 1.4rem 1.2rem;
}

.back-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.9;
  letter-spacing: 1.5px;
  font-family: 'Ma Shan Zheng', cursive;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

/* Bottom */
.bottom-area {
  text-align: center;
  margin-top: 3rem;
  min-height: 60px;
}

.flip-all-btn {
  background: transparent;
  border: 1px solid rgba(255, 75, 139, 0.4);
  color: var(--primary-color);
  padding: 0.7rem 2.5rem;
  border-radius: 30px;
  font-size: 0.95rem;
  letter-spacing: 3px;
  cursor: pointer;
  font-family: 'Noto Serif SC', serif;
  transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
}

.flip-all-btn:hover {
  background: rgba(255, 75, 139, 0.1);
  border-color: rgba(255, 75, 139, 0.7);
  box-shadow: 0 0 20px rgba(255, 75, 139, 0.2);
}

.ending {
  animation: fadeInUp 0.8s ease-out;
}

.ending-heart {
  font-size: 2.5rem;
  color: var(--primary-color);
  animation: heartbeat 1.5s infinite;
  margin-bottom: 0.8rem;
}

.ending p {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.4rem;
  color: rgba(252, 228, 236, 0.7);
  letter-spacing: 3px;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .page-title { font-size: 2.5rem; }
  .back-text { font-size: 0.8rem; }
}

@media (max-width: 480px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
