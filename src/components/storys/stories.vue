<template>
  <div class="story-panel">
    <loading v-if="loading" title="更新动态..." class="loading"></loading>
    <scroll :pullDownRefresh="pullDownRefresh" @pullingDown="refreshData" :data="newStory" class="story-wrapper" @scroll="scroll" 
    :isRefresh="isRefresh"  ref="scroll">
      <ul class="story-list">
        <li class="item" v-for="(item, index) in contentList">
          <div class="content-wrapper">
            <div class="author-desc">
              <img :src="item.avator" height="40" width="40" alt="" class="avator"/>
              <span class="name" v-text="item.author"></span>
              <span class="timestamp" v-text="item.timestamp">昨天 21:20</span>
            </div>
            <div class="comment-wrapper">
              <p class="comment" v-html="item.comment"></p>
            </div>
            <div class="music-panel">
              <div class="music-img">
                <img :src="item.song.songimage" height="60" width="60" alt="" class="music-icon" />
                <i class="fa fa-play-circle-o"></i>
              </div>
              <div class="song-content">
                <p class="songName" v-html="item.song.songname"></p>
                <p class="singer" v-html="item.song.singer"></p>
              </div>
              <div class="like">
                <i class="fa" :class="[item.song.youatti ? 'fa-heart-o' : 'fa-heart']"></i>
                <span class="like-num" v-html="item.song.rate"></span>
              </div>
            </div>
            <div class="operator">
              <span><i class="fa fa-thumbs-o-up"></i>点赞</span>
              <span><i class="fa fa-commenting-o"></i>评论</span>
              <span><i class="fa fa fa-share-square-o"></i>转发</span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
  </div>
  
</template>
<script type="text/ecmascript-6">
  import Scroll from 'common/scroll/scroll'
  import {ajax, tips, getSong, formatDate} from 'base/js/util'
  import Loading from 'common/loading/loading'
  import axios from 'axios'
  import {MSG_OK} from 'base/js/config'

  let link = {
    url: '/getStoryList/1',
    method: 'get',
    asyn: true,
    type: 'json',
    params: {
      num: 1
    }
  }

  export default {
    data() {
      return {
        pullDownRefresh: {
          threshold: 60,
          stop: 30
        },
        loading: false,
        contentList: [],
        maxIndex: 0,
        nowIndex: 1,
        isRefresh: false
      }
    },
    created() {
      this._getStoryData()
    },
    components: {
      Scroll,
      Loading
    },
    methods: {
      refreshData() {
        if (link) {
          if (this.nowIndex++) {
            link.url = `/getStoryList/${this.nowIndex}`
            this._getStoryData()
          }    
        }
      },
      scroll(pos) {
        if(pos.y > 50) {
          this.loading = true;
        }
      },
      _formatStory(newData) {
        if(newData.status === MSG_OK) {
          newData.data.list.forEach((item) => {
            item.timestamp = formatDate(item.timestamp)
            if(item.song instanceof Object) {
              item.song = getSong(item.song)
            }
          })
          this.contentList = newData.data.list.concat(this.contentList)
        }  
      },
      _getStoryData() {

        setTimeout(() => {
          ajax(link).then(newData => {
            /* 如果有数据传回来则可以回弹到顶部 */
            try {
              this._formatStory(JSON.parse(newData))
              this.loading = false;
            } catch (e) {
              tips("出错误啦！,请刷新一下")
            }
          }).catch(error => {
            tips(error)
          })
          this.isRefresh && this.$refs.scroll.scroll.finishPullDown()
          if (!this.isRefresh) {
            this.isRefresh = true
          }
        }, 2000)
        
      }
    },
    computed: {
      newStory() {
        return this.contentList
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~base/style/variables.scss';
  .loading {
    position: absolute;
    top: 40px;
  }
  .story-wrapper{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .story-panel{
    overflow: hidden;
    width: 100%;
    height: calc(100% - 40px);
  }

  .item{
    padding: 10px;
    margin-bottom: 10px;
    background-color: $color-text;
    .content-wrapper{
      display: flex;
      flex-direction: column;
      .author-desc{
        position: relative;
        display: flex;
        align-items: center;
        .timestamp{
          position: absolute;
          right: 10px;
          font-size: $font-size-small;
        }
        .avator{
          border-radius: 50%;
        }
        .name{
          margin-left: 8px;
          color: #000;
        }
      }
      .comment-wrapper {
        color: #000;
        .comment {
          color: #000;
          margin-top: 6px;
          margin-bottom: 6px;
          text-align: left;
          font-size: $font-size-medium-x;
          line-height: 1.5em;
        }
      }
      .music-panel{
        display: flex;
        height: 60px;
        text-align: center;
        background-color: #fafafa;
        .music-img {
          flex: 0 0 60px;
          position: relative;
        }
        .like{
          flex: 0 0 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          .like-num{
            color: #666;
            font-size: 14px;
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
      .operator{
        margin-top: 10px;
        display: flex;
        span{
          flex: 1;
          font-size: 14px;
          line-height: 1.5em; 
          .fa{
            margin-right: 5px;
          }
        }
      }
    }
  }

</style>