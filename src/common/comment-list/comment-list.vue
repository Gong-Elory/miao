<template>
  <div class="comment-wrapper">
    <h1>评论</h1>
    <ul class="coment-list">
      <li class="item" v-for="(item, index) in commentList">
        <div class="custom"><img :src="item.avatar" alt=""></div>
        <div class="comment-panel">
          <span class="name" v-text="item.name"></span>
          <span class="timestamp" v-text="item.timestamp"></span>
          <p class="cmment-detail" v-html="item.comment"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {ajax, tips, getSong, formatDate} from 'base/js/util'
  export default {
    data() {
      return {
        commentList: []
      }
    },
    props: {
      songid: {
        type: Number,
        default: -1
      }
    }
    watch: {
      songid() {
        ajax()
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
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
</style>