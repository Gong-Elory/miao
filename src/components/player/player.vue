<template>
  <div class="player-wrapper">
      <div class="normal-players" v-show="fullScreen">
        <div class="music-background"><!-- 音乐背景 -->
            <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000020PeOh4ZaCw1.jpg?max_age=2592000" class="cd-img">
        </div>
        <div class="operator-panel">
          <div class="icon-wrapper">
            <p class="lyric-panel">是国内人气最高的网页设计师学习平台</p>
          </div>
          <div class="progress-panel">
            <span class="nowtime time">03:20</span>
              <div class="progress-bar-wrapper">
                <progress-bar></progress-bar>
              </div>
            <span class="duration time">04:20</span>
          </div>
        </div>
        <div class="icon-play"><i class="fa fa-play-circle-o"></i></div>
      </div>
      
      <audio :src="currentSong.songlink" autoplay  @ended="end"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import ProgressBar from 'common/progress-bar/progress-bar'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    components:{
      ProgressBar
    },
    methods: {
      end() {
        let index = this.currentIndex + 1
        if (!this.playlist[index]) {
          this.setPlayingFlag(false)
        }
      },
      ...mapMutations({
        setPlayingFlag: 'SET_PLAYING',
        setCurrentIndex: 'SET_CURRETN_INDEX',
        setPlayList: 'SET_PLAYLIST',
        setSequenceList: 'SET_SEQUENCE_LIST',
        setFullScreen: 'SET_FULLSCREEN'
      })
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playing',
        'currentIndex',
        'playlist',
        'sequenceList',
        'currentSong'
      ])
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .normal-players{
    position: relative;
    background-color: #000;
    height: calc(100vm - 70px);
    width: 100%;
    .music-background{
      position: relative;
      padding-top: calc(100% - 70px);
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .icon-play{
      position: absolute;
      width: 34px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      top: 50%;
      left: 50%;
      margin-left: -17px;
      margin-top: -20px;
      .fa{
        font-size: 40px;
        color: #fff;
        opacity: 0.3;
      }
    }
    .operator-panel{
      position: absolute;
      bottom: 0;
      height: 80px;
      width: 100%;
      .icon-wrapper{
        top: 0;
        height: 40px;
        width: 80%;
        margin: 0 auto;
        display: flex;
        .lyric-panel{
          flex: 1;
          color: #fff;
          font-size: 14px;
          line-height: 40px;
          height: 40px;
        }
      }
      .progress-panel{
        display: flex;
        align-items: center;
        width: 80%;
        height: 40px;
        margin: 0px auto;
        padding: 10px 0;
        .progress-bar-wrapper{
          flex: 1;
        }
        .time{
          width: 30px;
          line-height: 30px;
          flex: 0 0 30px;
          font-size: 12px;
          color: #fff;
        }
        .nowtime{
          text-align: left;
        }
        .duration{
          text-align: right;
        }
      }
    }
  }
</style>