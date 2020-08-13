<template>
  <div class="mobile-wrapper">
    <page-header>
      <i class="material-icons header-icon" slot="left">home</i>
      <span class="header-title" slot="center">국민폰</span>
    </page-header>

    <block-feed></block-feed>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Banner from "../components/Banner";
import PageHeader from "../components/Common/PageHeader";
import BlockFeed from "../components/Block/BlockFeed";

export default {
  name: 'Home',
  components: {
    BlockFeed,
    PageHeader,
    Banner
  },
  data () {
    return {
      recm_exhibition: undefined,
      new_exhibition: undefined
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
