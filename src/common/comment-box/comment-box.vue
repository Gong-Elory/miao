<template>
  <div class="comment-box">
    <input type="text" class="inpuBtn" placeholder="发表评论..." />
  </div>
</template>
<script type="text/ecmascript-6">

</script>
<style lang="scss" scoped rel="stylesheet/scss">

  @import '~base/style/variables.scss';
  .comment-box{
    height: 30px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #ddd;
    background-color: #f0f0f0;
    .inpuBtn{
      display: inline-block;
      width: 90%;
      border-radius: 5px;
      outline: none;
      border: 1px solid #d5d5d5;
      height: 21px;
      margin-top: 4px;
      text-indent: 10px;
    }
  }
</style>