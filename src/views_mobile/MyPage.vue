<template>
  <div class="mobile-wrapper">
    <page-header>
      <i class="material-icons header-icon" slot="left">home</i>
      <span class="header-title" slot="center">마이페이지</span>
    </page-header>
    <!-- 내 정보 -->
    <div :style="[pagePadding]">
      <div class="flex-align">
        <div class="col-3">
          <div :style="profileImage"></div>
        </div>
        <div class="col-8 flex-between">
          <div>
            <div>0</div>
            <div>게시물</div>
          </div>
          <div>
            <div>0</div>
            <div>팔로워</div>
          </div>
          <div>
            <div>0</div>
            <div>팔로잉</div>
          </div>
        </div>
      </div>
      <div style="margin-top:8px">{{ user.username }}</div>
      <div>{{ user.name }}</div>
      <div class="mypage-btn" @click="$router.push('profile')">프로필 수정</div>
      <div class="mypage-btn" @click="$refs.logoutModal.open()">로그아웃</div>
    </div>

    <!-- 내가 올린 게시물   -->
    <div>
      <block-my-feed></block-my-feed>
    </div>

    <!-- 메뉴 -->
    <div v-for="(item, idx) in menu" :key="`menu-${idx}`">

    </div>

    <!-- 로그아웃 -->
    <sweet-modal ref="logoutModal" overlay-theme="dark">
      <modal @confirm="logout" @cancel="$refs.logoutModal.close()">
        <div slot="header">로그아웃</div>
        <div slot="content">로그아웃하시겠습니까?</div>
      </modal>
    </sweet-modal>
  </div>
</template>

<script>
  import { SweetModal } from 'sweet-modal-vue';
  import PageMixin from "@/mixins/mobile/PageMixin"
  import PageHeader from "../components/Common/PageHeader";
  import Modal from "../components/Common/Modal";
  import BlockMyFeed from "../components/Block/BlockMyFeed";

  export default {
    name: "MyPage",
    components: {
      BlockMyFeed,
      Modal,
      PageHeader,
      SweetModal
    },
    mixins: [
      PageMixin
    ],
    data() {
      return {
        menu: []
      }
    },
    created() {
      this.login_required = true;
    },
    computed: {
      profileImage() {
        return {
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          backgroundImage: `url(${this.user.profile})`,
          backgroundSize: 'cover'
        }
      }
    },
    methods: {
      logout(){
        // 로그아웃 api 호출
        let token = this.$store.getters.user.token;
        this.$axios.post(`auth/user/logout`, {
          token: token
        }).then(res=> {
          if(res.status===200) {
            this.toast('로그아웃 되었습니다.');
            this.$refs.logoutModal.close()
            this.$store.commit('logout');
            this.$router.replace('/home')
          }
        })
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  .mypage-btn
    border 1px solid #666666
    margin-top 13px
    padding 4px
    font-size 13px
    text-align center
</style>
