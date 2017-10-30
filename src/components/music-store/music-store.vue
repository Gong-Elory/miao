<template>
  <div class="music-store-wrapper">
    <div class="search-wraper-box">
      <search-box @query="query"></search-box>
    </div>
    <loading v-if="loading" title="正在获取前一天的榜单" class="loading"></loading>
    <scroll class="song-wraper" :data="songList" @pullingDown="refreshData" :pullDownRefresh="pullDownRefresh" ref='scroll' @scroll="scroll">
      <ul class="song-list">
        <li class="song-item" v-for="(item,index) in songList" @click="playMusic(item, true)">
          <div class="song-pic">
            <img :src="item.songimage" />
          </div>
          <div class="song-detail">
            <p class="name" v-text="item.songname"></p>
            <p class="singer" v-text="item.singer"></p>
            <!-- <p class="desc" v-text="item.desc" v-show="item.desc"></p> -->
          </div>
        </li>
      </ul>
    </scroll>
    <router-view :query='queryStr'></router-view>
  </div>
</template>
<script type="text-ecmascript-6">
  import SearchBox from 'common/search-box/search-box'
  import Scroll from 'common/scroll/scroll'
  import axios from 'axios'
  import Loading from 'common/loading/loading'
  import {getSong} from 'base/js/util'
  import {playlistMixin} from 'base/js/mixin'  

  const datas = {
    tpl: 3,
    page: 'detail',
    date: `${(new Date).getFullYear()}-${(new Date).getMonth() + 1}-${(new Date).getDate()-1}`,
    topid: 4,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    g_tk: 223580074,
    jsonpCallback: 'MusicJsonCallbacktoplist',
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }

  export default {
    mixins: [playlistMixin],
    data(){
      return {
        songList: [],
        nowIndex: 1,
        pullDownRefresh: {
          threshold: 60,
          stop: 30
        },
        loading: false,
        queryStr: ''
      }
    },
    components: {
      SearchBox,
      Scroll,
      Loading
    },
    mounted() {
      this.formatSong()
    },
    methods: {
      query(queryRes){
        this.queryStr = queryRes
      },
      formatSong(){
        let  _this = this
        this.getTopList().then(function(res){
          var songli = res.data.songlist
          var formatedList = []
          for(var i in songli){
            var dirtySong = songli[i].data
            var song = getSong({
              songname: dirtySong.songname,
              songid: dirtySong.songid,
              picis: dirtySong.albummid,
              like: dirtySong.msgid,
              youlike: false,
              singer: dirtySong.singer[0].name,
              interval: dirtySong.interval,
              desc: dirtySong.albumdesc
            })
            formatedList.push(song)
          }
          _this.songList = formatedList.concat(_this.songList)
          _this.$refs.scroll.scroll.finishPullDown()
          _this.loading = false
        })
      },
      getTopList(){
        return axios.get('/getTopList',{
          params: datas
        }).then((res) => {
          return Promise.resolve(res)
        })
      },
      playMusic(song, fullScreen) {
        if(this.currentSong == song) {
          if(fullScreen) {
            this.setFullScreen(true)
          }
          return
        }
        this.nowPlay = song;
        let songtmpList = [];
        songtmpList.push(song)
        this.selectPlay({
          list: songtmpList,
          index: 0,
          isFullScreen: (fullScreen ? true : false)
        })
      },
      refreshData(){
        this.nowIndex ++
        let listDatenew = new Date(Date.now() - 86400000 * this.nowIndex)
        datas.date = `${listDatenew.getFullYear()}-${listDatenew.getMonth() + 1}-${listDatenew.getDate()}`
        this.formatSong()
      },
      scroll(pos) {
        if(pos.y > 50) {
          this.loading = true;
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "~base/style/variables.scss";

  .music-store-wrapper{
    position: fixed;
    top: 40px;
    bottom: 0;
    width: 100%;
    .loading{
      position: absolute;
      top: 30px;
    }
    .search-wraper-box{
      height: 30px;
      width: 100%;
      background-color: rgba(32, 206, 197, 1);
    }
    .song-wraper{
      height: calc(100% - 30px);
      width: 100%;
      overflow: hidden;
    }
    .song-list{
      background-color: #fff;
      padding: 0 5px;
      .song-item + .song-item{
        border-top: 1px solid #f5f5f5;
      }
      .song-item{
        box-sizing: content-box;
        height: 50px;
        padding: 5px 0;
        overflow: hidden;
        .song-pic{
          width: 50px;
          height: 50px;
          float: left;
          margin-right: 10px;
        }
        .song-detail{
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          font-size: 14px;
          .singer{
            font-size: 12px;
          }
          .name,.singer{
            text-align: left;
            overflow: hidden;
            width: 100%;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #5f5f5f;
          }
        }
      }
    }
  }
</style>