<template>
  <div style="padding-bottom: 50px">
    <div v-for="(item, idx) in list" :key="`feed-${idx}`" v-if="visible">
      <div class="flex-align feed-header">
        <div :style="profileImage(item.author.user.profile)"></div>
        <div style="margin-left: 6px">{{ item.author.user.name }}</div>
      </div>
      <feed-slider-img :imgs="item.imgs"></feed-slider-img>
<!--      <img :src="item.imgs[0]" style="width:100%; height: 300px; object-fit:cover;" v-if="item.imgs.length>0"/>-->
      <div style="padding:12px">
<!--        <div>좋아요</div>-->
        <div class="feed-more">댓글 모두 보기</div>
        <div class="feed-title">{{ item.title }}</div>
        <div class="feed-content">{{ item.content }}</div>
        <div class="feed-date">{{ item.created_time }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import FeedSliderImg from "../FeedSliderImg";
  import ListMixin from "../../mixins/ListMixin";
  export default {
    name: "BlockFeed",
    components: {FeedSliderImg},
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
      this.pageLoadType= 'infinite';
      this.getData();
    },
    methods: {
      profileImage(img) {
        return {
          width: '30px',
          height: '30px',
          borderRadius: '30px',
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover'
        }
      },
      getData() {
        this.url = `public/feed?page_num=1&page_length=10`;
        this.currentPage = 1;
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
  .feed-header
    padding 12px
    border-top 1px solid #eee

  .feed-more
  .feed-title
  .feed-content
  .feed-date
    margin-top 6px

  .feed-more
    color #777

</style>
