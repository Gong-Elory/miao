<template>
  <div class="search-box">
    <span class="serach-icon"><i class="fa fa-search"></i></span>
    <input type="text" placeholder="请输入歌手名/歌曲名" class="search-input" autocomplete="off" @focus="foucsSer" v-model="query"/>
    <span class="close-icon" v-show="query" @click="empty"><i class="fa fa-close"></i></span>
    <span class="cancle" v-show="isSearch" @click="backtoStore">取消</span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        query: '',
        isSearch: false
      }
    },
    created() {
      this.$watch('query', (newQuery) =>{
        this.throttle(this.emit, this, newQuery)
      })
    },
    methods: {
      emit(newQuery){
        this.$emit('query', newQuery)
      },
      foucsSer() {
        this.$router.push('/music/musicser')
        this.isSearch = true
      },
      backtoStore(){
        this.$router.push('/music')
        this.isSearch = false
        this.empty()
      },
      empty(){
        this.query = ''
      },
      throttle(method, context, query){
        clearTimeout(method.tid)
        method.tid = setTimeout(function(){
          method.call(context, query)
        }, 500)
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  @import '~base/style/variables.scss';
  .search-box{
    position: relative;
    width: 80%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    display: flex;
    .serach-icon{
      position: absolute;
      left: 10px;
      font-size: 12px;
      color: #bababa;
      margin-top: -1px;
    }
    .search-input{
      flex: 1;
      border-radius: 8px;
      border: none;
      outline: none;
      text-indent: 25px;
      height: 36px;
      margin-top: 2px;
      font-size: $font-size-medium;
    }
    .close-icon{
      display: inline-block;
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
      right: 40px;    
      color: #888;
      position: absolute;
      .fa{
        margin-top: 2px;
        margin-right: 10px;
      }
    }
    .cancle{
      font-size: 14px;
      color: #fff;
      margin-left: 5px;
    }
  }
</style>