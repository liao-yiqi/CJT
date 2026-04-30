<script setup lang="ts">
import { useRouter } from 'vue-router'
import { HomeFilled, ArrowLeft, Warning } from '@element-plus/icons-vue'

const router = useRouter()

const goHome = (): void => {
  router.push('/')
}

const goBack = (): void => {
  router.go(-1)
}
</script>

<template>
  <div class="not-found-container">
    <div class="bg-grid"></div>
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="content-wrapper">
      <div class="error-code">
        <span class="digit">4</span>
        <span class="digit zero">
          <el-icon class="zero-icon"><Warning /></el-icon>
        </span>
        <span class="digit">4</span>
      </div>
      <div class="divider">
        <span class="dot"></span>
        <span class="line"></span>
        <span class="dot"></span>
      </div>
      <h1 class="title">页面不存在</h1>
      <p class="subtitle">您访问的页面已被移走、删除，或者从来就不存在。</p>
      <div class="action-buttons">
        <el-button type="primary" size="large" class="btn-home" :icon="HomeFilled" @click="goHome">
          返回首页
        </el-button>
        <el-button size="large" class="btn-back" :icon="ArrowLeft" @click="goBack">
          返回上页
        </el-button>
      </div>
    </div>
    <div class="illustration">
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="svg-illustration">
        <circle cx="200" cy="200" r="130" fill="#f0f4ff" stroke="#c7d7ff" stroke-width="1.5" />
        <ellipse
          cx="200"
          cy="200"
          rx="50"
          ry="130"
          fill="none"
          stroke="#c7d7ff"
          stroke-width="1"
          stroke-dasharray="4 3"
        />
        <ellipse
          cx="200"
          cy="200"
          rx="130"
          ry="40"
          fill="none"
          stroke="#c7d7ff"
          stroke-width="1"
          stroke-dasharray="4 3"
        />
        <line
          x1="200"
          y1="70"
          x2="200"
          y2="110"
          stroke="#a0b4f8"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle cx="200" cy="65" r="5" fill="#6c8ef5" />
        <circle cx="200" cy="115" r="5" fill="#6c8ef5" />
        <text
          x="200"
          y="215"
          text-anchor="middle"
          font-size="80"
          font-weight="700"
          fill="#d4ddff"
          font-family="serif"
        >
          ?
        </text>
        <g transform="translate(100, 130) rotate(-15)">
          <rect width="44" height="56" rx="4" fill="white" stroke="#c7d7ff" stroke-width="1" />
          <line
            x1="8"
            y1="16"
            x2="36"
            y2="16"
            stroke="#c7d7ff"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <line
            x1="8"
            y1="24"
            x2="36"
            y2="24"
            stroke="#c7d7ff"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <line
            x1="8"
            y1="32"
            x2="28"
            y2="32"
            stroke="#c7d7ff"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </g>
        <g transform="translate(265, 145) rotate(12)">
          <rect width="38" height="48" rx="4" fill="white" stroke="#c7d7ff" stroke-width="1" />
          <line
            x1="6"
            y1="14"
            x2="32"
            y2="14"
            stroke="#c7d7ff"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <line
            x1="6"
            y1="22"
            x2="32"
            y2="22"
            stroke="#c7d7ff"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <line
            x1="6"
            y1="30"
            x2="22"
            y2="30"
            stroke="#c7d7ff"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </g>
        <circle cx="90" cy="100" r="3" fill="#6c8ef5" opacity="0.7" class="star star-1" />
        <circle cx="320" cy="115" r="2.5" fill="#a78bfa" opacity="0.7" class="star star-2" />
        <circle cx="75" cy="280" r="2" fill="#6c8ef5" opacity="0.6" class="star star-3" />
        <circle cx="330" cy="290" r="3" fill="#a78bfa" opacity="0.7" class="star star-4" />
        <circle cx="150" cy="340" r="2" fill="#6c8ef5" opacity="0.5" class="star star-5" />
        <circle cx="255" cy="350" r="2.5" fill="#a78bfa" opacity="0.6" class="star star-6" />
        <g transform="translate(156, 230)">
          <circle
            cx="22"
            cy="0"
            r="10"
            fill="#6c8ef5"
            opacity="0.15"
            stroke="#6c8ef5"
            stroke-width="1"
          />
          <rect
            x="14"
            y="10"
            width="16"
            height="26"
            rx="8"
            fill="#6c8ef5"
            opacity="0.12"
            stroke="#6c8ef5"
            stroke-width="1"
          />
          <line
            x1="22"
            y1="36"
            x2="14"
            y2="58"
            stroke="#6c8ef5"
            stroke-width="1.5"
            stroke-linecap="round"
            opacity="0.5"
          />
          <line
            x1="22"
            y1="36"
            x2="30"
            y2="58"
            stroke="#6c8ef5"
            stroke-width="1.5"
            stroke-linecap="round"
            opacity="0.5"
          />
          <line
            x1="30"
            y1="18"
            x2="50"
            y2="10"
            stroke="#6c8ef5"
            stroke-width="2"
            stroke-linecap="round"
            opacity="0.7"
          />
          <circle
            cx="52"
            cy="9"
            r="4"
            fill="none"
            stroke="#6c8ef5"
            stroke-width="1.5"
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary: #6c8ef5;
$secondary: #a78bfa;
$gradient: linear-gradient(135deg, $primary 0%, $secondary 100%);
$bg-page: #f7f8fc;
$text-dark: #1a1f3c;
$text-muted: #6b7280;
$border-light: #e0e7ff;
$hover-bg: #f0f4ff;

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(5deg);
  }
}

@keyframes gentle-rotate {
  0%,
  100% {
    transform: rotate(-1.5deg);
  }
  50% {
    transform: rotate(1.5deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.4);
  }
}

.not-found-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $bg-page;
  overflow: hidden;
  padding: 0 40px;
  gap: 60px;
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}

.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba($primary, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba($primary, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);

  &.orb-1 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba($primary, 0.12) 0%, transparent 70%);
    top: -100px;
    right: -100px;
  }

  &.orb-2 {
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba($secondary, 0.1) 0%, transparent 70%);
    bottom: -80px;
    left: -80px;
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  max-width: 520px;
  flex: 0 0 auto;
}

.error-code {
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1;
  margin-bottom: 24px;
  user-select: none;
}

.digit {
  font-size: 120px;
  font-weight: 800;
  letter-spacing: -4px;
  background: $gradient;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  &.zero {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 108px;
    background: $gradient;
    border-radius: 50%;
    -webkit-text-fill-color: initial;
    animation: float 3s ease-in-out infinite;

    .zero-icon {
      font-size: 52px;
      color: white;
    }
  }
}

.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $primary;
    opacity: 0.5;
  }

  .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, $primary, $secondary);
    opacity: 0.3;
    max-width: 200px;
  }
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: $text-dark;
  margin: 0 0 12px;
  letter-spacing: -0.3px;
}

.subtitle {
  font-size: 15px;
  color: $text-muted;
  line-height: 1.7;
  margin: 0 0 32px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-home {
  background: $gradient;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  padding: 0 28px;
  height: 44px;
  transition:
    opacity 0.2s,
    transform 0.15s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
}

.btn-back {
  border-radius: 10px;
  border-color: $border-light;
  color: $primary;
  background: white;
  font-weight: 500;
  height: 44px;
  padding: 0 24px;
  transition:
    border-color 0.2s,
    background 0.2s,
    transform 0.15s;

  &:hover {
    border-color: $primary;
    background: $hover-bg;
    transform: translateY(-1px);
  }
}

.illustration {
  position: relative;
  z-index: 1;
  flex: 0 0 380px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.svg-illustration {
  width: 100%;
  max-width: 380px;
  animation: gentle-rotate 6s ease-in-out infinite;
}

.star {
  animation: twinkle 2s ease-in-out infinite;

  @for $i from 1 through 6 {
    &.star-#{$i} {
      animation-delay: #{($i - 1) * 0.4}s;
    }
  }
}

@media (max-width: 900px) {
  .not-found-container {
    // 移动端回退为普通文档流，避免 fixed 遮挡系统 UI
    position: relative;
    min-height: 100svh;
    flex-direction: column;
    text-align: center;
    padding: 40px 24px;
    gap: 40px;
  }

  .error-code {
    justify-content: center;
  }
  .divider {
    justify-content: center;
  }
  .action-buttons {
    justify-content: center;
  }

  .illustration {
    flex: 0 0 auto;
    max-width: 280px;
  }
}

@media (max-width: 480px) {
  .digit {
    font-size: 80px;

    &.zero {
      width: 72px;
      height: 72px;

      .zero-icon {
        font-size: 36px;
      }
    }
  }

  .title {
    font-size: 22px;
  }
}
</style>
