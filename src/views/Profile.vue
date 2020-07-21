<template>
    <div class="pc-wrapper">
      <input-img :url.sync="user.profile"></input-img>
      <div @click="saveData">저장</div>
    </div>
</template>

<script>
    import InputImg from "../components/module/common/InputImg";
    export default {
        name: "Profile",
      components: {InputImg},
      data() {
          return {
            user: {
              "phone": "01011111111",
              "birth": "",
              "profile": "",
              "email": "test@test.com",
              "name": "테스트x",
              "username": "test@test.com",
              "login_type": "email"
            }
          }
      },
      methods: {
          saveData () {
            this.$axios.patch(`user/3`, this.user, {
              headers: {
                Authorization: "Token 5d3ca1f881055beaa7d0950c8dc0112acae5ec78"
              }
            }).then(res => {
              if(res.status===200) {
                console.log('저장완료')
              }
            })
          }
      }
    }
</script>

<style scoped>

</style>
