export default {
  computed: {
    wrapperStyle() {
      return {
        marginTop: '50px'
      }
    },
  },
  mounted() {
    if(!this.isLogin && this.login_required) {
      this.$router.replace('login');
    }
  },
  data() {
    return {
      login_required: false
    }
  }
}
