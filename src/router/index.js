import Vue from 'vue'
import Router from 'vue-router'
import Stories from 'components/storys/stories'
import MusicStore from 'components/music-store/music-store'
import MusicSer from 'components/music-search/music-search'
import StoriesDetail from 'components/story-detail/story-detail'
import CommentCommit from 'components/comment-commit/comment-commit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/story' 
    },
    {
      path: '/story',
      component: Stories,
      children: [
        {
          path: 'detail/:id',
          component: StoriesDetail
        }
      ]
    },
    {
      path: '/music',
      component: MusicStore,
      children: [
        {
          path: 'musicser',
          component: MusicSer
        }
      ]
    },
    {
      path: '/commit',
      component: CommentCommit
    }
  ]
})
