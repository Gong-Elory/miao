<template>
 <div class="search-result-wrapper">
    <scroll :data="queryResult" class="wrapper">
      <ul class="result-list">
        <li class="result-item" v-show="person.id">
          <img :src="person.icon" width="40" height="40" class="person-icon" />
          <h6 class="person-tit" v-text='person.name'></h6>
        </li>
        <li class="result-item" v-for="(item, index) in queryResult" @click="playMusic(item, true)">
          <i class="icon fa fa-music"></i>
          <h6 class="main-tit" v-html='item.songname'></h6>
          <p class="sub-tit" v-html='item.singer'></p>
        </li>
      </ul>
    </scroll>
 </div>
</template>
<script type="text-ecmascript-6">
  import SearchBox from 'common/search-box/search-box'
  import Scroll from 'common/scroll/scroll'
  import axios from 'axios'
  import Loading from 'common/loading/loading'
  import {JSONP, ajax, getSong} from 'base/js/util'
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  const params = {
    g_tk: 5381,
    uin: 0,
    format: 'json',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: 1,
    remoteplace: 'txt.mqq.all',
    _: 1509283020600,
    callback: '?'
  }

  export default {
    components: {
      Scroll
    },
    data(){
      return {
        queryResult: [],
        person: {}
      }
    },
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    methods: {
      search(newVal) {
        params.w = newVal
        axios.get('/getSearchResult',{
          params: params
        }).then((res) => {
          let list = res.data.data
          this.formatList(list)
        })
      },
      formatList(list){
        let showList = []
        let tmpperson = {}
        if(list.zhida.singername) {
          let zd = list.zhida
          
          tmpperson.icon = `https://y.gtimg.cn/music/photo_new/T001R68x68M000${zd.singermid}.jpg?max_age=2592000`
          tmpperson.name = zd.singername
          tmpperson.id = zd.singerid
          tmpperson.songnum = zd.songnum
        }
        let songli = list.song.list

        for( let i in songli) {
          var dirtySong = songli[i]
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
            showList.push(song)
        }
        if (tmpperson.id) {
          this.person = tmpperson
        }
        this.queryResult = showList
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
    watch: {
      query(newVal) {
        
        if(newVal) {
          this.search(newVal)
        } else {
          this.person = {}
          this.queryResult = []
        }
      }
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
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "~base/style/variables.scss";

  .search-result-wrapper{
    position: absolute;
    top: 30px;
    bottom: 0px;
    width: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  .wrapper{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .result-list{
    .result-item{
      position: relative;
      height: 55px;
      padding-left: 56px;
      overflow: hidden;
      .icon{
        position: absolute;
        top: 18px;
        left: 16px;
        width: 22px;
        height: 20px;
        font-size: 20px;
        color: #bababa;
      }
      .main-tit, .sub-tit{
        text-align: left;
      }
      .main-tit{
        color: #000;
        font-size: 14px;
        margin-top: 10px;
      }
      .sub-tit{
        color: #808080;
        font-size: 12px;
      }
      .person-tit{
        height:55px;
        line-height: 55px;
        text-align: left;
      }
      .person-icon{
        position: absolute;
        left: 7px;
        top: 7px;
        border-radius: 50%;
      }
    }
  }
</style>