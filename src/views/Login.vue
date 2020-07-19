<template>
    <div>
      <input v-model="username" placeholder="아이디"/>
      <input v-model="password" placeholder="비밀번호"/>
    </div>
</template>

<script>
export default {
  name: "Login",
  data () {
    return {
      username:"",
      password:""
    }
  }
}
</script>

<style scoped>

</style>
