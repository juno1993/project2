<template>
  <btn
      v-if="socialKey.facebook.client_id!==''"
      :color="brandColor.white"
      :backgroundColor="{backgroundColor: 'rgb(46, 69, 135)'}"
      @clicked="fbLogin">
    <div class="flex-center">
      <img class="btn-img" src="/static/image/icon/ic_facebook.png">
      <div class="btn-txt">페이스북 계정으로 로그인하기</div>
    </div>
  </btn>
</template>

<script>
  import Btn from "@/components/Common/Btn";
  export default {
    name: "BtnSigninFacebook",
    components: {Btn},
    computed: {
      socialKey() {
        return this.$store.getters.social_key;
      }
    },

    methods: {
      fbLogin() {
        location.href = 'https://www.facebook.com/v2.10/dialog/oauth?client_id=%s&redirect_uri=%s'
          .format(this.socialKey.facebook.client_id, encodeURIComponent(this.socialKey.facebook.redirect_url));
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
    color rgb(255, 255, 255)
    font-size 14.25px
</style>