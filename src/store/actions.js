import * as types from './mutations-type'
export const selectPlay = function({commit, state}, {list, index, isFullScreen}) {
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_PLAYING, true)
  commit(types.SET_FULLSCREEN, isFullScreen)
  commit(types.SET_CURRENT_INDEX, index)
}