<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const ipInfo = ref('')
const currentTime = ref('')
const currentDate = ref('')
let timer = null

const updateDateTime = () => {
  const now = new Date();
  const lang = locale.value === 'zh' ? 'zh-CN' : 'en-US';
  currentDate.value = now.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
  currentTime.value = now.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: locale.value === 'en' });
};

const toggleLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh';
  updateDateTime(); // 更新时间显示格式
};

const currentLanguageText = computed(() => {
  return locale.value === 'zh' ? t('switchToEn') : t('switchToZh');
});

onMounted(() => {
  fetch('https://api.ipinfo.io/lite/me?token=8f4d4c2c4b72b0')
    .then(response => response.json())
    .then(data => {
      if (data.ip && data.asn && data.as_name) {
        const maskedIp = data.ip.replace(/\.\d+$/, '.*');
        const location = data.country_code ? `${data.country_code} 地区` : '';
        ipInfo.value = t('welcome', {
          location,
          provider: data.as_name,
          asn: data.asn,
          ip: maskedIp
        });
      }
    })
    .catch(error => {
      console.error('IP/ASN Acquisition Failed：', error);
      ipInfo.value = t('locationError');
    });

  updateDateTime();
  timer = setInterval(updateDateTime, 1000);
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
})
</script>

<template>
  <div id="app-container">
    <!-- 移动端顶部栏 -->
    <div class="mobile-header">
      <div class="datetime-box">
        <div class="date">{{ currentDate }}</div>
        <div class="time">{{ currentTime }}</div>
      </div>
      <div class="language-toggle">
        <button @click="toggleLanguage" class="lang-btn">
          {{ currentLanguageText }}
        </button>
      </div>
    </div>

    <!-- 桌面端时间日期框 (仅在大屏幕显示) -->
    <div class="datetime-box desktop-only">
      <div class="date">{{ currentDate }}</div>
      <div class="time">{{ currentTime }}</div>
    </div>

    <!-- 桌面端语言切换按钮 (仅在大屏幕显示) -->
    <div class="language-toggle desktop-only">
      <button @click="toggleLanguage" class="lang-btn">
        {{ currentLanguageText }}
      </button>
    </div>

    <div class="card">
      <img class="avatar" src="/avatar.jpg" alt="avatar" />
      <h1>{{ t('name') }}</h1>
      <p class="subtitle">{{ t('subtitle') }}</p>

      <div class="links">
        <a href="https://github.com/AsterZC19" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          {{ t('links.github') }}
        </a>
        <a href="starminus0812@gmail.com">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          {{ t('links.email') }}
        </a>
      </div>

      <div class="footer">
        <p v-if="ipInfo" class="ip-info">{{ ipInfo }}</p>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --bg-color-1: #8785a2;
  --bg-color-2: #ffe2e2;
  --bg-color-3: #ffc7c7;
  --card-bg: rgba(246, 246, 246, 0.85); /* #f6f6f6 */
  --text-color: #3a3a3a;
  --link-bg: rgba(255, 226, 226, 0.7);
  --link-hover-bg: #ffe2e2;
  --icon-color: #5c5c5c;
}

body {
  margin: 0;
  font-family: 'Helvetica Neue', 'Arial', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: var(--text-color);
  background: 
    radial-gradient(circle at 20% 80%, rgba(135, 133, 162, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 199, 199, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 226, 226, 0.3) 0%, transparent 50%),
    linear-gradient(-45deg, var(--bg-color-1), var(--bg-color-2), var(--bg-color-3), var(--bg-color-1));
  background-size: 300% 300%, 250% 250%, 200% 200%, 600% 600%;
  animation: gradientBG 12s ease infinite;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden; /* 防止页面滚动 */
  /* 确保移动端也能看到背景效果 */
  background-attachment: fixed;
}

@keyframes gradientBG {
  0% { 
    background-position: 0% 50%, 100% 0%, 50% 100%, 0% 50%; 
  }
  25% { 
    background-position: 100% 100%, 0% 50%, 100% 0%, 100% 50%; 
  }
  50% { 
    background-position: 50% 0%, 50% 100%, 0% 50%, 100% 50%; 
  }
  75% { 
    background-position: 0% 50%, 100% 50%, 50% 0%, 50% 100%; 
  }
  100% { 
    background-position: 0% 50%, 100% 0%, 50% 100%, 0% 50%; 
  }
}

#app-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh; /* 限制最大高度为视口高度 */
  padding: 2vh; /* 使用视口单位进行响应式间距 */
  box-sizing: border-box;
}

.datetime-box {
  position: fixed;
  top: 2vh;
  left: 2vw;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1vh 2vw;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.2);
  text-align: center;
  color: #444;
  z-index: 10;
  animation: fadeIn 0.8s ease-out;
  position: relative;
  overflow: hidden;
}

.datetime-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  opacity: 1;
  pointer-events: none;
}

.datetime-box .date {
  font-size: clamp(0.7rem, 1.5vw, 0.9rem); /* 响应式字体大小 */
  font-weight: 500;
}

.datetime-box .time {
  font-size: clamp(1rem, 2.5vw, 1.3rem); /* 响应式字体大小 */
  font-weight: 600;
  letter-spacing: 1.5px;
  margin-top: 2px;
}

.card {
  text-align: center;
  padding: 5vh 4vw; /* 使用视口单位进行响应式内边距 */
  border-radius: 20px;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  width: min(650px, 90vw); /* 响应式最大宽度 */
  max-height: 90vh;
  box-sizing: border-box;
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.avatar {
  width: clamp(80px, 12vw, 120px); /* 响应式头像大小 */
  height: clamp(80px, 12vw, 120px);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.avatar:hover {
    transform: scale(1.1);
}

h1 {
  margin: 2vh 0 1vh;
  font-size: clamp(1.5rem, 4vw, 2.2rem); /* 响应式标题字体 */
  font-weight: 600;
}

.subtitle {
  font-size: clamp(0.9rem, 2vw, 1.1rem); /* 响应式副标题字体 */
  color: #555;
  margin-bottom: 4vh;
  min-height: 3em;
}

.links {
  display: flex;
  justify-content: center;
  gap: clamp(10px, 2vw, 15px); /* 响应式间距 */
  flex-wrap: wrap;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: clamp(8px, 1.5vh, 10px) clamp(16px, 3vw, 22px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: clamp(0.8rem, 1.8vw, 1rem);
  position: relative;
  overflow: hidden;
}

.links a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.links a:hover::before {
  opacity: 1;
}

.links a:hover {
  transform: translateY(-2px) scale(1.02);
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.links a:active {
  transform: translateY(0) scale(0.98);
  transition: all 0.1s ease;
}

.footer {
  margin-top: 4vh; /* 使用视口高度单位 */
  height: 3vh; /* 响应式高度 */
}

.ip-info {
  font-size: clamp(0.7rem, 1.5vw, 0.9rem); /* 响应式字体大小 */
  color: #666;
  opacity: 0;
  animation: fadeIn 0.5s 0.5s ease-out forwards;
}

/* 语言切换按钮样式 */
.language-toggle {
  position: fixed;
  top: 2vh;
  right: 2vw;
  z-index: 11;
  animation: fadeIn 0.8s ease-out;
}

.lang-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1vh 2vw;
  border-radius: 15px;
  color: #444;
  font-weight: 500;
  font-size: clamp(0.7rem, 1.5vw, 0.9rem);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.lang-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lang-btn:hover::before {
  opacity: 1;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px) scale(1.02);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.1);
}

.lang-btn:active {
  transform: translateY(0) scale(0.95);
  transition: all 0.1s ease;
}

/* 桌面端和移动端元素显示控制 */
.mobile-header {
  display: none; /* 默认隐藏移动端头部 */
}

.desktop-only {
  display: block; /* 默认显示桌面端元素 */
}

/* 桌面端样式保持不变 */
.desktop-only.datetime-box {
  position: fixed;
  top: 2vh;
  left: 2vw;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 1vh 2vw;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 0 rgba(255, 255, 255, 0.2);
  text-align: center;
  color: #444;
  z-index: 10;
  animation: fadeIn 0.8s ease-out;
  overflow: hidden;
}

.desktop-only.datetime-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  opacity: 1;
  pointer-events: none;
}

/* 响应式设计 - 媒体查询 */

/* 移动端专用布局 */
@media (max-width: 768px) {
  /* 移动端背景优化 */
  body {
    /* 移动端使用 scroll 而不是 fixed，避免 iOS Safari 的显示问题 */
    background-attachment: scroll;
    /* 减少动画复杂度以提升移动端性能 */
    animation: gradientBG 15s ease infinite;
  }

  /* 显示/隐藏控制 */
  .mobile-header {
    display: flex !important;
  }

  .desktop-only {
    display: none !important;
  }

  body {
    overflow-y: auto; /* 移动端允许滚动 */
    overflow-x: hidden; /* 防止水平滚动 */
  }

  #app-container {
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch; /* 改为拉伸对齐 */
    min-height: 100vh;
    max-height: none; /* 移除高度限制 */
    padding: 0;
    width: 100%;
  }

  /* 移动端顶部栏 */
  .mobile-header {
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 2vh 4vw;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 20;
    box-sizing: border-box;
  }

  .mobile-header .datetime-box {
    position: static;
    background: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    animation: none;
    text-align: left;
    overflow: visible;
    border: none;
    z-index: 1;
    flex-shrink: 0;
    display: block;
    min-height: auto;
  }

  .mobile-header .datetime-box::before {
    display: none;
  }

  .mobile-header .datetime-box .date {
    font-size: 0.85rem;
    margin-bottom: 2px;
    position: static;
    z-index: auto;
    line-height: normal;
  }

  .mobile-header .datetime-box .time {
    font-size: 1.1rem;
    letter-spacing: 1px;
    margin-top: 0;
    position: static;
    z-index: auto;
    line-height: normal;
  }

  .mobile-header .language-toggle {
    position: static;
    top: auto;
    right: auto;
    animation: none;
    z-index: 1;
    flex-shrink: 0;
  }

  .mobile-header .lang-btn {
    padding: 10px 16px;
    font-size: 0.8rem;
    min-width: 70px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 12px;
    box-shadow: 
      0 4px 20px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
    position: relative;
    z-index: 1;
  }

  .mobile-header .lang-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  /* 移动端主卡片 */
  .card {
    width: calc(100% - 8vw); /* 使用calc确保正确计算 */
    max-width: none;
    max-height: none;
    margin: 3vh 4vw; /* 左右边距一致 */
    padding: 6vh 6vw;
    position: relative;
    box-sizing: border-box;
    align-self: center; /* 居中对齐 */
  }

  .avatar {
    width: 100px;
    height: 100px;
    margin-bottom: 2vh;
  }

  h1 {
    font-size: 1.8rem;
    margin: 2vh 0 1vh;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 4vh;
    min-height: auto;
    line-height: 1.5;
  }

  .links {
    flex-direction: column;
    gap: 2vh;
    margin-bottom: 3vh;
    width: 100%;
  }

  .links a {
    width: 100%;
    justify-content: center;
    padding: 3vh 4vw;
    font-size: 1rem;
    border-radius: 15px;
    box-sizing: border-box;
  }

  .links a svg {
    width: 20px;
    height: 20px;
  }

  .footer {
    margin-top: 3vh;
    height: auto;
    padding-bottom: 2vh;
    width: 100%;
  }

  .ip-info {
    font-size: 0.85rem;
    line-height: 1.4;
    text-align: center;
  }
}

/* 小屏幕设备 (手机竖屏) 特殊优化 */
@media (max-width: 480px) {
  body {
    /* 在小屏幕设备上简化背景以提升性能 */
    background: 
      radial-gradient(circle at 40% 40%, rgba(255, 226, 226, 0.2) 0%, transparent 60%),
      linear-gradient(-45deg, var(--bg-color-1), var(--bg-color-2), var(--bg-color-3), var(--bg-color-1));
    background-size: 200% 200%, 400% 400%;
    animation: gradientBG 18s ease infinite;
  }

  .mobile-header {
    padding: 1.5vh 3vw;
    min-height: 55px;
  }

  .mobile-header .datetime-box {
    padding: 0;
    min-height: auto;
  }

  .mobile-header .datetime-box .date {
    font-size: 0.75rem;
    margin-bottom: 2px;
  }

  .mobile-header .datetime-box .time {
    font-size: 1rem;
    margin-top: 0;
  }

  .mobile-header .lang-btn {
    padding: 8px 12px;
    font-size: 0.75rem;
    min-width: 60px;
  }

  .card {
    width: calc(100% - 6vw);
    padding: 4vh 4vw;
    margin: 2vh 3vw;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .links a {
    padding: 2.5vh 3vw;
    font-size: 0.9rem;
  }
}

/* 手机横屏也使用移动端布局 */
@media (max-width: 768px) and (orientation: landscape) {
  .mobile-header {
    padding: 1vh 3vw;
    min-height: 50px;
  }

  .mobile-header .datetime-box {
    padding: 0;
    min-height: auto;
  }

  .mobile-header .datetime-box .date {
    font-size: 0.75rem;
    margin-bottom: 2px;
  }

  .mobile-header .datetime-box .time {
    font-size: 1rem;
    margin-top: 0;
  }

  .mobile-header .lang-btn {
    padding: 6px 12px;
    font-size: 0.75rem;
    min-width: 60px;
  }

  .card {
    width: calc(100% - 6vw);
    margin: 2vh 3vw;
    padding: 3vh 4vw;
  }

  .avatar {
    width: clamp(60px, 8vw, 80px);
    height: clamp(60px, 8vw, 80px);
  }

  h1 {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    margin: 1vh 0;
  }

  .subtitle {
    margin-bottom: 2vh;
    font-size: 0.9rem;
  }

  .links {
    gap: 1.5vh;
  }

  .links a {
    padding: 2vh 3vw;
    font-size: 0.9rem;
  }

  .footer {
    margin-top: 2vh;
    height: auto;
  }
}

/* 大屏幕设备优化 */
@media (min-width: 1200px) {
  .datetime-box {
    top: 3vh;
    left: 3vw;
  }

  .language-toggle {
    top: 3vh;
    right: 3vw;
  }

  .card {
    max-width: 600px;
    padding: 6vh 5vw;
  }
}

/* 超宽屏幕优化 */
@media (min-width: 1920px) {
  .datetime-box {
    font-size: 1.2em;
  }

  .card {
    max-width: 700px;
  }
}

/* 平板设备横屏优化 */
@media (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
  .card {
    max-width: 70vw;
    padding: 4vh 5vw;
  }

  .links {
    flex-direction: row;
    gap: 2vw;
  }

  .links a {
    flex: 1;
    padding: 2vh 3vw;
  }
}
</style>