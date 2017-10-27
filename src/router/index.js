import Vue from 'vue'
import Router from 'vue-router'
import Stories from 'components/storys/stories'
import MusicDetail from 'components/music-detail/music-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/story' 
    },
    {
      path: '/story',
      component: Stories
    }
  ]
})
