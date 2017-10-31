<template>
  <div id="app">
    <common-header></common-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <music-detail></music-detail>
  </div>
</template>

<script type="text/ecmascript-6">
import CommonHeader from 'components/common_header/common_header'
import MusicDetail from 'components/music-detail/music-detail'
export default {
  name: 'app',
  components: {
    CommonHeader,
    MusicDetail
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "~base/style/common.scss";
#app {
  font-family: FZLTXIHJW--GB1-0, "hiragino sans gb", "Microsoft YaHei", "Helvetica Neue", Helvetica, STHeiTi, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  background-color: #f5f5f5;
}
</style>
