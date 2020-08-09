<template>
  <div class="flex-align">
    <img class="img-wrapper" v-for="(item, idx) in list" :key="`feed-${idx}`" v-if="visible"
         :style="imgStyle" :src="item.imgs[0]"/>
  </div>
</template>

<script>
    export default {
        name: "BlockMyFeed",
        data () {
          return {
            list: [],
            visible: false
          }
        },
      created () {
        this.getData();
      },
      computed: {
        imgStyle() {
          // let height = '60px';
          // if(this.height)
          //   height = this.height + 'px';
          let deviceWidth = window.innerWidth;
          let height = deviceWidth * 1/3;
          // let height = deviceWidth * 9/16;
          return {
            width: '33.3%',
            height: height + 'px',
            // // lazy background-image 적용
            // backgroundImage: `url(${img.url ? img.url : img})`,
            // backgroundPosition: 'center',
            // backgroundSize: 'cover',
            marginBottom: '-5px'
          }
        }
      },
      methods: {
        getData() {
          this.$axios.get(`user/${this.user.id}/feed`).then(res => {
            this.list = res.data.data;
            this.visible = true;
          })
        }
      }
    }
</script>

<style lang="stylus" type="stylus" scoped>

</style>
