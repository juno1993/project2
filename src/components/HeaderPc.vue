<template>
  <div class="header-wrapper flex-between">
    <div>
      <b class="header-item size-30" @click="$router.replace('home')">중고폰 구매 개발중</b>
    </div>

    <div class="flex-align">
      <!--<div class="header-item size-18">마이페이지</div>-->
      <!--<div class="header-item size-18">1:1문의</div>-->
      <!--<div class="header-item size-18">공지사항</div>-->
      <!--<div class="header-item size-18">이벤트</div>-->
      <div class="header-item size-18" @click="$router.push('product')">중고 폰 구매</div>
      <!--<div class="header-item size-18" @click="$router.push('sell_product')">내 폰 팔기</div>-->
      <!--<div class="header-item size-18">자주 찾는 질문</div>-->
    </div>

    <div class="flex-align">
      <div class="header-item size-18">로그인</div>
      <div class="header-item size-18">회원가입</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'HeaderPc'
}
</script>

<style lang="stylus" type="stylus" scoped>
  .header-wrapper
    padding 30px 40px
    border-bottom 1px solid #777
    position fixed
    top 0
    left 0
    width 100%
    z-index 100
    background-color white

  .header-item
    padding 0 12px
    height 35px
    cursor pointer
    user-select none

</style>
