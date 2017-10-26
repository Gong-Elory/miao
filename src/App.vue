<template>
  <div id="app">
    <common-header></common-header>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import CommonHeader from 'components/common_header/common_header'
export default {
  name: 'app',
  components: {
    CommonHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
}
</style>
