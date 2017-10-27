import * as types from './mutations-type'

const mutaions = {
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_PLAYING](state, flag) {
    state.playing = flag
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  }
}

export default mutaions