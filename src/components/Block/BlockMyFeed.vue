<template>
  <div class="flex-align wrap">
    <img class="img-wrapper" v-for="(item, idx) in list" :key="`feed-${idx}`" v-if="visible"
         :style="imgStyle" :src="item.imgs[0]"/>
  </div>
</template>

<script>
  import ListMixin from "../../mixins/ListMixin";
  export default {
    name: "BlockMyFeed",
    mixins: [
      ListMixin
    ],
    data() {
      return {
        list: [],
        visible: false
      }
    },
    created() {
      this.pageLoadType = 'infinite';
      this.getData();
    },
    computed: {
      imgStyle() {
        // let height = '60px';
        // if(this.height)
        //   height = this.height + 'px';
        let deviceWidth = window.innerWidth;
        let height = deviceWidth * 1 / 3;
        // let height = deviceWidth * 9/16;
        return {
          width: '33.3%',
          height: height + 'px',
          marginBottom: '-5px',
          objectFit: 'cover'
          // // lazy background-image 적용
          // backgroundImage: `url(${img.url ? img.url : img})`,
          // backgroundPosition: 'center',
          // backgroundSize: 'cover',
        }
      }
    },
    methods: {
      getData() {
        this.url = `user/${this.user.id}/feed?page_num=1&page_length=9`;
        this.$axios.get(this.url).then(res => {
          this.list = res.data.data;
          this.totalPages = res.data.total_page;
          this.totalCount = res.data.count;
          this.currentPage = 2;
          this.visible = true;
        })
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>

</style>
