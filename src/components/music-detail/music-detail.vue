<template>
  <scroll class="music-detail-wrapper" :data="happy" v-show="fullScreen" ref="scroll">
    <div>
      <div class="head-operator">
        <div class="back"><i class="fa fa-chevron-left"></i></div>
        <h1 class="title">追光者</h1>
      </div>
      <div class="music-wrapper">
        <div class="music-content">
          <player></player>
          <div class="singer-detail">
            <div class="avatar">
              <img src="http://q.qlogo.cn/qqapp/101426977/DE9EEE7D0F09FFEB5FF2FA4232D7AF7A/40" height="40" width="40" alt="" class="singer-avator">
            </div>
            <div class="singer-intro">
              <span class="name">薛之谦</span>
            </div>
          </div>
        </div>
        
      </div>  
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import Scroll from 'common/scroll/scroll'
  import Player from 'components/player/player'
  import {mapGetters, mapMutations} from 'vuex'
  export default {
    components: {
      Scroll,
      Player
    },
    data() {
      return {
        happy: []
      }
    },
    mounted() {
      setTimeout(() => {
        this.happy = [1,2,3]
      }, 3000)
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
    },
    watch: {
      fullScreen(newVal) {
        if(newVal) {

          setTimeout(() => {
            this.$refs.scroll.refresh()
          }, 20)
        }
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
  .music-detail-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: $music-detail;
    background-color: $default-background-color;
    overflow: hidden;
  }
  .head-operator{
    position: fixed;
    z-index: $head-operator;
    width: 100%;
    .back{
      position: absolute;
      left: 10px;
      top: 7px;
      .fa-chevron-left{
        color: #fff;
        font-size: 20px;
      }
    }
    .title{
      width: 100%;
      text-align: center;
      color: #fff;
      font-size: 16px;
      height: 30px;
      line-height: 30px;
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
</style>