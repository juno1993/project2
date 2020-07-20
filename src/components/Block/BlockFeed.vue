<template>
  <div>
    <div v-for="(item, idx) in list" :key="`feed-${idx}`">
      {{item.title}}
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
      getData () {
        this.$axios.get(`user/0/feed`).then(res => {
          this.list = res.data.data;
        })
      }
    }
  }
</script>

<style scoped>

</style>
