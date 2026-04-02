<template>
  <div class="gallery-page">
    <header class="page-header">
      <h1 class="page-title">你的每一面</h1>
      <p class="page-desc">都是我眼中最美的风景</p>
    </header>

    <main class="gallery-section">
      <div class="gallery-grid" ref="gridRef">
        <div
          class="gallery-item"
          v-for="(photo, index) in photos"
          :key="index"
          :class="{ visible: visibleItems.has(index) }"
          :data-index="index"
          @click="openLightbox(index)"
        >
          <div class="image-wrapper">
            <img :src="photo.src" :alt="photo.caption" loading="lazy" />
            <div class="overlay">
              <span class="caption">{{ photo.caption }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Lightbox -->
    <Teleport to="body">
      <div class="lightbox" v-if="lightboxOpen" @click.self="closeLightbox">
        <button class="lb-close" @click="closeLightbox">&times;</button>
        <button class="lb-prev" @click="prevPhoto">&#10094;</button>
        <div class="lb-content">
          <img :src="photos[currentIndex].src" :alt="photos[currentIndex].caption" />
          <div class="lb-caption">{{ photos[currentIndex].caption }}</div>
          <div class="lb-counter">{{ currentIndex + 1 }} / {{ photos.length }}</div>
        </div>
        <button class="lb-next" @click="nextPhoto">&#10095;</button>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
const photos = [
  { src: 'https://images.unsplash.com/photo-1543430720-fa600c67e423?auto=format&fit=crop&w=800&q=80', caption: '初遇的惊艳' },
  { src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80', caption: '你的笑靥' },
  { src: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=800&q=80', caption: '眼里的星光' },
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', caption: '温柔的侧脸' },
  { src: 'https://images.unsplash.com/photo-1506744626753-1fa7673e022b?auto=format&fit=crop&w=800&q=80', caption: '阳光下的你' },
  { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80', caption: '心动瞬间' },
  { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80', caption: '回眸一笑' },
  { src: 'https://images.unsplash.com/photo-1510227272981-87123e259b17?auto=format&fit=crop&w=800&q=80', caption: '无暇的美' },
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', caption: '无可替代' },
  { src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80', caption: '明媚如你' },
  { src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=800&q=80', caption: '最美的时光' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80', caption: '独一无二' },
]

const lightboxOpen = ref(false)
const currentIndex = ref(0)
const visibleItems = ref(new Set())

function openLightbox(index) {
  currentIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

function prevPhoto() {
  currentIndex.value = (currentIndex.value - 1 + photos.length) % photos.length
}

function nextPhoto() {
  currentIndex.value = (currentIndex.value + 1) % photos.length
}

function handleKeydown(e) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prevPhoto()
  if (e.key === 'ArrowRight') nextPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute('data-index'))
        visibleItems.value = new Set([...visibleItems.value, index])
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.gallery-item[data-index]').forEach(el => {
    observer.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.gallery-page {
  position: relative;
  z-index: 1;
  padding-top: 80px;
  min-height: 100vh;
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

.gallery-section {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.gallery-grid {
  column-count: 3;
  column-gap: 1.5rem;
}

.gallery-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease;
}

.gallery-item.visible {
  opacity: 1;
  transform: translateY(0);
}

.gallery-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px var(--glow-color);
  border-color: rgba(255, 75, 139, 0.4);
}

.image-wrapper {
  position: relative;
  width: 100%;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease, filter 0.3s;
  filter: brightness(0.9);
}

.gallery-item:hover img {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%);
  padding: 3rem 1.5rem 1.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.gallery-item:hover .overlay {
  opacity: 1;
}

.caption {
  color: white;
  font-size: 1.4rem;
  font-family: 'Ma Shan Zheng', cursive;
  letter-spacing: 3px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

.lb-content {
  max-width: 85vw;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lb-content img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 0 50px rgba(255, 75, 139, 0.3);
}

.lb-caption {
  margin-top: 1.5rem;
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.5rem;
  color: #fce4ec;
  letter-spacing: 3px;
}

.lb-counter {
  margin-top: 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
}

.lb-close,
.lb-prev,
.lb-next {
  position: absolute;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s, transform 0.3s;
  font-size: 2rem;
}

.lb-close {
  top: 20px;
  right: 30px;
  font-size: 2.5rem;
}

.lb-prev { left: 20px; }
.lb-next { right: 20px; }

.lb-close:hover,
.lb-prev:hover,
.lb-next:hover {
  color: var(--primary-color);
  transform: scale(1.2);
}

@media (max-width: 1024px) {
  .gallery-grid { column-count: 2; }
}

@media (max-width: 768px) {
  .gallery-grid { column-count: 1; max-width: 500px; margin: 0 auto; }
  .page-title { font-size: 2.5rem; }
}
</style>
