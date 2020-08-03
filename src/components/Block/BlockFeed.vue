<template>
  <div style="padding-bottom: 50px">
    <div v-for="(item, idx) in list" :key="`feed-${idx}`">
      <div class="flex-align feed-header">
        <div :style="profileImage(item.author.user.profile)"></div>
        <div style="margin-left: 6px">{{ item.author.user.name }}</div>
      </div>
      <img :src="item.imgs[0]" style="width:100%; height: 300px; object-fit:cover;" v-if="item.imgs.length>0"/>
      <div></div>
      <div>{{ item.title }}</div>
      <div>{{ item.content }}</div>
      <div>{{ item.created_time }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "BlockFeed",
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getData();
    },
    methods: {
      profileImage (img) {
        return {
          width: '30px',
          height: '30px',
          borderRadius: '30px',
          backgroundImage: `url(${img})`,
          backgroundSize: 'cover'
        }
      },
      getData () {
        this.$axios.get(`user/0/feed`).then(res => {
          this.list = res.data.data;
        })
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  .feed-header
    padding 12px
    border-top 1px solid #eee

</style>
