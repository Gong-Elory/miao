<template>
  <transition name="player">
    <div v-show="fullScreen" class="music-container">
      <div class="head-operator" ref="opr">
        <div class="back"><i class="fa fa-chevron-left" @click="back"></i></div>
        <h1 class="title" v-text="currentSong.songname"></h1>
      </div>
      <scroll class="music-detail-wrapper" :data="commentList"  ref="scroll" @scroll="fixedTitle" :probeType="3">
        <div ref="slide">
          <div class="music-wrapper" >
            <div class="music-content">
              <player></player>
              <div class="singer-detail">
                <div class="avatar">
                  <img :src="currentSong.songimage" class="singer-avator">
                </div>
                <div class="singer-intro">
                  <span class="name" v-text="currentSong.singer"></span>
                </div>
                <div class="follow">
                  <i class="fa fa-plus"></i>
                  <span>关注他</span>
                </div>
              </div>
            </div>
            <comment-list :songid="musicid" @hasCommentList = "getCommentList" :refresh="refresh"></comment-list>
          </div>  
        </div>
      </scroll>
      <div class="commit-comment" @click="gotoCommitPanel">
        <span class="icon-wrap">
          <i class="fa-edit fa"></i>
        </span>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'common/scroll/scroll'
  import Player from 'components/player/player'
  import CommentList from 'common/comment-list/comment-list'
  import {playlistMixin} from 'base/js/mixin'
  import Bus from 'base/js/eventbus'
  export default {
    mixins: [playlistMixin],
    components: {
      Scroll,
      Player,
      CommentList
    },
    created() {
      Bus.$on('updateComentList', (mid) => {  
        this.refresh = mid
      });  
    },
    data(){
      return {
        songCache: {},
        musicid: null,
        commentList: [],
        refresh: null
      }
    },
    methods: {
      back() {
        this.setFullScreen(false)
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
        this.refresh = null;
      },
      gotoCommitPanel() {
        this.$router.push('/commit')
      }
    },
    watch: {
      currentSong(newVal) {
         if (newVal != this.songCache) {
          this.musicid = newVal.songid
          this.$refs.scroll.scroll.scrollTo(0, 0, 100)
         }
      },
      fullScreen(newVal) {
        if(newVal) {
          this.$nextTick(() => {
            this.$refs.scroll.scroll.refresh()
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
  .player-enter-active, .player-leave-active {
    transition: all 0.4s
  }
  .player-enter, .player-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .music-container{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: $music-detail;
    background-color: $default-background-color;
    overflow: hidden;
  }
  .music-detail-wrapper{
    height: 100%;
  }
  .head-operator{
    position: fixed;
    top: 0;
    z-index: $head-operator;
    width: 100%;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0.3)), to(transparent));
    .back{
      position: absolute;
      width: 30px;
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
  .music-wrapper{
    .music-content{
      height: 100vw;
      background-color: #fff;
      margin-bottom: 10px;
      position: relative;
      .singer-detail{
        background-color: #fff;
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 0;
        padding: 10px 5px;
        width: 100%;
        height: 70px;
        .avatar{
          flex: 0 0 50px;
          padding: 5px 0 0 5px;
          .singer-avator{
            border-radius: 50%;
          }
        }
        .singer-intro{
          margin-left: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .follow{
          flex: 0 0 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #5b5b5b;
          span{
            font-size: $font-size-medium;
          }
        }
      }
    }
    .comment-wrapper{
      background-color: #fff;
      padding: 0 10px;
      h1{
        font-size: 16px;
        text-align: left;
        height: 40px;
        line-height: 40px;
      }
      .coment-list{
        .item{
          padding: 8px;
          border-top: 1px solid #f5f5f5;
          display: flex;
          .custom{
            flex: 0 0 30px;
            img{
              border-radius: 50%;
            }
          }
          .comment-panel{
            margin-left: 10px;
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .name, .cmment-detail{
              font-size: 14px;
              text-align: left;
            }
            .timestamp{
              font-size: 12px;
              color: #bababa;
            }
          }
        }
      }
    }
  }
  .commit-comment{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $default-color;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 200;
    text-align: center;
    line-height: 50px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    .fa-edit{
      color: #fff;
      font-size: 20px;
      margin-top: 16px;
      margin-left: 5px;
    }
  }
</style>