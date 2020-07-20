<template>
  <div class="flex-align" :style="containerStyle">
    <div :style="menuItemStyle" class="unselect" @click="routerPush(item.link)"
         v-for="item in menu" :key="`menu-${item.link}`">
      <div class="flex-center">
        <div class="position-relative" style="width:24px;height:24px">
          <i class="material-icons p-icon position-relative" :style="iconStyle(item)" v-if="item.icon">{{ item.icon }}</i>
        </div>
      </div>
      <div :style="titleStyle(item)">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
  import { cloneItem } from "@/utils/helper/object-helper.js";
  export default {
    name: "BottomMenu",
    props: {
      menu: {
        type: Array,
        required: true
      }
    },
    computed: {
      containerStyle() {
        let sub = 0;
        return {
          position: 'fixed',
          zIndex: 9,
          background: 'white',
          borderTop: '1px solid #eee',
          width: '100%',
          bottom: 0
        }
      },
      menuItemStyle() {
        let width = 100 / this.menu.length;
        return {
          width: `${width}%`,
          padding: '5px 0',
          textAlign: 'center',
          height:'50px'
        };
      }
    },
    methods: {
      currentPath(path) {
        return this.$route.path.indexOf(path) > -1;
      },
      imgStyle(item) {
        let deco = {
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        };
        if(this.currentPath(item.link)) {
          deco.backgroundImage = `url("${item.img_before}")`;
        } else {
          deco.backgroundImage = `url("${item.img_after}")`;
        }
        return deco;
      },
      iconStyle(item) {
        let deco = {};

        if(this.currentPath(item.link)) {
          deco = cloneItem(this.brandColor.brand);
        } else {
          deco = cloneItem(this.brandColor.sub);
        }
        return deco;
      },

      titleStyle(item) {
        let deco = {};

        if(this.currentPath(item.link)) {
          deco = cloneItem(this.brandColor.brand);
        } else {
          deco = cloneItem(this.brandColor.sub);
        }
        deco.fontSize = '10px';
        deco.marginTop = '4px';
        return deco;
      },
      hasFeed(item) {
        return item.feed && item.feed !== '' && item.feed !== '0' && item.feed !== 0;
      }
    }
  }
</script>
