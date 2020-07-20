<template>
  <div style="margin: 24px 0">
    <btn-login-kakao style="margin-bottom:12px"></btn-login-kakao>
    <btn-login-facebook style="margin-bottom:12px"></btn-login-facebook>
    <btn-login-naver></btn-login-naver>
  </div>
</template>

<script>
  import BtnLoginKakao from "../Button/BtnLoginKakao";
  import BtnLoginFacebook from "../Button/BtnLoginFacebook";
  import BtnLoginNaver from "../Button/BtnLoginNaver";
  export default {
    name: "CSnsLogin",
    mixins: [
    ],
    props: {
      startPage: {
        type: String,
        default: 'home'
      }
    },
    components: {BtnLoginNaver, BtnLoginFacebook, BtnLoginKakao},
    created() {
      if (this.$route.query.user_id !== undefined) {
        this.$axios.post('auth/user/login/social', {
          username: this.$route.query.user_id,
          password: '',
          token: this.$route.query.token
        }).then(res => {
          if(res.data.user) {
            this.$store.commit('setUser', res.data.user);
          }
          this.setAuthHeader();
          //this.$router.back();
          this.$router.replace(this.startPage);
        });
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
