<template>
  <div class="loading">
    <img src="./loading.gif" height="30" width="30" alt="">
    <p class="desc" v-text="title"></p>
  </div>
</template>
<style scoped ref="stylesheet/scss" lang="scss">
  @import "~base/style/variables";
  .loading{
    width: 100%;
    text-align: center;
    .desc{
      line-height: 20px;
      font-size: $font-size-small;
      color: #333;
    }
  }
    
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>