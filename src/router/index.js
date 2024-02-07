import store from '@/store'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'


export const isfriendscreenchanged = ref(false)
export const isSubscribesscreenchanged = ref(false)
export const isMatescreenchanged = ref(false)


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/login.vue'),
      redirect: () => ({ name: 'login', params: { tab: 'profile' } }),
      meta: { requiresAuth: false }, // 이 라우트는 로그인이 필요함을 나타냅니다.
    },
    {
      path: '/main',
      redirect: () => ({ name: 'main', params: { tab: 'profile' } }),
      component: 'main',
      meta: { requiresAuth: false },

      beforeEnter: (to, from, next) => {
        if (store.state.loginStore.isLogin) {
          console.log('로그인 된 상태')
          next()
        } else {
          console.log('로그인 안 된 상태')
          next({ name: 'login' }) // 로그인 페이지로 리다이렉트
        }
      },

    },

    

    {
      path: '/pages/user-profile',
      redirect: () => ({ name: 'pages-user-profile-tab', params: { tab: 'profile' } }),
      meta: { requiresAuth: true },
    },

    ...setupLayouts(routes),
  ],
})





// const publicPages = ['/login', '/main']  // 로그인이 필요하지 않은 페이지의 경로를 배열로 정의

// router.beforeEach((to, from, next) => {
//   // 로그인 상태를 확인하는 코드. 실제 환경에서는 적절한 로그인 확인 로직으로 대체하세요.
//   const isLoggedIn = !!localStorage.getItem('accessToken')

//   // 로그인이 필요하지 않은 페이지에 대한 접근은 항상 허용
//   if (publicPages.includes(to.path)) {
//     next()
//   } else {
//     // 그 외의 페이지에 대한 접근은 로그인 상태에 따라 결정
//     if (isLoggedIn) {
//       next()  // 로그인이 되어있으면 접근 허용
//     } else {
//       alert("로그인 후 이용가능합니다.")
//       next('/main')  // 로그인이 되어있지 않으면 메인 페이지로 리다이렉트
//     }
//   }
// })

// 이동 감지와 변경된 화면 체크
router.beforeEach((to, from, next) => {
  console.log(`화면 이동 감지: ${from.fullPath}에서 ${to.fullPath}로 이동`)

  if (from.fullPath=='/community/user/friend') {
    isfriendscreenchanged.value = true
    console.log('화면 변경됨')
  }
  if (from.fullPath=='/community/user/subscriber'){
    isSubscribesscreenchanged.value = true
  }
  if (from.fullPath=='/community/user/mate'){
    isMatescreenchanged.value = true
  }
  next()
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
// router.beforeEach(to => {
//   const isLoggedIn = isUserLoggedIn()
//   if (canNavigate(to)) {
//     if (to.meta.redirectIfLoggedIn && isLoggedIn)
//       return '/'
//   }
//   else {
//     if (isLoggedIn)
//       return { name: 'not-authorized' }
//     else
//       return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
//   }
// })
///community/user/friend


export default router
