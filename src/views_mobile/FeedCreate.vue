<template>
  <div class="mobile-wrapper">
    <page-header>
      <i class="material-icons header-icon" slot="left">home</i>
      <span class="header-title" slot="center">착한중고</span>
    </page-header>

    <div :style="[pagePadding]">
      <div class="feed-title">이미지 선택</div>
      <div class="flex" style="margin-top:24px">
        <draggable :options="{draggable:'.item'}">
          <input-img style="display: inline-block;" v-bind:key="'img'+idx"
                     v-for="(img, idx) in value.imgs"
                     class="item"
                     :idx="(idx+1)*111154"
                     @addImg="value.imgs.push('')"
                     :url.sync="value.imgs[idx]"></input-img>
          <div class="add-img" @click="value.imgs.push('')">
            <i class="material-icons">add</i>
          </div>
        </draggable>
      </div>
      <div class="feed-title">피드 내용</div>
      <c-input-textarea :value.sync="value.content"></c-input-textarea>
      <div class="btn-save" @click="saveData">게시물 작성하기</div>
      <!--        <input type="file"-->
      <!--               @input="onUploadFile($event)"-->
      <!--               accept="*">-->
    </div>
  </div>
</template>

<script>
  var EXIF = require('exif-js');
  import draggable from 'vuedraggable'
  import PageHeader from "../components/Common/PageHeader";
  import CInputTextarea from "../components/Form/CInputTextarea";
  import InputImg from "../components/module/common/InputImg";
  import PageMixin from "../mixins/mobile/PageMixin";
  export default {
    name: "FeedCreate",
    components: {
      InputImg,
      draggable,
      CInputTextarea,
      PageHeader
    },
    mixins: [
      PageMixin
    ],
    data () {
      return {
        value: {
          imgs: [''],
          content: []
        }
      }
    },
    created () {
      this.login_required = true;
    },
    methods: {
      saveData () {
        this.$axios.post(`user/${this.user.user_id}/feed`, this.value).then(res => {
          if(res.status===200) {
            this.toast('게시물이 등록되었습니다.')
            this.$router.replace('home')
          }
        })
      },
      onUploadFile (evt) {
        console.log(evt.target);

        let file = evt.target.files[0];
        EXIF.getData(file, function() {
          var allMetaData = EXIF.getAllTags(this);
          console.log('metadata',allMetaData)
          //  Make: "samsung"
          //  Model: "SM-N950N"
          //  SceneCaptureType: "Standard"
          //  WhiteBalance: "Auto white balance"
          //  ISOSpeedRatings: 50
        });
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  .add-img
    width 80px
    height 80px
    background-color white
    position relative
    display inline-block
    margin-right 10px
    margin-bottom 10px
    border 1px solid #dbdbdb
    border-radius 5px
    box-shadow inset 0 1px 2px rgba(10, 10, 10, 0.1)
    cursor pointer

  .add-img > i
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)

  /*.feed-title*/
  /*  margin-bottom 12px*/


</style>
