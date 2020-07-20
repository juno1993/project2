<template>
  <div style="padding:20px 0">
    <!-- 로그인 폼 -->
    <component :is="form.elType" v-for="(form,idx) in formData" :key="'form-'+idx"
               v-bind="form"
               :value.sync="form.value"
               @onEnter="login"></component>
    <div style="margin-top: 12px">
      <btn :color="brandColor.white"
           :backgroundColor="brandBgColor.brand"
           @clicked="login">로그인</btn>
    </div>

    <!-- 소셜 로그인 폼 -->
<!--    <c-sns-login></c-sns-login>-->
  </div>
</template>

<script>
  import FormMixin from "@/mixins/FormMixin"
  import CInputEmail from "@/components/Form/CInputEmail";
  import CInputPassword from "@/components/Form/CInputPassword";
  import Btn from "@/components/Common/Btn";
  import CInputText from "@/components/Form/CInputText";
  import CSnsLogin from "@/components/Form/CSnsLogin";

  export default {
    name: "BlockSignin",
    components: {
      CSnsLogin,
      CInputText,
      Btn,
      CInputPassword,
      CInputEmail
    },
    mixins: [
      FormMixin
    ],
    created() {
      this.getForm();
    },

    computed: {

    },
    data() {
      return {
        formData: []
      }
    },
    methods: {
      getForm() {
        let data = [
          {
            name: '아이디',
            field: 'username',
            label: '',
            placeholder: '아이디',
            format: 'CInput_email',
            validate: {
              required: true,          // 값 필수 여부
              valid_required: true,     // validation 필수 여부
              min_length: 4,            // 최소 문자 수
              max_length: 30,           // 최대 문자 수
              alpha_s: true,            // 알파벳 소문자
              alpha_g: true,            // 알파벳 대문자
              num: true,                // 숫자
              special: true             // 특수문자
            },
            value: ''
          },
          {
            name: '비밀번호',
            field: 'password',
            label: '',
            placeholder: '비밀번호',
            format: 'CInput_password',
            validate: {
              required: true,           // 값 필수 여부
              valid_required: true,     // validation 필수 여부
            },
            value: ''
          }
        ];
        this.formData = this.setForm(data);
      },
      login() {
        let result = this.getParamData(this.formData);

        if(result.enable) {
          this.$axios.post(`auth/user/login`, result.params)
          .then(res=>{
            if(res.status===200) {
              this.toast('로그인 되었습니다.');
              if(res.data.user) {
                this.$store.commit('setUser', res.data.user);
              }
              this.setAuthHeader();
              this.$router.replace('home')
            }
          })
          .catch(err=> {
            if(!err.response.data.message)
              this.toast(err.response.data.detail);
            else
              this.toast(err.response.data.message);
          })
        }
      }
    }
  }
</script>

<style type="stylus" lang="stylus">

</style>
