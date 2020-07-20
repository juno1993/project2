<template>
  <btn
      v-if="socialKey.kakao.restapi_key!==''"
      :color="brandColor.white"
      :backgroundColor="{backgroundColor: 'rgb(251, 227, 0)'}"
      @clicked="kktLogin">
    <div class="flex-center">
      <img class="btn-img" src="/static/image/icon/ic_kakao.png">
      <div class="btn-txt">카카오톡 계정으로 로그인하기</div>
    </div>
  </btn>
</template>

<script>
  import Btn from "@/components/Common/Btn";
  export default {
    name: "BtnSigninKakao",
    components: {Btn},
    computed: {
      socialKey() {
        return this.$store.getters.social_key;
      }
    },

    methods: {
      kktLogin() {
        location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=%s&redirect_uri=%s&response_type=code'
          .format(this.socialKey.kakao.restapi_key, encodeURIComponent(this.socialKey.kakao.redirect_url));
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .btn-img
    width 28px
    height 28px
    margin-right 4px
  .btn-txt
    color rgb(59,30,30)
    font-size 14.25px
</style>