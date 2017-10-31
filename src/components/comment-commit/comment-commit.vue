<template>
  <transition name="commit">
    <div class="commit-wrapper">
      <div class="head-operator" ref="opr">
        <div class="back"><i class="fa fa-chevron-left" @click="back"></i></div>
        <h1 class="title">写评论</h1>
        <span class="commit-btn" @click="commitComment">发表</span>
      </div>
      <div class="commit-panel">
        <div class="operate-panel">
          <textarea class="cmment" v-model="commentValue"></textarea>
          <div class="music-wrapper">
            <music-box :song="currentSong"></music-box>
          </div>
        </div>
      </div>
    </div>
  </transition>
  
</template>
<script type="text/ecmascript-6">
  import {ajax} from 'base/js/util'
  import {playlistMixin, numOperate} from 'base/js/mixin'
  import MusicBox from 'common/music-box/music-box'
  import {Toast} from 'mint-ui'
  import Bus from 'base/js/eventbus'

  export default {
    mixins: [playlistMixin, numOperate],
    data() {
      return {
        commentValue: ''
      }
    },
    methods: {
      back() {
        this.$router.back()
      },
      commitComment() {
        // TODO 提交请求
        console.log(this.commentValue)
        
        Toast({
          message: `发表成功`,
          position: 'middle',
          duration: 1000,
        });
        setTimeout(() => {
          this.commentValue = ''
          Bus.$emit('updateComentList')
          this.$router.back()
        },1000)

      }
    },
    components: {
      MusicBox
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
  .commit-enter-active, .commit-leave-active {
    transition: all 0.4s
  }
  .commit-enter, .commit-leave-to{
    transform: translate3d(100%, 0, 0)
  }
  .commit-wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 300
  }
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
      .commit-btn{
        position: absolute;
        right: 10px;
        color: #fff;
        top: 10px;
        font-size: $font-size-medium-x;
      }
  }
  .commit-panel{
    
    background-color: #f5f5f5;
    height: 100%;
    margin-top: 40px;
    .operate-panel{
      background-color: #fff;
      position: relative;
    }
    .cmment{
      width: 100%;
      height: 150px;
      border: none;
      resize: none;
      outline: none;
      padding: 10px;
      color: #333;
      font-size: $font-size-medium-x;
      margin-bottom: 80px;
    }
  }
  .music-wrapper{
    padding: 5px 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    .music-panel{
      box-sizing: content-box;
      border: 1px solid #d8d8d8;
    }
  }
</style>