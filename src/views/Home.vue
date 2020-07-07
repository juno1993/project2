<template>
  <div class="home">
    <!--<product></product>-->
    <!-- 배너 -->

    <!-- 공지사항 -->

    <!-- 이벤트 -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Product from "./Product";

export default {
  name: 'Home',
  components: {
    Product,
    HelloWorld
  }
}
</script>
