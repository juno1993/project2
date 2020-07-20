
export default {
  data() {
    return {
      pc_content: 640,
      btn_floating_offset: 0
    }
  },

  computed: {
    pc_max() {
      return '1200px';
    },
    pcMaxWidth() {
      return {
        width: this.pc_max + 'px',
      }
    },
    pcContentWidth() {
      return {
        width: this.pc_content + 'px'
      }
    },
    pcContentPadding() {
      return {
        paddingLeft: '20px',
        paddingRight: '20px'
      }
    },
    pcNavWidth() {
      return {
        width: `${(this.pc_max - this.pc_content) / 2}px`
      }
    },

  }
}
