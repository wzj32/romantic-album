<template>
  <div class="timeline-page">
    <header class="page-header">
      <h1 class="page-title">我们的时光轴</h1>
      <p class="page-desc">那些闪闪发光的日子</p>
    </header>

    <div class="timeline">
      <div class="timeline-line"></div>
      <div
        class="timeline-item"
        v-for="(item, index) in events"
        :key="index"
        :class="[index % 2 === 0 ? 'left' : 'right', { visible: visibleItems.has(index) }]"
        :data-index="index"
      >
        <div class="timeline-dot">
          <span class="dot-inner"></span>
        </div>
        <div class="timeline-card">
          <div class="card-date">{{ item.date }}</div>
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.description }}</p>
          <img v-if="item.image" :src="item.image" :alt="item.title" class="card-image" loading="lazy" />
        </div>
      </div>
    </div>

    <div class="timeline-end">
      <div class="end-heart">&hearts;</div>
      <p>未来的每一天，都想和你一起书写...</p>
    </div>
  </div>
</template>

<script setup>
const events = [
  {
    date: '2024.01.15',
    title: '初次相遇',
    description: '在那个冬日的午后，命运让我们相遇。从第一眼起，你就成了我心中最特别的存在。',
    image: 'https://images.unsplash.com/photo-1543430720-fa600c67e423?auto=format&fit=crop&w=500&q=80',
  },
  {
    date: '2024.02.14',
    title: '第一次约会',
    description: '情人节那天，我们一起走过那条长长的街道。你的笑容比任何花束都要美。',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80',
  },
  {
    date: '2024.04.01',
    title: '一起看樱花',
    description: '春天来了，我们并肩站在樱花树下。花瓣落在你的发间，那一刻我觉得整个世界都在微笑。',
    image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?auto=format&fit=crop&w=500&q=80',
  },
  {
    date: '2024.06.20',
    title: '夏日旅行',
    description: '我们一起去了海边。你站在夕阳下，海风吹起你的头发，那画面我永远都忘不了。',
    image: 'https://images.unsplash.com/photo-1506744626753-1fa7673e022b?auto=format&fit=crop&w=500&q=80',
  },
  {
    date: '2024.09.10',
    title: '你的生日',
    description: '为你准备了一整天的惊喜。看到你开心的样子，我觉得所有的努力都值得。',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80',
  },
  {
    date: '2024.12.25',
    title: '圣诞节的约定',
    description: '在飘雪的夜晚，我们许下了一个约定——无论未来如何，都要一直在一起。',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
  },
]

const visibleItems = ref(new Set())

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Number(entry.target.getAttribute('data-index'))
        visibleItems.value = new Set([...visibleItems.value, idx])
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })

  document.querySelectorAll('.timeline-item[data-index]').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
.timeline-page {
  position: relative;
  z-index: 1;
  padding-top: 80px;
  min-height: 100vh;
  padding-bottom: 4rem;
}

.page-header {
  text-align: center;
  padding: 3rem 2rem 4rem;
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

/* Timeline */
.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--primary-color), transparent);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 0 3rem 4rem;
  opacity: 0;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.timeline-item.left {
  left: 0;
  text-align: right;
  transform: translateX(-30px);
}

.timeline-item.right {
  left: 50%;
  text-align: left;
  transform: translateX(30px);
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-dot {
  position: absolute;
  top: 5px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--bg-color);
  border: 2px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 15px var(--glow-color);
}

.left .timeline-dot {
  right: -9px;
}

.right .timeline-dot {
  left: -9px;
}

.dot-inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-color);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.6); }
}

.timeline-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.timeline-card:hover {
  border-color: rgba(255, 75, 139, 0.3);
  box-shadow: 0 10px 30px rgba(255, 75, 139, 0.15);
}

.card-date {
  color: var(--primary-color);
  font-size: 0.85rem;
  letter-spacing: 2px;
  margin-bottom: 0.5rem;
}

.card-title {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.6rem;
  color: #fce4ec;
  margin-bottom: 0.8rem;
  letter-spacing: 2px;
}

.card-desc {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.card-image {
  width: 100%;
  border-radius: 10px;
  margin-top: 0.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Timeline End */
.timeline-end {
  text-align: center;
  padding: 3rem 2rem;
  color: rgba(252, 228, 236, 0.6);
}

.end-heart {
  font-size: 2.5rem;
  color: var(--primary-color);
  animation: heartbeat 1.5s infinite;
  margin-bottom: 1rem;
}

.timeline-end p {
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.5rem;
  letter-spacing: 3px;
}

/* Mobile */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    padding: 0 1rem 3rem 3rem;
    text-align: left;
  }

  .timeline-item.left,
  .timeline-item.right {
    left: 0;
    text-align: left;
  }

  .timeline-item.left .timeline-dot,
  .timeline-item.right .timeline-dot {
    left: 11px;
    right: auto;
  }

  .timeline-item.left {
    transform: translateY(20px);
  }

  .timeline-item.right {
    transform: translateY(20px);
  }

  .timeline-item.visible {
    transform: translateY(0);
  }

  .page-title { font-size: 2.5rem; }
}
</style>
