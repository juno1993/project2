<template>
  <div class="flex-between" :style="headerStyle">
    <div class="header-left unselect" v-if="!full">
      <slot name="left"></slot>
    </div>
    <div class="header-center"
         :style="centerStyle"
         v-if="!full">
      <slot name="center"></slot>
    </div>
    <div class="header-right" v-if="!full">
      <slot name="right"></slot>
    </div>
    <div class="header-full" v-if="full">
      <slot name="full"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PageHeader",
    props: {
      full: {
        type: Boolean,
        default: false
      },
      styles: {
        type: Object,
        required: false,
        default: function() {
          return {
            container: {
              backgroundColor: '',
              color: '',
            }
          }
        }
      },
      // 기존 .header-center 클래스 에서 커스텀 가능
      centerStyle: {
        type: Object,
        required: false
      }
    },
    computed: {
      headerStyle() {
        let deco = {
          position: 'fixed',
          top: 0,
          zIndex: 10,
          width: '100%',
          backgroundColor: 'white'
        };
        return deco;
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    position fixed
    width 412px
    height 50px
    top 0
    z-index 10

  .header-left
  .header-right
    min-width 50px
    text-align center
    height 50px
    line-height 50px
    display flex
    align-items center
    justify-content center

  .header-center
    position absolute
    text-align center
    left 50%
    width 69%
    transform translateX(-50%)
    display flex
    justify-content center

  .header-full
    width 100%
    text-align center

  .header-center-ie
    top 28%

  // slot으로 들어온 요소 full로 차도록
  .header-left > .material-icons
  .header-left > i
  .header-left > div
  .header-left > span
  .header-left > img
  .header-center > .material-icons
  .header-center > i
  .header-center > div
  .header-center > span
  .header-center > img
  .header-right > .material-icons
  .header-right > i
  .header-right > div
  .header-right > span
  .header-right > img
    width 100%
    height 100%
    display flex
    justify-content center
    align-items center
  .header-left > .material-icons
  .header-center > .material-icons
  .header-right > .material-icons
    line-height 50px

  .header-left > i
  .header-center > i
  .header-right > i
    font-size 26px

  .header-center > .ellipsis
    display inline-block !important

</style>
