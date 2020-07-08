<template>
  <div style="padding: 45px 0 45px 0">
    <!-- 배너 -->
    <banner></banner>
    <div class="container">
      <!-- 신규 상품 -->
      <transition name="fade">
        <div v-if="new_exhibition" style="text-align:center;margin-top:60px">
          <b class="size-24">{{ new_exhibition.name }}</b>
          <exhibition-product :list="new_exhibition.product_list" style="margin-top:60px"></exhibition-product>
        </div>
      </transition>
      <!-- 추천 상품 -->
      <transition name="fade">
        <div v-if="recm_exhibition" style="text-align:center;margin-top:60px">
          <b class="size-24">{{ recm_exhibition.name }}</b>
          <exhibition-product :list="recm_exhibition.product_list" style="margin-top:60px"></exhibition-product>
        </div>
      </transition>
    </div>
    <!-- 이미지 -->
    <img style="width:100%;height:300px;object-fit: cover;margin:140px 0" src="https://c.pxhere.com/photos/c7/a5/photo-29036.jpg!d" alt>

    <!-- 공지사항 -->

    <!-- 이벤트 -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Product from "./Product";
import ExhibitionProduct from "./ExhibitionProduct";
import Banner from "../components/Banner";

export default {
  name: 'Home',
  components: {
    Banner,
    ExhibitionProduct,
    Product
  },
  data () {
    return {
      recm_exhibition: undefined,
      new_exhibition: undefined
    }
  },
  created () {
    this.getExhibition(1);
    this.getExhibition(2);
  },
  methods: {
    getExhibition(ex_id) {
      this.$axios.get(`public/exhibition/${ex_id}`).then(res => {
        if(res.status===200) {
          if(ex_id===1) {
            this.recm_exhibition = res.data;
          }
          else if(ex_id===2) {
            this.new_exhibition = res.data;
          }
        }
      })
    }
  }
}
</script>
