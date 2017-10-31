<template>
  <div class="m-header tab">
    <router-link class="tab-item" to="/story">
      <span class="tab-link">故事</span>
    </router-link>
    <router-link class="tab-item" to="/music">
      <span class="tab-link">音乐</span>
    </router-link>
    <a class="player" @click.prevent.stop="setFullMusic" v-show="playlist.length">
      <i class="fa fa-music" :class="{active:playing}" aria-hidden="true"></i>
    </a>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'playing',
        'playlist'
      ])
    },
    methods: {
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN'
      }),
      setFullMusic() {
        this.setFullScreen(true)
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~base/style/variables.scss';

  @keyframes musicshake {
    0% {transform: rotate(20deg); color: white}
    25% {transform: rotate(10deg);}
    50% {transform: rotate(0deg);}
    75% {transform: rotate(-10deg);}
    100% {transform: rotate(-20deg); color: orange}
  }
  .m-header {
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: $default-color;
  }

  .tab {
    padding: 0 90px;
    display: flex;
    font-size: $font-size-large;
    .tab-item {
      flex: 1;
      text-align: center;
      color: $color-text-ll;
      font-weight: 500;
      &.router-link-active {
        color: $color-text;
        // font-weight: 700
      }
    }
    .player{
      position: absolute;
      right: 20px;
      color:#fff;
      .fa-music{
        &.active{
          animation: musicshake 1s infinite alternate;
        }
      }
    }
  }
</style>