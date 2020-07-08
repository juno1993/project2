<template>
  <div class="container" style="padding: 45px 0 45px 0">
    <div style="margin-bottom:40px;">
      <h2 class="size-30">중고 폰 사기</h2>
      <div class="flex-align" style="padding: 20px 0">
        <div class="product-cat unselect size-14"
             :style="selectedCatStyle(cat.id)"
             v-for="(cat, cat_idx) in catArr"
             :key="`cat-${cat_idx}`"
             @click="clickCat(cat)">{{ cat.name }}</div>
      </div>
      <div>검색된 상품 수 {{ filteredCount }}개</div>
    </div>
    <div class="flex-align wrap">
      <div class="col-3 unselect" style="padding:12px;" v-for="(product, product_idx) in products" :key="`product-${product_idx}`">
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

    <pagination @getData="getProduct" :filtered="filtered"></pagination>
  </div>
</template>

<script>
  import Pagination from "../components/Pagination";

  export default {
    components: {Pagination},
    name: 'product',
    data () {
      return {
        catArr: [],
        allCount: 0,
        filteredCount: 0,
        products: [],
        filtered: {
          cur_page: 1,
          page_num:1,
          total_page:1,
          page_length: 12
        },
        selectedCategory: 0
      }
    },
    created () {
      this.getCategory();
      this.getProduct();
    },
    methods: {
      selectedCatStyle (cat_id) {
        if(this.selectedCategory===cat_id) {
          return {
            fontWeight: 'bold'
          }
        }
      },
      imgUrl(img) {
        return 'https://image.zdnet.co.kr/2020/05/26/sini_oQkjfdNyuNqhztt.jpg'
      },
      getCategory() {
        this.$axios.get('product/category?all=true').then(res => {
          this.catArr = res.data;
        })
      },
      clickCat (cat) {
        this.selectedCategory = cat.id
        this.getProduct();
      },
      getProduct () {
        let url = 'product';
        if(this.selectedCategory) {
          url += `?category1=${this.selectedCategory}`;
        }
        this.$axios.get(url, {
          params: this.filtered
        }).then(res=> {
          this.products = res.data.data;
          this.filtered.page_length = res.data.page_length;
          this.filtered.cur_page = res.data.cur_page;
          this.filtered.total_page = res.data.total_page;
          this.allCount = res.data.total_count;
          this.filteredCount = res.data.count;
        })
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

  .product-cat
    margin-right 40px
</style>
