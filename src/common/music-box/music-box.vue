<template>
  <div class="music-panel">
    <div class="music-img" @click="playMusic(song, false, 'icon')">
      <img :src="song.songimage" height="70" width="70" alt="" class="music-icon" />
      <i class="fa" :class="[(playing && currentSong == song) ? 'fa-pause-circle-o' : 'fa-play-circle-o']"></i>
    </div>
    <div class="song-content" @click="playMusic(song, true, 'panel')">
      <p class="songName" v-html="song.songname"></p>
      <p class="singer" v-html="song.singer"></p>
    </div>
    <div class="like" @click="countNum(song, 'rate', 'youatti')">
      <i class="fa" :class="[song.youatti ? 'fa-heart' : 'fa-heart-o']"></i>
      <span class="like-num">{{song.rate | formatNum}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {playlistMixin, numOperate} from 'base/js/mixin'

  export default {
    mixins: [playlistMixin, numOperate],
    props: {
      song: {
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
        let songList = [];
        songList.push(song)
        this.selectPlay({
          list: songList,
          index: 0,
          isFullScreen: (fullScreen ? true : false)
        })
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
  .music-panel{
    display: flex;
    height: 70px;
    text-align: center;
    background-color: #fafafa;
    .music-img {
      flex: 0 0 70px;
      position: relative;
    }
    .like{
      flex: 0 0 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .like-num{
        color: #666;
        font-size: 12px;
      }
      .fa{
        padding-right: 2px;
      }
      .fa-heart{
        color: #f00;
      }
    }
    .fa-play-circle-o, .fa-pause-circle-o{
      position: absolute;
      bottom: 5px;
      right: 5px;
      color: #fff;
      font-size: 18px;
      font-weight: 100;

    }
    .song-content{
      margin-left: 10px;
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .songName {
        color: #000;
        font-size: $font-size-medium-x;
      }
      .singer{
        font-size: $font-size-medium;
        color: #666;
      }
    }
  }
</style>