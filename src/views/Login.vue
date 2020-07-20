<template>
  <div class="signin-container">
    <div class="flex-center wrap full-width">
      <div class="col-6 flex-end" style="margin-top:-36px;">
        <img src="https://launchpack-service-nursenote.s3.amazonaws.com/media/nursenote/non-path/05310452.png"
             style="width:545.8px;height:640px;margin-right:20px">
      </div>

      <div class="col-6 flex-start wrap set-zoom" :style="containerStyle" style="margin-top:-36px;">
        <div :style="borderStyle" style="width:436px;padding-bottom:12px;">


          <block-signin-pc></block-signin-pc>

          <div class="unselect" style="text-align:center">
            <span @click="findidModal=true;$refs.findidModal.open()">아이디</span>
            <span> | </span>
            <span @click="$refs.passModal.open()">비밀번호 찾기</span>
          </div>
        </div>
        <div style="width:436px;padding:12px;" :style="borderStyle2">
          <div class="unselect flex-center" @click="routerPush('signup')">
            <div>처음인가요? <b style="cursor:pointer">가입하러가기</b></div>
          </div>
        </div>
        <div class="text-center" style="width:436px;margin-top:12px;" :style="brandColor.main">
          앱 다운받고 간편하게 사용하세요.
        </div>
      </div>
    </div>


    <!-- 아이디 찾기 -->
    <sweet-modal ref="findidModal" overlay-theme="dark" @close="findidModal=false;">
      <div style="padding:20px">
        <div slot="header">아이디 찾기</div>
        <div slot="content">
          <block-find-id v-if="findidModal"
                         @confirm="$refs.findidModal.close();findidModal=false;"></block-find-id>
        </div>
      </div>
    </sweet-modal>

    <!-- 비밀번호 이메일 전송 -->
    <sweet-modal ref="passModal" overlay-theme="dark">
      <div style="padding:20px">
        <div slot="header" :style="brandColor.main">비밀번호 찾기</div>
        <div slot="content">
          <block-password-email @Success="$refs.passModal.close();"></block-password-email>
        </div>
      </div>
    </sweet-modal>
  </div>
</template>

<script>
  import PageMixin from "@/mixins/pc/PageMixin"
  import { SweetModal } from 'sweet-modal-vue';
  import BlockPasswordEmail from "../components/Block/BlockPasswordEmail";
  import BlockFindId from "@/components/Block/BlockFindId"

  export default {
    name: "Signin",
    mixins: [
      PageMixin
    ],
    components: {
      BlockPasswordEmail,
      SweetModal,
      BlockFindId
    },
    data() {
      return {
        findidModal: false
      }
    },

    computed: {
      borderStyle() {
        return {
          border: '1px solid'
        }
      },
      borderStyle2() {
        return {
          border: `1px solid`,
          marginTop: '12px'
        }
      },
      containerStyle() {
        return {
          backgroundColor: '#000000',
          color: '#000000'
        }
      }
    },
  }
</script>

<style type="stylus" lang="stylus">
  .signin-container
    height 100vh
    display flex
    flex-wrap wrap
    justify-content center
    align-content center
  .sub-tip
    margin-top 12px
    text-align center
  .footer
    width 800px

  a
    text-decoration none
    color rgb(62, 57, 57)

  .set-zoom
    zoom 90%
</style>
