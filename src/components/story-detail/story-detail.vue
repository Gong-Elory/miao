<template>
  <transition name="detail">
    <div class="story-detail-container">
      <div class="head-operator" ref="opr">
        <div class="back"><i class="fa fa-chevron-left" @click="back"></i></div>
        <h1 class="title">动态</h1>
      </div>
      <div class="story-wrapper">
        <scroll class="comment-panel" :data="commentList"  ref="scroll" :probeType="1">
          <div>
            <div class="content-wrapper">
              <div class="author-desc">
                <img :src="story.avator" height="40" width="40" alt="" class="avator"/>
                <span class="name" v-text="story.author"></span>
                <span class="timestamp" v-text="story.timestamp"></span>
              </div>
              <div class="comment-wrapper">
                <p class="comment" v-html="story.comment"></p>
              </div>
              <div class="music-panel">
                <div class="music-img" @click="playMusic(story.song, false, 'icon')">
                  <img :src="story.song.songimage" height="60" width="60" alt="" class="music-icon" />
                  <i class="fa" :class="[(playing && currentSong == story.song)? 'fa-pause-circle-o' : 'fa-play-circle-o']"></i>
                </div>
                <div class="song-content" @click="playMusic(story.song, true, 'panel')">
                  <p class="songName" v-html="story.song.songname"></p>
                  <p class="singer" v-html="story.song.singer"></p>
                </div>
                <div class="like" @click="countNum(story.song, 'rate', 'youatti')">
                  <i class="fa" :class="[story.song.youatti ? 'fa-heart' : 'fa-heart-o']"></i>
                  <span class="like-num">{{story.song.rate | formatNum}}</span>
                </div>
              </div>
            </div>
            <comment-list :songid="mid" @hasCommentList = "getCommentList" ref="commentPanel" :refresh="isRefresh"></comment-list>
          </div>
        </scroll>
      </div>
      <comment-box @commitComment="refreshComment"></comment-box>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'common/scroll/scroll'
  import {ajax, tips, getSong, formatDate, outNum} from 'base/js/util'
  import CommentList from 'common/comment-list/comment-list'
  import {playlistMixin, numOperate} from 'base/js/mixin'
  import CommentBox from 'common/comment-box/comment-box'
  export default {
    mixins: [playlistMixin, numOperate],
    data() {
      return {
        commentList: [],
        mid: -1,
        offsetTop: 0,
        isRefresh: -1
      }
    },
    mounted(){
     this.mid = Number(this.$route.params.id)
     let top = this.$refs.commentPanel.$el.offsetTop
     this.offsetTop = top
    },
    components: {
      Scroll,
      CommentList,
      CommentBox
    },
    props: {
      story: {
        type: Object,
        default: {}
      }
    },
    methods: {
      playMusic(song, fullScreen, target) {
        if(this.currentSong == song) {
          if(fullScreen) {
            this.setFullScreen(true)
          }
          if(target == 'icon') {
            this.setPlayingFlag(!this.playing)
          }
          return
        }
        this.nowPlay = song;
        let songList = [];
        songList.push(song)
        this.selectPlay({
          list: songList,
          index: 0,
          isFullScreen: (fullScreen ? true : false)
        })
      },
      back() {
        this.$router.back()
      },
      fixedTitle(pos){
        if( pos.y < -50 ) {
          this.$refs.opr.style.background = `rgba(32,206,197,${Math.min(1, pos.y/-300)})`
        } else {
          this.$refs.opr.style.background = '-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0.3)), to(transparent))'
        }
      },
      getCommentList(commentlist){
        this.commentList = commentlist
        let top = this.$refs.commentPanel.$el.offsetTop
        setTimeout(() => {
          this.$refs.scroll.scrollTo(0, -top, 600)
        }, 400)
        this.isRefresh = -1
      },
      refreshComment() {
        console.log('saffsadgadfsg')
        this.isRefresh = this.mid
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
  .detail-enter-active, .detail-leave-active {
    transition: all 0.4s
  }
  .detail-enter, .detail-leave-to{
    transform: translate3d(100%, 0, 0)
  }

  .story-detail-container{
    position: fixed;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
    .head-operator{
      position: fixed;
      top: 0;
      z-index: $head-operator;
      width: 100%;
      background-color: #20CEC5;
      .back{
        position: absolute;
        width: 40px;
        height: 100%;
        left: 3px;
        top: 11px;
        .fa-chevron-left{
          color: #fff;
          font-size: 20px;
        }
      }
      .title{
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: $font-size-large;
        height: 40px;
        line-height: 40px;
      }
    }
    .comment-panel{
      background-color: #fff;
      height: 100%;
      width: 100%;
    }
    .story-wrapper{
      position: absolute;
      top: 40px;
      height: calc(100% - 90px);
      width: 100%;
      .content-wrapper{
        padding: 10px;
      }
    }
  }
</style>