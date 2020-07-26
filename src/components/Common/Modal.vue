<template>
  <div class="modal-wrapper">
    <!-- Header -->
    <div class="modal-header">
      <slot name="header"></slot>
    </div>

    <!-- Content -->
    <div class="modal-content">
      <slot name="content"></slot>
    </div>

    <!-- Bottom -->
    <div class="modal-bottom">
      <div v-if="cancel" class="unselect" :style="cancelStyle" @click.stop.prevent="$emit('cancel')">취소</div>
      <div class="unselect" :style="confirmStyle" @click.stop.prevent="$emit('confirm')">확인</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "modal",
    props: {
      cancel: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      cancelStyle() {
        let deco = {
          color: '#393e46',
          backgroundColor: '#f7f7f7',
          padding: '12px 24px',
          margin: '0 4px',
          borderRadius: this.radius.borderRadius,
          cursor: 'pointer',
          textAlign: 'center'
        };
        return deco;
      },
      confirmStyle() {
        let deco = {
          color: 'white',
          backgroundColor: this.brandColor.brand.color,
          padding: '12px 24px',
          margin: '0 4px',
          borderRadius: this.radius.borderRadius,
          cursor: 'pointer',
          textAlign: 'center'
        };
        if(!this.cancel)
          deco.width = '100%';
        return deco;
      }
    }
  }
</script>

<style type="stylus" lang="stylus" scoped>
  .modal-wrapper
    padding 0

  .modal-header
    color #777
    font-size 20px !important

  .modal-content
    color: #555
    font-size 15px !important
    margin 24px 0

  .modal-bottom
    margin-top 56px
    display flex
    justify-content flex-end





</style>
