<template>
    <div class="wrapper" ref="wrapper">
      <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  export default {
    import BScroll from 'better-scroll'
    import {ajax} from 'base/js/util'
    mounted() {
      this.$nextTick(() => {
        _initialScroll()
      })
    },
    props: {
      data: {
        type: Array,
        default: false
      },
      click: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 1
      },
      pullDownRefresh: {
        type: Object,
        default: null
      },
      interface: {
        type: String,
        default: ''
      }

    },
    methods: {
      _initialScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          pullDownRefresh: this.pullDownRefresh
        })
        
        if (this.pullDownRefresh) {
          this.scroll.on('pullingDown', ()=> {
            /* 下拉刷新获取数据 */
            this._RefreshData().then((newData) => {
              this.$emit('pullingDown', newData)
            })
          })
        }

      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      _RefreshData() {
        if (this.interface) {
          ajax(this.interface)
        }
      }
    },
    watch: {
      data() {
        this.$nextTick(() => {
          this.refresh()
        })
      }
    }
  }
</script>