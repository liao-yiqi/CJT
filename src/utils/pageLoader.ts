import { Transition, type App } from 'vue'

// 内部状态
const visible = ref<boolean>(false)

const loaderText = ref<string>('加载中...')

let mountedApp: App | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null
let showTime: number = 0

// ms 防止出现闪烁
const MIN_DURATION = 400

// 样式注入
function injectStyle() {
  if (document.getElementById('__page-loader-style__')) return
  const style = document.createElement('style')
  style.id = '__page-loader-style__'
  style.textContent = `
    @keyframes __pl-morph__ {
      0%,100% { border-radius: 50%; }
      33%      { border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%; }
      66%      { border-radius: 60% 40% 40% 60% / 40% 60% 40% 60%; }
    }
    @keyframes __pl-bounce__ {
      0%,100% { transform: translateY(0)    scale(1,    1);    }
      40%     { transform: translateY(-18px) scale(.95, 1.05); }
      60%     { transform: translateY(-16px) scale(.95, 1.05); }
      80%     { transform: translateY(0)    scale(1.08, .94);  }
      90%     { transform: translateY(-3px) scale(.99, 1.01);  }
    }
    @keyframes __pl-shadow__ {
      0%,100% { transform: scaleX(1);    opacity: .25; }
      40%,60% { transform: scaleX(.55);  opacity: .1;  }
      80%     { transform: scaleX(1.1);  opacity: .3;  }
    }
 
    .__pl-overlay__ {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
    }
    @media (prefers-color-scheme: dark) {
      .__pl-overlay__ { background: rgba(15, 15, 20, 0.92); }
    }
 
    .__pl-body__ {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
 
    .__pl-shape__ {
      width: 48px;
      height: 48px;
      background: #6366f1;
      opacity: .9;
      animation:
        __pl-morph__  2s   ease-in-out                          infinite,
        __pl-bounce__ 1.2s cubic-bezier(.36,.07,.19,.97)        infinite;
    }
    @media (prefers-color-scheme: dark) {
      .__pl-shape__ { background: #818cf8; }
    }
 
    .__pl-shadow__ {
      width: 32px;
      height: 6px;
      background: #6366f1;
      border-radius: 50%;
      margin-top: 4px;
      opacity: .2;
      animation: __pl-shadow__ 1.2s cubic-bezier(.36,.07,.19,.97) infinite;
    }
    @media (prefers-color-scheme: dark) {
      .__pl-shadow__ { background: #818cf8; }
    }
 
    .__pl-text__ {
      font-size: 14px;
      color: #6b7280;
      margin: 20px 0 0;
      letter-spacing: .04em;
      font-family: system-ui, -apple-system, sans-serif;
    }
    @media (prefers-color-scheme: dark) {
      .__pl-text__ { color: #9ca3af; }
    }
 
    .__pl-enter-active__ { transition: opacity .2s ease, transform .2s ease; }
    .__pl-leave-active__ { transition: opacity .3s ease, transform .3s ease; }
    .__pl-enter-from__   { opacity: 0; transform: scale(1.04); }
    .__pl-leave-to__     { opacity: 0; transform: scale(0.96); }
  `
  document.head.appendChild(style)
}

// loader组件
const LoaderComponent = defineComponent({
  setup() {
    return () =>
      h(
        Transition,
        {
          enterActiveClass: '__pl-enter-active__',
          leaveActiveClass: '__pl-leave-active__',
          enterFromClass: '__pl-enter-from__',
          leaveToClass: '__pl-leave-to__'
        },
        () =>
          visible.value
            ? h('div', { class: '__pl-overlay__' }, [
                h('div', { class: '__pl-body__' }, [
                  h(
                    'div',
                    {
                      style: {
                        position: 'relative',
                        width: '60px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }
                    },
                    [h('div', { class: '__pl-shape__' })]
                  ),
                  h('div', { class: '__pl-shadow__' }),
                  h('p', { class: '__pl-text__' }, loaderText.value)
                ])
              ])
            : null
      )
  }
})

// 挂载DOM
function mount() {
  if (mountedApp) return
  injectStyle()
  const container = document.createElement('div')
  container.id = '__page-loader-root__'
  document.body.appendChild(container)
  mountedApp = createApp(LoaderComponent)
  mountedApp.mount(container)
}

const PageLoader = {
  /**
   * 显示加载动画
   * @param {string} [text='加载中...'] 提示文字
   */
  show: (text = '加载中...') => {
    mount()
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    loaderText.value = text
    visible.value = true
    showTime = Date.now()
  },

  /**
   * 隐藏加载动画
   * @param {number} [minDuration] 覆盖默认最短显示时间（ms）
   */
  hide: (minDuration = MIN_DURATION) => {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    const elapsed = Date.now() - showTime
    const remaining = Math.max(0, minDuration - elapsed)
    hideTimer = setTimeout(() => {
      visible.value = false
    }, remaining)
  }
}

export default PageLoader
