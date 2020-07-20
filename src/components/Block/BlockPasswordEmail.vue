<template>
  <div>
    <c-input-text :formType="formType"
                  :placeholder="prop.placeholder"
                  :name="prop.name"
                  :type="prop.type"
                  :validate="prop.validate"
                  :value.sync="email"></c-input-text>
    <div class="password-email-desc">입력한 이메일 주소로 새 비밀번호를 발급 받습니다.</div>

    <div style="margin-top: 12px">
      <btn :color="brandColor.white"
           :backgroundColor="brandBgColor.brand"
           @clicked="send">새 비밀번호 전송하기</btn>
    </div>
  </div>
</template>

<script>
  import CInputText from "@/components/Form/CInputText";
  import Btn from "@/components/Common/Btn";

  export default {
    components: {
      Btn,
      CInputText},
    name: "block-password-email",
    data() {
      return {
        formType: {
          input: 'round',
          button: 'round',
          box: 'round',
          list: 'horizontal'
        },
        prop: {
          placeholder: '이메일',
          name: '이메일',
          type: 'email',
          validate: {
            validate: true,
            valid_required: true
          }
        },
        email: ''
      }
    },
    methods: {
      send() {
        if(!this.email) {
          this.toast('이메일을 입력하세요.');
          return;
        }

        this.$axios.post('auth/user/reset/password', {
          email: this.email
        }).then(res=>{
          if(res.status===200) {
            this.toast('이메일이 전송되었습니다.');
            this.$emit('Success');
          }
        })
      }
    }
  }
</script>

<style type="stylus" lang="stylus" scoped>

  .password-email-desc
    font-size 12px
    margin-top 12px
    color #777
</style>