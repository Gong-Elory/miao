import Vue from 'vue'
import Router from 'vue-router'
// import Stories from 'components/storys/stories'
// import MusicStore from 'components/music-store/music-store'
// import MusicSer from 'components/music-search/music-search'
// import StoriesDetail from 'components/story-detail/story-detail'
// import CommentCommit from 'components/comment-commit/comment-commit'
Vue.use(Router)

// lazy load
const Stories = resolve => {
  import('components/storys/stories').then(cp => {
    resolve(cp)
  })
}

const MusicStore = resolve => {
  import('components/music-store/music-store').then(cp => {
    resolve(cp)
  })
}
const MusicSer = resolve => {
  import('components/music-search/music-search').then(cp => {
    resolve(cp)
  })
}
const StoriesDetail = resolve => {
  import('components/story-detail/story-detail').then(cp => {
    resolve(cp)
  })
}
const CommentCommit = resolve => {
  import('components/comment-commit/comment-commit').then(cp => {
    resolve(cp)
  })
}

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
