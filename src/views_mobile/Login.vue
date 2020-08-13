<template>
  <div :style="containerStyle">
    <div style="font-size:25px;padding:80px 0 40px 0;text-align: center">
<!--      로고 OR 홈페이지 이름-->
      로그인 페이지
    </div>
    <div :style="[pagePadding]" style="margin-top:36px;">
      <block-login></block-login>
      <div class="unselect sub-tip" style="margin-top:24px">
        <span @click="findidModal=true;$refs.findidModal.open();">아이디</span>
        <span> | </span>
        <span @click="$refs.passModal.open();vEmail=true">비밀번호 찾기</span>
      </div>

      <div class="unselect sub-tip" @click="routerPush('signup')">
        <div>처음인가요? <b style="cursor:pointer">가입하러가기</b></div>
      </div>

    </div>

    <!-- 아이디 찾기 -->
    <sweet-modal ref="findidModal" overlay-theme="dark" @close="findidModal=false">
      <div style="padding:20px">
        <div slot="header" :style="brandColor.main">아이디 찾기</div>
        <div slot="content">
          <block-find-id v-if="findidModal"
                         @confirm="$refs.findidModal.close();findidModal=false;"></block-find-id>
        </div>
      </div>
    </sweet-modal>

    <!-- 비밀번호 이메일 전송 -->
    <sweet-modal ref="passModal" overlay-theme="dark" @close="vEmail=false">
      <div style="padding:20px">
        <div slot="header" :style="brandColor.main">비밀번호 찾기</div>
        <div slot="content">
          <block-password-email v-if="vEmail" @Success="$refs.passModal.close()"></block-password-email>
        </div>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
  import { SweetModal } from 'sweet-modal-vue';
  import BlockLogin from "../components/Block/BlockLogin";
  import BlockPasswordEmail from "../components/Block/BlockPasswordEmail";
  import CSnsLogin from "@/components/Form/CSnsLogin";
  import BlockFindId from "@/components/Block/BlockFindId"

  export default {
    name: "Login",
    mixins: [
    ],
    components: {
      BlockPasswordEmail,
      BlockLogin,
      SweetModal,
      CSnsLogin,
      BlockFindId
    },

    data() {
      return {
        findidModal: false,
        vEmail: false
      }
    },

    computed: {
      containerStyle() {
        return {
          backgroundColor: 'white',
          minHeight: '100vh',
          paddingBottom: '40px'
        }
      }
    },
  }
</script>

<style type="stylus" lang="stylus">
  .sub-tip
    margin-top 12px
    text-align center
</style>
