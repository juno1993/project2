<template>
  <div class="mobile-wrapper" :style="[pagePadding, {paddingTop: 0,paddingBottom: '100px'}]">
    <div style="font-size:25px;text-align: center">
      <!--      <img src="/static/image/logo_2.png" style="width:120px">-->
      회원가입
    </div>
    <!-- 회원가입 폼 -->
    <component :is="form.elType" v-for="(form,idx) in formData" :key="'form-'+idx"
               v-bind="form"
               :value.sync="form.value"
               @onEnter="sign"></component>
    <div style="margin-top: 12px">
      <btn :color="brandColor.white"
           :backgroundColor="brandBgColor.brand"
           @clicked="sign">가입하기
      </btn>
    </div>
  </div>
</template>

<script>
  import FormMixin from "@/mixins/FormMixin"
  import Btn from "@/components/Common/Btn";

  export default {
    name: "Signup",
    components: {
      Btn
    },
    mixins: [
      FormMixin
    ],
    data() {
      return {
        formData: [
          {
            "name": "프로필 이미지",
            "field": "profile",
            "label": "프로필 이미지",
            "enable": true,
            "format": "CImgUploader",
            "is_param": false,
            "validate": {
              "required": false,
              "valid_required": false
            },
            "description": "",
            "placeholder": ""
          },
          {
            "name": "아이디",
            "field": "partner.username",
            "label": "아이디(이메일)",
            "enable": true,
            "format": "CInput_email",
            "is_param": false,
            "validate": {
              "required": true,
              "valid_required": true
            },
            "description": "이메일",
            "placeholder": "이메일"
          },
          {
            "name": "이름",
            "field": "partner.name",
            "label": "이름",
            "enable": true,
            "format": "CInput_text",
            "is_param": false,
            "validate": {
              "num": true,
              "alpha_g": true,
              "alpha_s": true,
              "special": true,
              "required": true,
              "max_length": 20,
              "min_length": 2,
              "valid_required": true
            },
            "description": "",
            "placeholder": "이름"
          },
          {
            "name": "비밀번호",
            "field": "partner.password",
            "label": "비밀번호",
            "enable": true,
            "format": "CInput_password",
            "is_param": false,
            "validate": {
              "required": true,
              "valid_required": true
            },
            "description": "",
            "placeholder": "비밀번호"
          },
          {
            "name": "비밀번호 확인",
            "field": "partner.password_re",
            "label": "비밀번호 확인",
            "enable": true,
            "format": "CInput_password",
            "is_param": false,
            "validate": {
              "required": true,
              "valid_required": true
            },
            "description": "",
            "placeholder": "비밀번호 확인"
          }
        ]
      }
    },
    created() {
      this.getForm();
    },
    methods: {
      sign() {
        let result = this.getParamData(this.formData);
        if (result.enable) {
          this.$axios.post(`auth/signup`, result.params).then(res => {
            if (res.status === 200) {
              this.toast('회원가입 되었습니다.');
              this.$router.replace('/home');
            }
          }).catch(err => {
            if (!err.response.data.message)
              this.toast(err.response.data.detail);
            else
              this.toast(err.response.data.message);
          })
        }
      },
      getForm() {
        this.formData = cloneItem(this.setForm(this.formData));

        // 프로필 이미지 업로더 스타일 수정
        let profile = find(this.formData, 'field', 'partner.profile');
        profile.borderStyle = 'circle';
        profile.align = 'center';

        // 소셜로그인 진입 시
        if (this.$route.query.user_id !== undefined) {
          find(this.formData, 'field', 'username').value = this.$route.query.user_id;
          find(this.formData, 'field', 'username').elType = '';
          find(this.formData, 'field', 'password').elType = '';
          if (find(this.formData, 'field', 'password_re'))
            find(this.formData, 'field', 'password_re').elType = '';
          find(this.formData, 'field', 'name').value = this.$route.query.name;
          find(this.formData, 'field', 'profile').value = this.$route.query.profile;
        }
      }
    }
  }
</script>

<style scoped>

</style>
