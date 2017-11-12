<template>
  <div class="story-panel">
    <loading v-show="isload" title="更新动态..." class="loading"></loading>
    <loading v-if="!contentList.length" title="正在加载..." class="first-load"></loading>
    <scroll :pullDownRefresh="pullDownRefresh" @pullingDown="refreshData" :data="contentList" class="story-wrapper"  
    :isRefresh="isRefresh"  ref="scroll" @scroll="scroll">
      <ul class="story-list">
        <li class="item" v-for="(item, index) in contentList">
          <div class="content-wrapper">
            <div class="author-desc">
              <img :src="item.avator" height="40" width="40" alt="" class="avator"/>
              <span class="name" v-text="item.author"></span>
              <span class="timestamp" v-text="item.timestamp"></span>
            </div>
            <div class="comment-wrapper">
              <p class="comment" v-html="item.comment"></p>
            </div>
            <music-box :song="item.song" ref="musicbox"></music-box>
            <div class="operator">
              <span><i class="fa fa-like" @click="countNum(item, 'zanNum', 'hasZan')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path :fill="item.hasZan ? 'red' : 'gray'" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg>
              </i>{{item.zanNum | formatNum}}</span>
              <span @click="gotoComment(item)"><i class="fa fa-diy-comment"></i>{{item.commentNum | formatNum}}</span>
              <span><i class="fa fa-diy-share"></i>{{item.shareNum | formatNum}}</span>
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view :story="nowStory"></router-view>
  </div>
  
</template>
<script type="text/ecmascript-6">
  import Scroll from 'common/scroll/scroll'
  import {ajax, tips, getSong, formatDate, outNum, isEmpty, Store} from 'base/js/util'
  import Loading from 'common/loading/loading'
  import {MSG_OK} from 'base/js/config'
  import {playlistMixin, numOperate} from 'base/js/mixin'
  import Vue from 'vue'
  import {Toast} from 'mint-ui'
  import MusicBox from 'common/music-box/music-box'

  Vue.component(Toast.name, Toast)

  let link = {
    url: '/getStoryList/1',
    method: 'get',
    asyn: true,
    type: 'text',
    params: {
      num: 1
    }
  }

  export default {
    mixins: [playlistMixin, numOperate],
    data() {
      return {
        pullDownRefresh: {
          threshold: 50,
          stop: 30
        },
        isload: false,
        contentList: [],
        maxIndex: 0,
        nowIndex: 1,
        isRefresh: false,
        nowStory: {}
      }
    },
    created() {
      if(Store.getItem('stories')){
        let contentcache = Store.getItem('stories')
        this.contentList = JSON.parse(contentcache)
      }
      this._getStoryData()
      
    },
    beforeDestroy() {
      Store.setItem('stories',JSON.stringify(this.contentList))
    },
    components: {
      Scroll,
      Loading,
      MusicBox
    },
    methods: {
      gotoComment(item) {
        this.nowStory = item
        this.$router.push(`/story/detail/${item.mid}`)
      },
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
          this.isload = true;
        } else if(pos.y < 30) {
          this.isload = false;
        }
      },
      _formatStory(list) {
          list.forEach((item) => {
            item.timestamp = formatDate(item.timestamp)
            if(item.song instanceof Object) {
              item.song = getSong(item.song)
            }
          })
          this.contentList = list.concat(this.contentList)
      },
      _getStoryData() {
        setTimeout(() =>{
          ajax(link).then(newData => {
            /* 如果有数据传回来则可以回弹到顶部 */
            try {
              let data = JSON.parse(newData)
              if(data.status === MSG_OK) {
                this._formatStory(data.data.list)
                console.log(this)
                  Toast({
                  message: `已更新${data.data.list.length}条动态`,
                  position: 'top',
                  duration: 1000,
                  context: this.$el
                });
                this.isload = false
              } else {
                Toast({
                  message: `请求错误`,
                  position: 'top',
                  duration: 1000,
                  context: this.$el
                });
              }
            } catch (e) {
              console.log(e)
              Toast({
                message: `出错啦，请重新刷新一下`,
                position: 'top',
                duration: 1000,
                context: this.$el
              });
            }
          }).catch(error => {
            Toast({
              message: `已经是最新动态了`,
              position: 'top',
              duration: 1500,
              context: this.$el
            });
          })
          this.isRefresh && this.$refs.scroll.scroll.finishPullDown()
          if (!this.isRefresh) {
            this.isRefresh = true
          }
        }, 2000)
      }
    }
  }
</script>
<style lang="scss"  rel="stylesheet/scss">
  @import '~base/style/variables.scss';
  @import '~base/style/common.scss';
  .loading {
    position: absolute;
  }
  .story-wrapper{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .story-panel{
    position: fixed;
    top: 40px;
    bottom: 0;
    width: 100%;
  }

  .item{
    padding: 10px;
    margin-bottom: 10px;
    background-color: $color-text;
  }
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
          color: #666;
          height: 40px;
          line-height: 40px;
          font-size: $font-size-small;
        }
        .avator{
          border-radius: 50%;
        }
        .name{
          font-size: 16px;
          margin-left: 8px;
          color: #000;
        }
      }
      .comment-wrapper {
        .comment {
          color: #333;
          margin-top: 6px;
          margin-bottom: 6px;
          text-align: left;
          font-size: 16px;
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
            font-size: $font-size-medium;
          }
          .singer{
            font-size: $font-size-small;
            color: #666;
          }
        }
      }
      .operator{
        margin-top: 10px;
        display: flex;
        span{
          flex: 1;
          font-size: 12px;
          line-height: 1.5em; 
          color: #666;
          .fa{
            margin-right: 5px;
            display: inline-block;
            width: 13px;
            height: 13px;
          }
          .fa-like{
            vertical-align: -1px;
          }
          .fa-diy-comment, .fa-diy-share{
            background-image: -webkit-image-set(url(http://y.gtimg.cn/mediastyle/kge_v3/image/sprite_icon@2x.png?max_age=2592000&v=22f4f89f8ad19c71a9dfdbced99aa4e0) 2x);
            vertical-align: -2px;
            overflow: hidden;
            text-indent: -999px;
          }
          .fa-diy-comment{
            background-position: -14px -225px;
          }
          .fa-diy-share{
           background-position: -82px -195px;
          }
        }
      }
  }

</style>