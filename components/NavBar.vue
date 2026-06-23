<template>
  <nav class="navbar" :class="{ hidden: !visible }">
    <div class="nav-inner">
      <NuxtLink to="/" class="nav-logo">
        <span class="heart-icon">&#9829;</span>
        <span>For You</span>
      </NuxtLink>
      <div class="nav-links">
        <NuxtLink to="/" class="nav-link" active-class="active" :class="{ active: $route.path === '/' }">首页</NuxtLink>
        <NuxtLink to="/gallery" class="nav-link" active-class="active">相册</NuxtLink>
        <NuxtLink to="/timeline" class="nav-link" active-class="active">心动</NuxtLink>
        <NuxtLink to="/letter" class="nav-link" active-class="active">情书</NuxtLink>
      </div>
      <button class="mobile-toggle" @click="mobileOpen = !mobileOpen">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-menu" :class="{ open: mobileOpen }">
      <NuxtLink to="/" class="nav-link" @click="mobileOpen = false">首页</NuxtLink>
      <NuxtLink to="/gallery" class="nav-link" @click="mobileOpen = false">相册</NuxtLink>
      <NuxtLink to="/timeline" class="nav-link" @click="mobileOpen = false">心动</NuxtLink>
      <NuxtLink to="/letter" class="nav-link" @click="mobileOpen = false">情书</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
const visible = ref(true)
const mobileOpen = ref(false)
let lastScrollY = 0

onMounted(() => {
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY
    visible.value = currentY < 100 || currentY < lastScrollY
    lastScrollY = currentY
  })
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(13, 10, 27, 0.7);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: transform 0.3s ease;
}

.navbar.hidden {
  transform: translateY(-100%);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  text-decoration: none;
  color: var(--primary-color);
  font-family: 'Ma Shan Zheng', cursive;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-logo .heart-icon {
  animation: heartbeat 1.5s infinite;
  display: inline-block;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  letter-spacing: 2px;
  transition: color 0.3s, text-shadow 0.3s;
  position: relative;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--glow-color);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary-color);
  border-radius: 1px;
  box-shadow: 0 0 8px var(--glow-color);
}

.mobile-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.mobile-toggle span {
  width: 22px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1px;
  transition: 0.3s;
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 0 2rem 1rem;
  gap: 1rem;
}

.mobile-menu.open {
  display: flex;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  .mobile-toggle {
    display: flex;
  }
}
</style>
