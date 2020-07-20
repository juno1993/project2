<template>
  <button class="p-button unselect"
          :style="[radius, buttonStyle, color, backgroundColor, customStyle]" 
          @click="clickBtn"><slot></slot></button>
</template>

<script>
  export default {
    name: "Btn",
    props: {
      color: {
        type: Object,
        required: false
      },
      backgroundColor: {
        type: Object,
        required: false
      },
      width: {
        type: Number,
        required: false
      },
      customStyle: {
        type: Object,
        required: false
      },
      // Google Analytics 세팅할 경우
      ga: {
        type: Object,
        required: false
      }
    },
    computed: {
      buttonStyle() {
        let width = this.width;
        if(width === undefined)
          width = '100%';
        else
          width += 'px';

        return {
          width: width,
          border: 0,
          height: '48px',
          lineHeight: '48px',
          textAlign: 'center',
          fontSize: '15px',
          fontWeight: 'bold'
        }
      }
    },
    methods: {
      clickBtn() {
        // Google Analytics 세팅
        if (this.ga) {
          let param1 = this.ga.param1 ? this.ga.param1 : '';
          let param2 = this.ga.param2 ? this.ga.param2 : '';
          let param3 = this.ga.param3 ? this.ga.param3 : '';
          let param4 = this.ga.param4 ? this.ga.param4 : '';
          this.setGa(param1, param2, param3, param4);
        }

        this.$emit('clicked');
      }
    }
  }
</script>

<style scoped>

</style>