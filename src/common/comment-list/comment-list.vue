<template>
  <div class="comment-wrapper">
    <h1>评论</h1>
    <ul class="coment-list">
      <li class="item" v-for="(item, index) in commentList">
        <div class="custom"><img :src="item.avatar" alt=""></div>
        <div class="comment-panel">
          <span class="name" v-text="item.name"></span>
          <span class="timestamp" v-text="formatTime(item.timestamp)"></span>
          <p class="cmment-detail" v-html="item.content"></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import {ajax, tips, getSong, formatDate} from 'base/js/util'
  import {MSG_OK} from 'base/js/config'
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
    },
    methods: {
      formatTime(item) {
        let time = formatDate(item)
        return time
      },
      _getCommentList() {
        ajax({
          method: 'get', 
          url: `/commentList?songid=${this.songid}`, 
          asyn: true
        }).then((comment) => {
          try{
            let o_comment = JSON.parse(comment)
            if (o_comment.status == MSG_OK) {
              this.commentList = o_comment.list
              this.$emit('hasCommentList', o_comment.list)
            }
          } catch(e) {
            tips(e)
          }
        })
      }
    },
    computed: {
      ...mapGetters([
        'currentSong'
      ])
    },
    watch: {
      currentSong() {
        this._getCommentList()
      },
      songid(newVal) {
        this._getCommentList()
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