<template>
  <div class="mobile-wrapper">
    <page-header>
      <i class="material-icons header-icon" slot="left">home</i>
      <span class="header-title" slot="center">착한중고</span>
    </page-header>
    <div :style="[pagePadding]" v-if="user.id">
      <c-input-text label="이름" :value.sync="user.name"></c-input-text>
      <c-input-text label="아이디" :value.sync="user.username" :disabled="true"></c-input-text>
      <div></div>
      <div style="margin-bottom: 12px">프로필 이미지</div>
      <input-img :url.sync="user.profile" style="margin-top:12px"></input-img>
      <div class="btn-save" @click="updateInfo">저장</div>
    </div>
  </div>
</template>

<script>
  import InputImg from "../components/module/common/InputImg";
  import PageHeader from "../components/Common/PageHeader";
  import PageMixin from "../mixins/mobile/PageMixin";
  import CInputText from "../components/Form/CInputText";

  export default {
    name: "Profile",
    components: {CInputText, InputImg, PageHeader},
    mixins: [
      PageMixin
    ],
    created() {
      this.login_required = true;
    },
    computed: {
      // user() {
      //   return this.$store.getters.user;
      // }
    },
    methods: {
      setUserData(data) {
        if (data.user) {
          this.$store.commit('setUser', data.user);
        }
      },
      // 내 정보 수정 api
      updateInfo() {
        this.$axios.patch(`user/${this.user.id}`,
          this.user).then(res => {
          if (res.status === 200) {
            this.toast('내 정보가 변경되었습니다.');
            this.setUserData(res.data);
            this.$router.replace('mypage');
          }
        }).catch(err => {
          if (!err.response.data.message)
            this.toast(err.response.data.detail);
          else
            this.toast(err.response.data.message);
        })
      },
      // saveData () {
      //   this.$axios.patch(`user/${this.user.id}`, this.user).then(res => {
      //     if(res.status===200) {
      //       console.log('저장완료')
      //     }
      //   })
      // }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>

</style>
