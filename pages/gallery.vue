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
  { src: '/photos/5843368A5FAB5119EF6702A1158089FA_0.jpg', caption: '和春天一样美好' },
  { src: '/photos/91AE58D9263CDD181D57F20A99C41AB5.jpg', caption: '温柔的比耶少女' },
  { src: '/photos/C597F6CE1AA1BC235EEA118C95129D78.jpg', caption: '甜甜双马尾' },
  { src: '/photos/361376B5A660CEDE2C5142410D19F39C.jpg', caption: '夜色温柔' },
  { src: '/photos/1391BF2DE1034DCDE9AECAA7758B642F.jpg', caption: '眨眼杀' },
  { src: '/photos/04765A9D687C2CB412A18AE25AA7DF31.jpg', caption: '撒娇的模样最甜' },
  { src: '/photos/FE3A38DC555AC81FF9217153E6AF4170.jpg', caption: '新春里的小美好' },
  { src: '/photos/3054AA567D3169F4DB0B8CE791BA1D5D.jpg', caption: '温柔的下午茶时光' },
  { src: '/photos/C234806E8AA47D12588B6F3209B5CBEC.jpg', caption: '古镇里的慢时光' },
  { src: '/photos/FDB049E652287FC45BE90F2000894B46.jpg', caption: '冬日里的甜蜜滋味' },
  { src: '/photos/8357FF80C4E9563FD177748C5652BB4E.jpg', caption: '嘘，这是我们的秘密' },
  { src: '/photos/A9B72FDD0A5596A1DAF97C83BE2C6758.jpg', caption: '比个耶，今天也开心' },
  { src: '/photos/29CB5795AD901B62AF59811A5184C327.jpg', caption: '闭上眼也在微笑' },
  { src: '/photos/B6BE1C1C7D4579FE93301FF99A0FBB3C.jpg', caption: '眼里有星星的女孩' },
  { src: '/photos/19EFE660296BA7E242B037B6A3672F96.jpg', caption: '蓝色是你的专属色' },
  { src: '/photos/045D8821D0009DD293408EA2F93EDA9A.jpg', caption: '慵懒的午后时光' },
  { src: '/photos/89E536639D59E3C6ED86A5905DE2AC66.jpg', caption: '嘟嘟嘴的小可爱' },
  { src: '/photos/415BDB8D9D54746F12FD8E9FA8C1176D.jpg', caption: '鬼马少女本色' },
  { src: '/photos/60FF6415C597D855EE2F68C13C867BC8.jpg', caption: '戴口罩也遮不住的美' },
  { src: '/photos/C29AF36785223C143F9B5FB0346DDCFD.jpg', caption: '素颜也倾城' },
  { src: '/photos/EA69617A47ABE560D0F400F5F3714915.jpg', caption: '短发干练又温柔' },
  { src: '/photos/0F2A6F750AD6D619330FA1D8E8219A2E.jpg', caption: '嘟嘴卖萌一百分' },
  { src: '/photos/B4179AD893E8F28C04667097636670B0.jpg', caption: '鼓起腮帮的小傲娇' },
  { src: '/photos/6A0AE5A770DB85850CF5180588F85C98.jpg', caption: '安静时最迷人' },
  { src: '/photos/237101A1CBF604DCFECF288A149D2650.jpg', caption: '穿卫衣的日常也好看' },
  { src: '/photos/FC78E84F9A64A2A35D7D2A4BFB9F4696.jpg', caption: '新年快乐，我的小猫咪' },
  { src: '/photos/A2884B8105991D11A5D39862E247C037.jpg', caption: '慵懒也是一种美' },
  { src: '/photos/E02128A8996E7FF1AE182AD7FDADB623.jpg', caption: '微微泛红的脸颊' },
  { src: '/photos/0A7C5978E24BA4BB55EE84AFAE765413.jpg', caption: '闭上眼感受世界' },
  { src: '/photos/89D72D2E24D6CE3AE5B334FA85373CA0.jpg', caption: '漫画少女既视感' },
  { src: '/photos/37FFB11DB10B89BBB8C5639588FC0097_0.jpg', caption: '对镜嘟嘴日常' },
  { src: '/photos/78BCEFCB0BAF4169CA2802A2F9D9F9BB.jpg', caption: '软萌小兔叽' },
  { src: '/photos/D7F6642B787D7014FF450537DB8D8142.jpg', caption: '变身小猫咪' },
  { src: '/photos/37C87542783E5D7F80E29D7CAEE540F1.jpg', caption: '军训中的英姿' },
  { src: '/photos/4A2B236608418001A4B74EABED84A1F6.jpg', caption: '你是我的小公主' },
  { src: '/photos/5DC0BBBDF4A5EBD9B43802CEEC9B81E7.jpg', caption: '军训也要可可爱爱' },
  { src: '/photos/3E9CCC982CD18D234D100A144DF564A9.jpg', caption: '贴纸也衬你好看' },
  { src: '/photos/76EB6224B67983026B54FF27A53659FE.jpg', caption: '元气满满的夏天' },
  { src: '/photos/E45292EB2F31DFFCEBC8E56E25477069.jpg', caption: '托腮发呆好治愈' },
  { src: '/photos/B3EE1CB2176C0CB62B01BC56883BD288_0.jpg', caption: '认真的样子很好看' },
  { src: '/photos/EE087DF0AF138FBD5CF2F3BD49E36CB4_0.jpg', caption: '偷偷喝奶茶的幸福' },
  { src: '/photos/2914CAEBF1739DCC28B6323821DC9538.jpg', caption: '微笑的弧度刚刚好' },
  { src: '/photos/03BD6F8E46F124DE06E5577DA6CB50B0.jpg', caption: '冬日里的温暖' },
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
