<template>
  <div class="music-store-wrapper">
    <div class="search-wraper-box">
      <search-box @query="query"></search-box>
    </div>
    <loading v-if="loading" title="正在获取前一天的榜单" class="loading"></loading>
    <loading v-if="!songList.length" class="first-load" title="正在获取的音乐榜单..."></loading>
    <scroll class="song-wraper" :data="songList" @pullingDown="refreshData" :pullDownRefresh="pullDownRefresh" ref='scroll' @scroll="scroll">
      <ul class="song-list">
        <li class="song-item" v-for="(item,index) in songList" @click="playMusic(item, true)">
          <div class="date-panel" v-if="item.tab" ref="tabitem">
            <span>{{item.date}}</span>
          </div>
          <div class="song-panel" v-if="!item.tab">
            <div class="song-pic">
              <img v-lazy="item.songimage" />
            </div>
            <div class="song-detail">
              <p class="name" v-text="item.songname"></p>
              <p class="singer" v-text="item.singer"></p>
            </div>
          </div>
        </li>
      </ul>
      <div class="fixed-date date-panel" v-show="!upRefresh" ref="fixedTit">
        <span>{{fixedDate}}</span>
      </div>
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
  import {mapActions, mapGetters, mapMutations} from 'vuex'

  const datas = {
    tpl: 3,
    page: 'detail',
    date: `${(new Date).getFullYear()}-${(new Date).getMonth() + 1}-${((new Date).getDate()-1 + '').padStart(2, '0')}`,
    topid: 4,
    type: 'top',
    song_begin: 0,
    song_num: 30,
    g_tk: 223580074,
    jsonpCallback: 'MusicJsonCallbacktoplist',
    loginUin: 1010688273,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  
  const MAX_NUM = 9999
  export default {
    data(){
      return {
        songList: [],
        nowIndex: 1,
        pullDownRefresh: {
          threshold: 50,
          stop: 30
        },
        loading: false,
        queryStr: '',
        fixedDate: datas.date,
        topList: [],
        upRefresh: false
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
          if(datas.date) {
            // console.log(datas.date)
            _this.fixedDate = datas.date
            formatedList.push({
              tab: true,
              date: datas.date
            })
          }
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
        datas.date = `${listDatenew.getFullYear()}-${listDatenew.getMonth() + 1}-${('' + listDatenew.getDate()).padStart(2, '0')}`
        this.formatSong()
      },
      scroll(pos) {
        if(pos.y > 50) {
          this.loading = true;
        }
        if(pos.y < 29) {
          this.loading = false;
        }
        
        if(pos.y >= 0) {
          this.upRefresh = true
        } else {
          this.upRefresh = false
        }

        for(var i=0; i< this.topList.length; i++) {
          var min = this.topList[i]['top']
          var max =this.topList[i+1] ? this.topList[i+1]['top'] : min + MAX_NUM
          var offset = pos.y + max
          if(Math.abs(offset) < 20 && Math.abs(offset) > 0) {
            this.$refs.fixedTit.style.top = `${offset - 20}px`
          }else{
            this.$refs.fixedTit.style.top = `0`
          }
          if( -pos.y > min && -pos.y < max) {
            return this.fixedDate = this.topList[i]['date']
          }
          
        }

      },
      ...mapActions([
        'selectPlay'
      ]),
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
        'palylist',
        'sequenceList',
        'currentSong'
      ])
    },
    watch: {
      songList() {
        setTimeout(() => {
          let tmp = []
          this.$refs.tabitem.forEach((item) => {
            tmp.push({
              top:item.offsetTop,
              date: item.innerText
            })
          })
          this.topList = tmp
        }, 20)
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
      top: 40px;
    }
    .search-wraper-box{
      height: 40px;
      width: 100%;
      background-color: rgba(32, 206, 197, 1);
    }
    .song-wraper{
      height: calc(100% - 40px);
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .fixed-date{
        position: absolute;
        top: 0;
        background-color: #fff;
        width: 100%;
        border-bottom: 1px solid #f5f5f5;
    }
    .date-panel{
      font-size: 12px;
      color: #00BCD4;
      height: 20px;
      line-height: 20px;
    }
    .song-list{
      background-color: #fff;
      padding: 0 5px;
      .song-item + .song-item{
        border-top: 1px solid #f5f5f5;
      }
      .song-panel{
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