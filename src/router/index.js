import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/Index'
import HelloKT from '@/components/HelloKT'
import HelloElementUi from '@/components/HelloElementUi'
import Login from '@/page/Login'
import Register from '@/page/Register'
import MyInfo from '@/page/myInfo'
import MyRelease from '@/page/MyRelease'
import PicSingleRelease from '@/page/PicSingleRelease'
import ReleaseVideo from '@/page/ReleaseVideo'
import GoRelease from '@/page/GoRelease'
import store from '../store/store'
import VueCookies from 'vue-cookies'
Vue.use(Router)

const router = new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: Index,
      component: Index,
      meta: {
        requireLogin: false,
        topperAlive: true
      }
    },
    // 登录
    {
      path: '/login',
      component: Login,
      meta: {
        requireLogin: false,
        topperAlive: true
      }
    },
    // 注册
    {
      path: '/register',
      component: Register,
      meta: {
        requireLogin: false,
        topperAlive: true
      }
    },
    // 我的信息
    {
      path: '/myInfo',
      component: MyInfo,
      meta: {
        requireLogin: true,
        topperAlive: true
      }
    },
    // 我的动态
    {
      path: '/myRelease',
      component: MyRelease,
      meta: {
        requireLogin: true,
        topperAlive: true
      }
    },
    // 单个动态
    {
      path: '/picSingleRelease',
      component: PicSingleRelease,
      meta: {
        requireLogin: true,
        topperAlive: true
      }
    },
    // 发表图片动态
    {
      path: '/goRelease',
      component: GoRelease,
      meta: {
        requireLogin: true,
        topperAlive: true
      }
    },
    // 发表视频动态
    {
      path: '/releaseVideo',
      component: ReleaseVideo,
      meta: {
        requireLogin: true,
        topperAlive: true
      }
    },
    {
      path: '/kt/:redirect',
      component: HelloKT
    },
    {
      path: '/helloElem',
      component: HelloElementUi
    }
  ],
  // mode: 'history'
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  // console.log('进入全局拦截跳转')
  if (to.meta.requireLogin) {
    let token = VueCookies.get('Login_token')
    if (token !== null) {
      store.commit('setUserInfo', token.userInfo)
    }
    if (store.getters.getUserInfo === null) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()// 若点击的是不需要验证的页面,则进行正常的路由跳转
  }
})
export default router
