/*
* @Author: Elory
* @Date:   2017-10-30 17:19:31
* @Last Modified by:   Elory
* @Last Modified time: 2017-10-30 22:44:12
*/
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {outNum, isEmpty} from 'base/js/util'
export const playlistMixin = {
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
  methods: {
    ...mapMutations({
      setPlayingFlag: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRETN_INDEX',
      setPlayList: 'SET_PLAYLIST',
      setSequenceList: 'SET_SEQUENCE_LIST',
      setFullScreen: 'SET_FULLSCREEN',
      setCurrentSong:'SET_CURRENT_SONG'
    }),
    ...mapActions([
      'selectPlay'
    ]),
  }
};

export const numOperate = {
  methods: {
    /**
     * [countNum 修改数量]
     * @param  {[object]} item  [选中的项]
     * @param  {[number]} count [当前数]
     * @param  {[boolean]} flag  [是否已经选中]
     * @return {[type]}       [description]
     */
    countNum(item, count, flag){
      if(item[flag]) {
        if(item == this.currentSong) {
          var tmp = {}
          tmp[flag] = false
          tmp[count] = item[count]-1
          this.setCurrentSong(tmp)
        } else {
          item[flag] = false
          item[count] --
        }
        
        // TODO 请求修改后端数据
      } else {
        if(item == this.currentSong) {
          var tmp = {}
          tmp[flag] = true
          tmp[count] = item[count] + 1
          this.setCurrentSong(tmp)
        } else {
          item[flag] = true
          item[count] ++
        }
        // TODO 请求修改后端数据
      }   
    }
  },
  filters: {
    formatNum(num) {
      return outNum(num)
    }
  }
};