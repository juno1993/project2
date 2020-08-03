<template>
  <div style="position:relative">
    <router-view></router-view>
    <bottom-menu :menu="menu"></bottom-menu>
    <!-- footer -->
    <footer></footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import BottomMenu from "../components/Common/BottomMenu";

export default {
  name: 'Main',
  components: {
    BottomMenu,
    Footer
  },
  data () {
    return {
      menu: [
        {
          icon: 'home',
          name: '홈',
          link: 'home'
        },
        {
          icon: 'search',
          name: '검색',
          link: 'search'
        },
        {
          icon: 'add_circle_outline',
          name: '게시물작성',
          link: 'feed_create'
        },
        {
          icon: 'favorite',
          name: '좋아요',
          link: 'favorite',
        },

      ]
    }
  },
  created () {
    console.log(this.isLogin)
    if(this.isLogin) {
      this.menu.push({
        icon: 'person',
        name: '내정보',
        link: 'mypage'
      })
    }
    else {
      this.menu.push({
        icon: 'login',
        name: '로그인',
        link: 'login'
      })
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
