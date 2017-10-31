<template>
  <div class="comment-box" ref="cmtpanel">
    <input type="text" class="inpuBtn"  v-model="comment" placeholder="发表评论..." />
    <span class="cmtBtn" @click="commit" >评论</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        comment: ''
      }
    },
    methods: {
      commit() {
        this.comment = ''
        this.$emit('commitComment')
      }
    },
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
  .comment-box{
    height: 50px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #ddd;
    background-color: #f0f0f0;
    display: flex;
    .inpuBtn{
      display: inline-block;
      flex: 1;
      margin: 0 5px;
      border-radius: 5px;
      outline: none;
      border: none;
      border: 1px solid #d5d5d5;
      height: 38px;
      margin-top: 5px;
      text-indent: 10px;
      font-size: $font-size-medium;
      -webkit-appearance: none;
    }
    .cmtBtn{
      flex: 0 0 60px;
      background-color: $default-color;
      height: 36px;
      margin-top: 5px;
      margin-right: 5px;
      color: #fff;
      border-radius: 5px;
      line-height: 36px;
    }
  }
</style>