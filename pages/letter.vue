<template>
  <div class="letter-page">
    <header class="page-header">
      <h1 class="page-title">写给你的情书</h1>
      <p class="page-desc">字字句句，皆是真心</p>
    </header>

    <div class="letter-container">
      <div class="envelope" :class="{ opened: envelopeOpened }" @click="openEnvelope" v-if="!letterVisible">
        <div class="envelope-flap"></div>
        <div class="envelope-body">
          <div class="envelope-text">点击打开</div>
        </div>
      </div>

      <div class="letter" v-if="letterVisible">
        <div class="letter-paper">
          <div class="letter-decoration top-left">&#10045;</div>
          <div class="letter-decoration top-right">&#10045;</div>
          <div class="letter-greeting">亲爱的你：</div>
          <div class="letter-body">
            <span
              v-for="(char, i) in displayedChars"
              :key="i"
              class="letter-char"
              :class="{ visible: i < typedCount }"
            >{{ char }}</span>
            <span class="cursor" v-if="isTyping">|</span>
          </div>
          <div class="letter-sign" :class="{ visible: signVisible }">
            <p>永远爱你的人</p>
            <p class="sign-date">{{ currentDate }}</p>
          </div>
          <div class="letter-decoration bottom-left">&#10045;</div>
          <div class="letter-decoration bottom-right">&#10045;</div>
        </div>
      </div>
    </div>

    <div class="floating-petals">
      <span v-for="i in 15" :key="i" class="petal" :style="petalStyle(i)">&#10047;</span>
    </div>
  </div>
</template>

<script setup>
const letterContent = `从遇见你的那一天起，我的世界就开始变得不一样了。

你知道吗？每次看到你的笑容，我的心就会不自觉地加速跳动。你的每一个表情、每一个动作，都像是精心编排的画面，美得让人移不开眼。

我喜欢你认真的样子，喜欢你开心大笑的样子。你的一切，在我眼里都是最好的模样。

有人说喜欢是一种感觉，但对我来说，喜欢你是一种确定。确定每天醒来第一个想到的是你，确定每个夜晚入睡前最后想到的也是你。

我不知道未来会怎样，但我知道，只要有你在的地方，就是我最想去的方向。

谢谢你出现在我的生命里，让平凡的日子都变得闪闪发光。

我想用余生的每一天，来告诉你——

你是我最美的意外，最好的遇见。`

const displayedChars = letterContent.split('')
const typedCount = ref(0)
const isTyping = ref(false)
const letterVisible = ref(false)
const envelopeOpened = ref(false)
const signVisible = ref(false)

const currentDate = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
})

function openEnvelope() {
  envelopeOpened.value = true
  setTimeout(() => {
    letterVisible.value = true
    startTyping()
  }, 800)
}

function startTyping() {
  isTyping.value = true
  const interval = setInterval(() => {
    if (typedCount.value < displayedChars.length) {
      typedCount.value++
    } else {
      clearInterval(interval)
      isTyping.value = false
      setTimeout(() => {
        signVisible.value = true
      }, 500)
    }
  }, 60)
}

function petalStyle(i) {
  return {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${8 + Math.random() * 8}s`,
    fontSize: `${0.8 + Math.random() * 1.2}rem`,
    opacity: 0.2 + Math.random() * 0.3,
  }
}
</script>

<style scoped>
.letter-page {
  position: relative;
  z-index: 1;
  padding-top: 80px;
  min-height: 100vh;
  overflow: hidden;
}

.page-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
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

.letter-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

/* Envelope */
.envelope {
  width: 280px;
  height: 200px;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s;
}

.envelope:hover {
  transform: scale(1.05);
}

.envelope-body {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2a1a3e, #1a1a2e);
  border: 2px solid rgba(255, 75, 139, 0.4);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(255, 75, 139, 0.2);
}

.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(135deg, #3a2a4e, #2a1a3e);
  border: 2px solid rgba(255, 75, 139, 0.4);
  border-radius: 5px 5px 0 0;
  clip-path: polygon(0 0, 50% 100%, 100% 0);
  transition: transform 0.6s ease;
  transform-origin: top center;
  z-index: 1;
}

.envelope.opened .envelope-flap {
  transform: rotateX(180deg);
}

.envelope-text {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.3rem;
  color: var(--primary-color);
  letter-spacing: 3px;
  animation: pulse-text 2s infinite;
}

@keyframes pulse-text {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Letter */
.letter {
  max-width: 700px;
  width: 100%;
  animation: fadeInUp 1s ease-out;
}

.letter-paper {
  background: linear-gradient(135deg, rgba(30, 20, 50, 0.9), rgba(20, 15, 35, 0.95));
  border: 1px solid rgba(255, 75, 139, 0.2);
  border-radius: 15px;
  padding: 3rem;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 75, 139, 0.1);
  backdrop-filter: blur(10px);
}

.letter-decoration {
  position: absolute;
  color: rgba(255, 75, 139, 0.2);
  font-size: 1.5rem;
}

.top-left { top: 15px; left: 20px; }
.top-right { top: 15px; right: 20px; }
.bottom-left { bottom: 15px; left: 20px; }
.bottom-right { bottom: 15px; right: 20px; }

.letter-greeting {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  letter-spacing: 3px;
}

.letter-body {
  line-height: 2.2;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  white-space: pre-wrap;
  font-family: 'ZCOOL XiaoWei', 'Noto Serif SC', serif;
}

.letter-char {
  opacity: 0;
  transition: opacity 0.1s;
}

.letter-char.visible {
  opacity: 1;
}

.cursor {
  color: var(--primary-color);
  animation: blink 0.8s infinite;
  font-weight: 100;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.letter-sign {
  margin-top: 3rem;
  text-align: right;
  font-family: 'Ma Shan Zheng', cursive;
  color: var(--primary-color);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.8s, transform 0.8s;
}

.letter-sign.visible {
  opacity: 1;
  transform: translateY(0);
}

.letter-sign p {
  font-size: 1.3rem;
  letter-spacing: 3px;
}

.sign-date {
  font-size: 1rem !important;
  color: rgba(255, 75, 139, 0.6);
  margin-top: 0.5rem;
}

/* Floating Petals */
.floating-petals {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.petal {
  position: absolute;
  top: -20px;
  color: var(--primary-color);
  animation: petal-fall linear infinite;
}

@keyframes petal-fall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 0;
  }
  10% { opacity: 0.4; }
  90% { opacity: 0.2; }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .letter-paper { padding: 2rem 1.5rem; }
  .page-title { font-size: 2.5rem; }
  .letter-body { font-size: 1rem; }
  .envelope { width: 220px; height: 160px; }
}
</style>
