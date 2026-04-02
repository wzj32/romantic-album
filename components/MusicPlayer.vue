<template>
  <div class="music-player" @click="togglePlay">
    <div class="disc" :class="{ spinning: playing }">
      <div class="disc-inner">&#9835;</div>
    </div>
    <div class="player-tip">{{ playing ? '播放中' : '点击播放' }}</div>
  </div>
</template>

<script setup>
const playing = ref(false)
let audio = null

onMounted(() => {
  audio = new Audio('/music/bgm.mp3')
  audio.loop = true
  audio.volume = 0.3
  audio.addEventListener('ended', () => {
    playing.value = false
  })
})

function togglePlay() {
  if (!audio) return
  if (playing.value) {
    audio.pause()
    playing.value = false
  } else {
    audio.play().then(() => {
      playing.value = true
    }).catch(() => {
      playing.value = false
    })
  }
}

onUnmounted(() => {
  if (audio) {
    audio.pause()
    audio = null
  }
})
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.disc {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 15px var(--glow-color);
  transition: box-shadow 0.3s;
}

.disc:hover {
  box-shadow: 0 0 25px var(--glow-color);
}

.disc.spinning {
  animation: spin 3s linear infinite;
}

.disc-inner {
  font-size: 1.2rem;
  color: var(--primary-color);
}

.player-tip {
  background: rgba(13, 10, 27, 0.8);
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .music-player {
    bottom: 20px;
    right: 20px;
  }
  .player-tip {
    display: none;
  }
}
</style>
