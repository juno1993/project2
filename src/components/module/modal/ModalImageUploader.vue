<template>
  <div>
    <!-- menu -->
    <div class="flex">
      <div class="tab">
        <div class="tab-item"
             v-for="tab in tabs" :key="`tab-${tab.id}`"
             :class="{'tab-select': tab.id === imgType}"
             @click="imgType=tab.id">{{ tab.name }}</div>
      </div>
    </div>

    <!-- 파일 업로드 -->
    <admin-box-item v-if="imgType===1"
                    :useTab="false"
                    title="파일 업로드"
                    subtitle="업로드할 파일을 선택해주세요">
      <div class="flex">
        <div class="relative">
          <div class="input-img-bg">
            <div class="input-img" :style="'background-image: url('+ img + ');'"></div>
            <div class="input-img-intext" v-if="img!==''">
              <div class="input-img-close" @click.stop.prevent="del_img">
                <i class="material-icons">close</i>
              </div>
            </div>

            <input :id="`file-img-${idx}`" type="file" accept="image/*"
                   ref="fileImg"
                   @change="onFileChange" :style="fileStyle">

            <label v-if="img===''" class="input-img-intext" :for="`file-img-${idx}`">
              <i class="material-icons">add</i>
              <div style="font-size:12px" v-if="img === ''">이미지 추가</div>
            </label>
          </div>
        </div>
        <img v-if="img!==''" :style="previewImg" style="margin-left: 12px" :src="img">
      </div>
    </admin-box-item>

    <!-- 이미지 라이브러리 -->
    <admin-box-item v-if="imgType===2"
                    :useTab="false"
                    title="이미지 라이브러리"
                    subtitle="업로드할 이미지를 라이브러리에서 선택해주세요.">

      <label class="file-upload-btn">
        <div>파일업로드</div>
        <input type="file"
               ref="fileImg2"
               accept="image/png, image/gif, image/jpeg"
               @change="uploadFile">
      </label>
      <div class="file-desc">최대 업로드 파일크기 5mb / 업로드 가능 파일 확장자명 : png, gif, jpeg</div>

      <div style="display: flex;margin-top:12px">
        <!-- 이미지 목록 -->
        <div class="image-list-container">
          <div class="image-list-no"
               v-if="imageList.length < 1">
            <span>이미지를 찾을 수 없습니다</span>
            <span>파일업로드 버튼을 선택하여 삽입할 이미지를 업로드해주세요</span>
          </div>
          <div class="image-list-item"
               v-for="(image, idx) in imageList" :key="idx"
               :class="{'selected': selectedImage !== null && image.id === selectedImage.id }"
               :style="{ backgroundImage: `url(${image.image})` }"
               @click.stop.prevent="selectImage(image)">
          </div>
        </div>
        <!-- 이미지 상세 -->
        <div class="image-info">
          <div class="image-info-title"
               style="color: #BABABA; font-size: 13px; margin-bottom: 4px;">선택한 이미지 상세정보</div>
          <div class="image-info-container"
               v-if="selectedImage !== null">
            <div class="image-info-preview"
                 :style="{
                backgroundImage: 'url(\'' + selectedImage.image + '\')'
              }">
            </div>
            <div class="image-info-filename">
              {{ selectedImage.filename }}
            </div>
            <div class="image-info-delete"
                 @click.stop.prevent="onClickDeleteButton">영구 삭제하기</div>
          </div>
        </div>
      </div>

    </admin-box-item>

    <!-- 외부 링크 -->
    <admin-box-item v-if="imgType===3"
                    :useTab="false"
                    title="외부 링크"
                    subtitle="이미지 링크를 입력해주세요">
      <div>
        <input class="input"
               :value="link"
               placeholder="http://example.com/sample.png"
               @input="e => { link = e.target.value; }"
               type="text">

        <img v-if="link!==''" :style="previewImg" style="margin-top:12px" :src="link">
      </div>
    </admin-box-item>

    <div class="btn-group-justify-end" style="margin-top:24px">
      <button class="button is-light" @click="cancelModal">취소</button>
      <button class="button is-primary" @click="addImage">추가</button>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import AdminFormItem from "../admin/AdminFormItem";
  export default {
    components: {AdminFormItem},
    name: 'modal-image-uploader',
    data() {
      return {
        ima_alt_text_url: 'https://ig7m3u7il7.execute-api.ap-northeast-2.amazonaws.com/v1/save_img_text',
        img_alt_text: '',
        imgType: 2,
        clickMenu: false,
        link: '',
        idx: '',
        img: '',
        imageList: [],
        selectedImage: null,
        tabs: [
          { 'id': 2, 'name': '라이브러리' },
          { 'id': 1, 'name': '파일업로드' },
          { 'id': 3, 'name': '외부링크' }
        ]
      }
    },

    created() {
      this.idx = moment().format('SSSS');
      this.getImageList();
    },

    computed: {
      previewImg() {
        let deco = {
          height: '280px',
          border: '1px solid #eeeeee',
          borderRadius: '4px',
          backgroundColor: '#dddddd'
        };

        return deco;
      },

      fileStyle(){
        return {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overFlow: 'hidden',
          clip: 'rect(0,0,0,0)',
          border: '0'
        };
      }
    },

    methods: {
      getImgAltText () {
        if(this.selectedImage.image) {
          this.$axios.get(this.ima_alt_text_url, {
            params: {
              path: this.selectedImage.image
            }
          }).then(res => {
            this.img_alt_text = res.data;
          })
        }
      },
      saveImgAltText () {
        let tk = 'lp-masters$h(!4)4tj!co3gp7r875^dd317@pa$i=8ytpx=s0g2vo3v__idk';
        if(!this.img_alt_text) {
          let params = {
            path: this.selectedImage.image,
            alt_text: this.img_alt_text
          }
          this.$axios.post(this.ima_alt_text_url, params, {
            headers: {
              'Authorization': tk
            }
          }).then(res => {
            if(res.data) {
              this.toast('저장되었습니다.');
            }
          })
        }
        else {
          let params = {
            path: this.selectedImage.image,
            alt_text: this.img_alt_text
          }
          this.$axios.patch(this.ima_alt_text_url, params, {
            headers: {
              'Authorization': tk
            }
          }).then(res => {
            if (res.data) {
              this.toast('저장되었습니다.');
            }
          })
        }
      },
      selectImage(image) {
        this.selectedImage = image;
        this.getImgAltText();
      },

      // 이미지 라이브러리 호출
      getImageList() {
        this.$axios.get('admin/ui/image')
          .then(data => {
            if(data.status === 200)
            {
              this.imageList = data.data;
            }
          });
      },

      del_img(e) {
        this.img = '';
      },

      uploadFile(evt) {
        let files = evt.target.files;
        if (files.length !== 0) {
          let file = files[0];
          let reader = new FileReader();
          reader.addEventListener('load', e => {
            let request = {
              filename: file.name,
              image: e.target.result
            };
            this.$axios.post('admin/ui/image', request)
              .then(data => {
                this.getImageList();
              });
          });
          reader.readAsDataURL(file);
          setTimeout(() => {
            this.$refs.fileImg2.value = '';
          }, 500);
        }
      },
      // 영구 삭제하기
      onClickDeleteButton() {
        let value = {
          id: this.selectedImage.id,
          url: 'ui/image/',
          title: '이미지를 삭제할 경우 복구가 불가능합니다\n정말 삭제하시겠습니까?'
        }
        this.$store.commit('openModal', {type: 'modal-delete', value: value, width: 500});
      },

      // 파일 들고왔을 때
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;

        this.set_img(files[0]);
        setTimeout(() => {
          this.$refs.fileImg.value = '';
        }, 500);
      },
      // 이미지 화면에 설정
      set_img(img) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.img = e.target.result;
          this.$emit('onUpload', this.img);
          this.$emit('update:url', this.img);
          this.$emit('addImg');
        };
        reader.readAsDataURL(img);
      },
      cancelModal() {
        this.$emit('closeModal');
      },
      addImage() {
        if(this.imgType === 1)
          this.$emit('addImage', this.img);

        else if(this.imgType === 2)
          this.$emit('addImage', this.selectedImage.image);

        else if(this.imgType === 3)
          this.$emit('addImage', this.link);
      }
    },
    watch: {
      modalStatus(n) {
        if(n === 'close') {
          if(this.$store.getters.modalResponse.modal_type==='modal-delete'){
            this.getImageList();
            this.selectedImage = null;
          }
        }
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  // 파일 업로드
  $input-img-size = 80px
  .input-img-bg
    width $input-img-size
    height $input-img-size
    background-color white
    border 1px solid #dbdbdb
    border-radius 4px
    box-shadow inset 0 1px 2px rgba(10,10,10,0.1)
    display flex
    position relative
    margin-right 10px
    margin-bottom 10px
    flex-shrink 0
    cursor pointer

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
      font-size 24px

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

  // 파일 업로드 end


  // 이미지 라이브러리
  .file-upload-btn
    width 87px
    height 32px
    border 1px solid #EEEEEE
    border-radius 3px
    display inline-flex
    align-items center
    justify-content center
    input
      display none

  .image-list-container
    width 530px
    height 312px
    overflow-y auto
    display flex
    flex-wrap wrap
    align-content flex-start
    border 1px solid #eee
    border-right 0
    padding 4px

  .image-list-no
    span
      display block

  .image-list-item
    width 80px
    height 80px
    border 1px solid #EEEEEE
    background-repeat no-repeat
    background-size cover
    background-position center
    margin 4px

  .image-list-item.selected
    border 2px solid #FF5722

  .image-info
    width 240px
    padding 12px 16px
    border 1px solid #EEEEEE

  .image-info-preview
    width 200px
    height 120px
    background-repeat no-repeat
    background-size cover
    background-position center

  .image-info-delete
    cursor pointer
    color #787878

  .image-info-delete:hover
    color #FF5722

  .button-area
    display flex
    justify-content center
    align-items center
    div
      cursor pointer
      width 76px
      height 32px
      background-color #FF5722
      border-radius 3px
      display flex
      justify-content center
      align-items center

  .file-desc
    display inline
    font-size 13px
    margin-left 7px
    color #787878

  .image-info-filename
    font-size 13px
    margin-bottom 4px


  // 상단 탭
  .tab
    display flex
    border 1px solid #ddd
    border-bottom 0
    border-top-left-radius 4px
    border-top-right-radius 4px

  .tab-item
    padding 8px 12px

  .tab-select
    color #ff5522


  // 테두리
  .box-item
    padding 16px
    padding-bottom 8px
    border 1px solid #dddddd
    border-bottom-left-radius 4px
    border-bottom-right-radius 4px
    height 492px
</style>
