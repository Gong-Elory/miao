<template>
  <div class="player-wrapper" @click.prevent.stop="toggleShow">
      <div class="normal-players" v-show="fullScreen">
        <div class="music-background"><!-- 音乐背景 -->
            <img :src="currentSong.songimage" class="cd-img">
        </div>
        <div class="operator-panel" v-show="show">
          <div class="icon-wrapper">
            <!-- <p class="lyric-panel">是国内人气最高的网页设计师学习平台</p> -->
          </div>
          <div class="progress-panel">
            <span class="nowtime time" v-text="nowtime"></span>
              <div class="progress-bar-wrapper">
                <progress-bar :percent="percent" @percentchange="changePercent"></progress-bar>
              </div>
            <span class="duration time" v-text="endtime"></span>
          </div>
        </div>
        <div class="icon-play" 
          v-show="show" 
          @click.stop="togglePause">
          <i class="fa" :class="[this.pause ? 'fa-play-circle-o': 'fa-pause-circle-o']"></i></div>
      </div>
      
      <audio :src="currentSong.songlink"  autoplay="autoplay" @ended="end" ref="audio" @timeupdate="timeupdate"></audio>
  </div>
</template>
<script type="text/ecmascript-6">
  import ProgressBar from 'common/progress-bar/progress-bar'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    components:{
      ProgressBar
    },
    data() {
      return {
        show: true,
        pause: false,
        currentTime: 0
      }
    },
    methods: {
      end() {
        let index = this.currentIndex + 1
        if (!this.playlist[index]) {
          this.setPlayingFlag(false)
          this.$refs.audio.currentTime = 0
        }
      },
      toggleShow() {
        this.show = !this.show
      },
      togglePause() {
        this.pause = !this.pause
        this.setPlayingFlag(!this.pause)
        this.pause ? this.$refs.audio.pause() : this.$refs.audio.play()
      },
      timeupdate(e) {
        this.currentTime = e.target.currentTime
      },
      formatime(interval) {
        interval = Math.floor(interval)
        let m = Math.floor(interval / 60)
        let s = interval % 60
        return `${(''+m).padStart(2,'0')}:${(''+s).padStart(2,'0')}`
      },
      changePercent(percent) {
        const ctime = this.currentSong.interval * percent
        this.$refs.audio.currentTime = ctime
        if (!this.playing) {
          this.setPlayingFlag(true)
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
      ]),
      endtime() {
        return this.formatime(this.currentSong.interval)
      },
      nowtime() {
        return this.formatime(this.currentTime)
      },
      percent() {
        return this.currentTime / this.currentSong.interval
      }
    },
    watch: {
      playing(newVal) {
        this.$nextTick(() => {
          this.pause = !newVal
          this.pause ? this.$refs.audio.pause() : this.$refs.audio.play()
        })  
      }
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
        opacity: 0.5;
      }
    }
    .operator-panel{
      position: absolute;
      bottom: 0;
      height: 80px;
      width: 100%;
      background:-webkit-gradient(linear, 0 bottom, 0 0, from(rgba(0, 0, 0, 0.4)), to(transparent));
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