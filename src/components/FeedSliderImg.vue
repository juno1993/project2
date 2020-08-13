<template>
  <slick
    ref="slick"
    :options="slickOptions"
    @afterChange="handleAfterChange"
    @beforeChange="handleBeforeChange"
    @breakpoint="handleBreakpoint"
    @destroy="handleDestroy"
    @edge="handleEdge"
    @init="handleInit"
    @reInit="handleReInit"
    @setPosition="handleSetPosition"
    @swipe="handleSwipe"
    @lazyLoaded="handleLazyLoaded"
    @lazyLoadError="handleLazeLoadError">
    <img :src="img" v-for="(img, idx) in imgs" :key="`img-${idx}`"/>
<!--    <img :style="imgStyle" src="https://c.pxhere.com/photos/c7/a5/photo-29036.jpg!d" alt>-->
<!--    <img :style="imgStyle" src="https://i.pinimg.com/originals/22/4e/69/224e694ee3a37f176cd039a672027e21.jpg" alt>-->
  </slick>
</template>

<script>
  import Slick from "vue-slick";
  import "../../node_modules/slick-carousel/slick/slick.css";

  export default {
    name: 'FeedSliderImg',
    components: { Slick },
    props: {
      imgs: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        slickOptions: {
          infinite: true,
          variableWidth: false,
          centerPadding: '',
          centerMode: false,
          autoplay: false,
          arrows: false,
          dots: false,
          slidesToShow: 1,
          slidesToScroll: true,
          // Any other options that can be got from plugin documentation
          // http://kenwheeler.github.io/slick/
        },
        screenWidth: window.innerWidth
      };
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', () => {
          this.setScreenWidth();
        });
      })
    },
    // All slick methods can be used too, example here
    computed: {
      imgStyle() {
        // let height = '60px';
        // if(this.height)
        //   height = this.height + 'px';
        let deviceWidth = this.screenWidth;
        let height = deviceWidth * 9/16;
        return {
          width: '100%',
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
      setScreenWidth() {
        this.screenWidth = window.innerWidth;
      },
      next() {
        this.$refs.slick.next();
      },

      prev() {
        this.$refs.slick.prev();
      },

      reInit() {
        // Helpful if you have to deal with v-for to update dynamic lists
        this.$nextTick(() => {
          this.$refs.slick.reSlick();
        });
      },

      // Events listeners
      handleAfterChange(event, slick, currentSlide) {
        // console.log("handleAfterChange", event, slick, currentSlide);
      },
      handleBeforeChange(event, slick, currentSlide, nextSlide) {
        // console.log("handleBeforeChange", event, slick, currentSlide, nextSlide);
      },
      handleBreakpoint(event, slick, breakpoint) {
        // console.log("handleBreakpoint", event, slick, breakpoint);
      },
      handleDestroy(event, slick) {
        // console.log("handleDestroy", event, slick);
      },
      handleEdge(event, slick, direction) {
        // console.log("handleEdge", event, slick, direction);
      },
      handleInit(event, slick) {
        // console.log("handleInit", event, slick);
      },
      handleReInit(event, slick) {
        // console.log("handleReInit", event, slick);
      },
      handleSetPosition(event, slick) {
        // console.log("handleSetPosition", event, slick);
      },
      handleSwipe(event, slick, direction) {
        // console.log("handleSwipe", event, slick, direction);
      },
      handleLazyLoaded(event, slick, image, imageSource) {
        // console.log("handleLazyLoaded", event, slick, image, imageSource);
      },
      handleLazeLoadError(event, slick, image, imageSource) {
        // console.log("handleLazeLoadError", event, slick, image, imageSource);
      }
    }
  };
</script>
