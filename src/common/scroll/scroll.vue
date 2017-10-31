<template>
    <div class="wrapper" ref="wrapper">
      <slot></slot>
    </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Loading from 'common/loading/loading'
  
  export default {
    mounted() {
      setTimeout(() => {
        this._initialScroll()
      }, 20)
    },
    props: {
      data: {
        type: Array,
        default: []
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
      },
      isRefresh: {
        type: Boolean,
        default: false
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
            this.$emit('pullingDown')
          })
        }
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
        this.$emit('hasInit')
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
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, 20)
      }
    }
  }
</script>