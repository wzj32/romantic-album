<template>
  <div class="home">
    <section class="hero">
      <div class="particles">
        <span v-for="i in 30" :key="i" class="particle" :style="particleStyle(i)"></span>
      </div>
      <div class="hero-content">
        <div class="greeting">致 最特别的你</div>
        <h1 class="title">
          <span class="char" v-for="(ch, i) in titleChars" :key="i" :style="{ animationDelay: `${i * 0.1 + 0.5}s` }">{{ ch }}</span>
        </h1>
        <p class="subtitle">每一眼都是心动，每一刻都在想你</p>
        <div class="heart-container">
          <div class="heart"></div>
        </div>
        <div class="cta-buttons">
          <NuxtLink to="/gallery" class="btn btn-primary">看看你的美 &#10132;</NuxtLink>
          <NuxtLink to="/letter" class="btn btn-outline">读一封情书</NuxtLink>
        </div>
      </div>
      <div class="scroll-indicator">
        <span>向下探索</span>
        <div class="arrow">&darr;</div>
      </div>
    </section>

    <section class="preview-section">
      <h2 class="section-title">属于我们的瞬间</h2>
      <div class="preview-grid">
        <NuxtLink to="/gallery" class="preview-card" v-for="(photo, i) in previewPhotos" :key="i" :style="{ animationDelay: `${i * 0.15}s` }">
          <img :src="photo.src" :alt="photo.caption" loading="lazy" />
          <div class="preview-overlay">
            <span>{{ photo.caption }}</span>
          </div>
        </NuxtLink>
      </div>
      <div class="view-all">
        <NuxtLink to="/gallery" class="btn btn-primary">查看全部照片 &#10132;</NuxtLink>
      </div>
    </section>

    <section class="quote-section">
      <blockquote>
        <p>"世间万物，唯你最珍贵"</p>
      </blockquote>
    </section>

    <footer class="footer">
      <p>Made with <span class="heart-icon">&hearts;</span> just for you</p>
    </footer>
  </div>
</template>

<script setup>
const titleChars = 'For My Only One'.split('')

const previewPhotos = [
  { src: '/photos/5843368A5FAB5119EF6702A1158089FA_0.jpg', caption: '和春天一样美好' },
  { src: '/photos/91AE58D9263CDD181D57F20A99C41AB5.jpg', caption: '温柔的比耶少女' },
  { src: '/photos/C597F6CE1AA1BC235EEA118C95129D78.jpg', caption: '甜甜双马尾' },
  { src: '/photos/361376B5A660CEDE2C5142410D19F39C.jpg', caption: '夜色温柔如你' },
]

function particleStyle(i) {
  const left = Math.random() * 100
  const delay = Math.random() * 8
  const duration = 6 + Math.random() * 6
  const size = 2 + Math.random() * 4
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    width: `${size}px`,
    height: `${size}px`,
  }
}
</script>

<style scoped>
.home {
  position: relative;
  z-index: 1;
}

/* Hero */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: -10px;
  border-radius: 50%;
  background: var(--primary-color);
  opacity: 0;
  animation: fall linear infinite;
  box-shadow: 0 0 6px var(--glow-color);
}

@keyframes fall {
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 0.8; }
  90% { opacity: 0.3; }
  100% { opacity: 0; transform: translateY(100vh); }
}

.hero-content {
  text-align: center;
  z-index: 10;
  padding: 2.5rem;
}

.greeting {
  font-size: 1.2rem;
  color: #fce4ec;
  letter-spacing: 8px;
  margin-bottom: 1.5rem;
  animation: fadeIn 1.5s ease-out;
}

.title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 5rem;
  margin-bottom: 1rem;
  min-height: 6rem;
}

.char {
  display: inline-block;
  background: linear-gradient(45deg, #ff9a9e 0%, #fecfef 99%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  filter: drop-shadow(0 0 30px var(--glow-color));
  opacity: 0;
  animation: charIn 0.5s ease-out forwards;
}

@keyframes charIn {
  from { opacity: 0; transform: translateY(20px) scale(0.8); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.subtitle {
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 5px;
  color: #fce4ec;
  opacity: 0;
  animation: fadeInUp 1s ease-out 2s forwards;
  margin-bottom: 2rem;
}

/* Heart */
.heart-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0 2.5rem;
  opacity: 0;
  animation: fadeIn 1s ease-out 2.5s forwards;
}

.heart {
  background-color: var(--primary-color);
  height: 30px;
  width: 30px;
  transform: rotate(-45deg);
  animation: heartbeat 1.2s infinite;
  box-shadow: 0 0 20px var(--glow-color);
  position: relative;
}

.heart:before,
.heart:after {
  content: "";
  background-color: var(--primary-color);
  border-radius: 50%;
  height: 30px;
  width: 30px;
  position: absolute;
  box-shadow: 0 0 20px var(--glow-color);
}

.heart:before { top: -15px; left: 0; }
.heart:after { left: 15px; top: 0; }

/* CTA Buttons */
.cta-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  opacity: 0;
  animation: fadeInUp 1s ease-out 3s forwards;
}

.btn {
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  font-family: 'Noto Serif SC', serif;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), #ff8ba7);
  color: white;
  box-shadow: 0 4px 20px var(--glow-color);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px var(--glow-color);
}

.btn-outline {
  border: 1px solid rgba(255, 75, 139, 0.5);
  color: #fce4ec;
  background: transparent;
}

.btn-outline:hover {
  background: rgba(255, 75, 139, 0.15);
  border-color: var(--primary-color);
  transform: translateY(-3px);
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 40px;
  text-align: center;
  font-size: 0.9rem;
  letter-spacing: 2px;
  color: rgba(252, 228, 236, 0.8);
  animation: fadeInUp 1s ease-out 3.5s both;
}

.arrow {
  margin-top: 10px;
  font-size: 1.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

/* Preview Section */
.preview-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 2.5rem;
  color: #fce4ec;
  margin-bottom: 3rem;
  letter-spacing: 5px;
}

.preview-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.preview-card {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  aspect-ratio: 3/4;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  animation: fadeInUp 0.8s ease-out both;
  text-decoration: none;
}

.preview-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 20px 40px var(--glow-color);
}

.preview-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.preview-card:hover img {
  transform: scale(1.1);
}

.preview-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 60%);
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.preview-card:hover .preview-overlay {
  opacity: 1;
}

@media (max-width: 768px) {
  .preview-overlay {
    opacity: 1;
  }
}

.preview-overlay span {
  color: white;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.3rem;
  letter-spacing: 2px;
}

.view-all {
  text-align: center;
  margin-top: 3rem;
}

/* Quote Section */
.quote-section {
  padding: 6rem 2rem;
  text-align: center;
}

blockquote p {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 2.5rem;
  color: #fce4ec;
  letter-spacing: 3px;
  font-style: italic;
}

/* Footer */
.footer {
  text-align: center;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.heart-icon {
  color: var(--primary-color);
  display: inline-block;
  animation: heartbeat 1.5s infinite;
}

@media (max-width: 1024px) {
  .preview-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .greeting { font-size: 1rem; letter-spacing: 5px; }
  .title { font-size: 2.8rem; min-height: auto; }
  .subtitle { font-size: 1rem; letter-spacing: 3px; }
  .cta-buttons { flex-direction: column; align-items: center; }
  .preview-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .section-title { font-size: 2rem; }
  blockquote p { font-size: 1.8rem; }
}

@media (max-width: 480px) {
  .preview-grid { grid-template-columns: 1fr; }
}
</style>
