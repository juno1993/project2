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

          }
      },
      created () {
      },
      methods: {
          saveData () {
            this.$axios.patch(`user/${this.user.id}`, this.user).then(res => {
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
