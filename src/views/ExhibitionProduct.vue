<template>
  <div>
    <div class="flex-align wrap">
      <div class="col-3 unselect" style="padding:12px;" v-for="(product, product_idx) in list" :key="`product-${product_idx}`">
        <div class="img-wrapper">
          <img class="product-img" :src="imgUrl(product)"/>
        </div>
        <div class="content-wrapper">
          <div class="product-name">{{ product.name }}</div>
          <span v-for="(tag, tag_idx) in product.tags" :key="`product-${tag_idx}`">
            <span class="product-tag">{{ tag }}</span>
            <!--<span v-if="tag_idx < product.tags.length-1">, </span>--></span>
          <div class="product-price">{{ product.price | currency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Pagination from "../components/Pagination";

  export default {
    components: {Pagination},
    name: 'ExhibitionProduct',
    props: {
      list: {
        type: Array,
        required: false
      }
    },
    methods: {
      imgUrl(img) {
        return 'https://image.zdnet.co.kr/2020/05/26/sini_oQkjfdNyuNqhztt.jpg'
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  .product-img
    width 100%
    height auto

  .content-wrapper,
  .img-wrapper
    border 1px solid #ebebeb

  .content-wrapper
    padding 10px
    text-align center

  .product-name
    padding-bottom 5px
    font-size 18px

  .product-tag
    background #f6a600
    padding 2px 6px
    color  white
    margin 0 4px
    border-radius 3px

  .product-price
    padding-top 10px
</style>
