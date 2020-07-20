<template>
  <div>
    <c-input-password :value.sync="value.password" placeholder="기존 비밀번호"></c-input-password>
    <c-input-password :value.sync="value.new_password" placeholder="새 비밀번호변경"></c-input-password>
    <c-input-password :value.sync="value.new_password_re" placeholder="새 비밀번호변경 확인"></c-input-password>
    <div style="margin-top: 24px">
      <btn :color="brandColor.white"
           :backgroundColor="brandBgColor.brand"
           @clicked="modify">비밀번호 변경하기</btn>
    </div>
  </div>
</template>

<script>
  import CInputPassword from "@/components/Form/CInputPassword";
  import Btn from "@/components/Common/Btn";

  export default {
    mixins: [
    ],
    components: {
      Btn,
      CInputPassword
    },
    name: "block-password",
    data() {
      return {
        value: {
          password: '',
          new_password: '',
          new_password_re: ''
        },
        check: false
      }
    },
    methods: {
      async modify() {
        let err = '';
        if(!this.value.password) err = '비밀번호를 입력하세요.';
        else if(!this.value.new_password) err = '새 비밀번호를 입력하세요.';
        else if(!this.value.new_password_re) err = '새 비밀번호 확인을 입력하세요.';
        else if(this.value.new_password !== this.value.new_password_re) err = '새 비밀번호가 다릅니다.';
        if(err) {
          this.toast(err);
          return;
        }
        // 비밀번호 체크 api
        await this.$axios.post('auth/user/login', {
          username: this.$store.getters.user.username,
          password: this.value.password
        }).then(res=> {
          if(res.status===200) {
            this.check = true;
          }
        }).catch(error=> {
          this.toast('잘못된 비밀번호 입니다.');
        })

        if(this.check) await this.updateInfo();
      },
      // 내 정보 수정 api
      updateInfo() {
        let params = {
          username: this.$store.getters.user.username,
          password: this.value.new_password
        }
        this.$axios.patch(`user/${this.$store.getters.user.user_id}`,
          params).then(res=>{
          if(res.status===200) {
            this.toast('비밀번호가 변경되었습니다.');
            if(res.data.user) {
              this.$store.commit('setUser', res.data.user);
            }
            this.$router.replace('mypage');
          }
        }).catch(err=> {
          if(!err.response.data.message)
            this.toast(err.response.data.detail);
          else
            this.toast(err.response.data.message);
        })
      },
    }
  }
</script>

<style type="stylus" lang="stylus" scoped>

</style>
