<template>
  <div style="position:relative">
    <!-- header -->
    <header-pc></header-pc>

    <router-view class="container"></router-view>

    <!-- footer -->
    <footer></footer>
  </div>
</template>

<script>
import HeaderPc from '@/components/HeaderPc.vue'
import Footer from "@/components/Footer.vue";

export default {
  name: 'Main',
  components: {
    Footer,
    HeaderPc
  },
  data () {
    return {}
  },
  created () {

  },
  methods: {

  }
}
</script>

<style scoped>

</style>
