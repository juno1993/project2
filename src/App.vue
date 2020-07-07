<template>
  <div id="app" :style="appStyle">
    <!--<div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      backendUrl: 'http://localhost:8000/',
      appStyle: {
        minHeight: '100vh',
        maxWidth: '100%',
        margin: 0,
        paddingLeft: 0,
        paddingRight: 0,
        overflow: 'hidden'
      },
    }
  },
  created () {
    this.backendUrl = process.env.VUE_APP_BACKEND_URL;
    this.$axios.defaults.baseURL = this.backendUrl;
    this.$axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8"
    // this.$axios.defaults.headers.get["Content-Type"] = "application/json; charset=utf-8"
    if (this.$route.path === '/') {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
