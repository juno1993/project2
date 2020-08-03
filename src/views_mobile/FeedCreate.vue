<template>
  <div>
    <page-header>
      <i class="material-icons header-icon" slot="left">home</i>
      <span class="header-title" slot="center">착한중고</span>
    </page-header>

    <div :style="[pagePadding]" style="margin-top:36px;">
      <div style="padding:20px 0">
<!--        <input-img :url.sync="value.imgs"></input-img>-->
        <input type="file"
               @input="onUploadFile($event)"
               accept="*">
        <c-input-textarea :value.sync="value.content"></c-input-textarea>
      </div>

    </div>
  </div>
</template>

<script>
  var EXIF = require('exif-js');
  import PageHeader from "../components/Common/PageHeader";
  import CInputTextarea from "../components/Form/CInputTextarea";
  import InputImg from "../components/module/common/InputImg";
  export default {
    name: "FeedCreate",
    components: {
      InputImg,
      CInputTextarea,
      PageHeader
    },
    data () {
      return {
        value: {
          imgs: [''],
          content: []
        }
      }
    },
    created () {

    },
    methods: {
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

<style scoped>

</style>
