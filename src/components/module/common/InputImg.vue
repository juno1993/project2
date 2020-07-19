<template>
  <div class="input-img-bg" @click="add_img">
    <div class="input-img" :style="'background-image: url('+ img + ');'">
      <input v-if="img===''" id="file-img" type="file" accept="image/*" @change="onFileChange" style="width:0;height:0">
      <label v-if="img===''" class="input-img-intext" for="file-img">
        <i class="material-icons">add</i>
        <span class="plus" style="font-size:20px;" v-if="img === ''"></span><br>
        <span style="font-size:0.8em" v-if="img === ''">이미지 추가</span>
      </label>
      <div v-else class="input-img-intext">
        <div class="input-img-close" v-on:click.stop.prevent="del_img" v-if="img!==''">
          <i class="material-icons">close</i>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    props:['url'],
    data () {
      return {
        img: ''
      }
    },
    watch: {
      url: function(n, o) {
        this.img = this.image(n);
      }
    },
    mounted: function() {
      //file 타입인 경우
      if(typeof this.url === 'object') {
        this.set_img(this.img);
      }
      else {
        this.img = this.image(this.url);
      }
    },
    methods: {
      add_img: function() {

      },
      del_img: function(e) {
        this.img = '';
        this.$emit('update:url', '');
      },
      // 파일 들고왔을 때
      onFileChange: function(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;

        this.set_img(files[0]);
      },
      // 이미지 화면에 설정
      set_img(img) {
        var reader = new FileReader();
        reader.onload = function(e) {
          this.img = e.target.result;
          this.$emit('onUpload', this.img);
          this.$emit('update:url', this.img);
        }.bind(this);
        reader.readAsDataURL(img);
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  $input-img-size = 80px
  .input-img-bg
    width $input-img-size
    height $input-img-size
    background-color #d9d9d9
    border 1px solid #a8a8a8
    display flex
    position relative
    margin-right 10px
    margin-bottom 10px
    flex-shrink 0

  .input-img-intext
    text-align center
    margin auto
    width 100%
    color #797979
    position absolute
    top 0
    left 0
    padding-top 20px
    height 100%

    > .input-img-close
      display none
      padding 2px 4px
      background-color rgba(255,255,255, 0.9)
      font-size 14px
      color #555
      position absolute
      top 0
      right 0
      margin -2px
      line-height 13px

    i
      font-size 14px

  &:hover
    .input-img-intext
    > .input-img-close
      display block

  .input-img
    width $input-img-size
    height $input-img-size
    background-size cover
    background-position center
    position absolute

  input
    padding 0
    border 0
</style>
