<template>
  <div :style="containerStyle">

    <!-- 레이블 -->
    <div v-if="formType.label && label" :style="labelStyle">{{ label }}</div>

    <!-- 인풋 -->
    <div class="flex-align
                full-width
                position-relative">

      <!-- 아이콘 -->
      <!--<i v-if="icon.enable"
        class="material-icons"
        :style="iconStyle">
        {{ properties.icon }}
      </i>-->

      <!-- input -->
      <div
        class="flex-align full-width"
        :class="{'input-disabled': disabled===true}">
        <div v-if="prefix" :style="brandColor.brand" style="padding-right: 8px">{{ prefix }}</div>

        <input
          class="input"
          :style="computedInputStyle"
          ref="input"
          :type="type"
          :value="inputValue"
          min="0"
          :maxlength="maxLength"
          @keyup.enter="$emit('onEnter')"
          @blur="chkValid"
          :placeholder="placeholder"
          @input="e => onKeyup(e.target.value)"
          :readonly="disabled===true">
      </div>

      <!-- 삭제 아이콘 -->
      <i v-if="deleteIcon
              && value"
        class="material-icons unselect"
        :style="deleteIconStyle"
        @click="clear">clear</i>

    </div>

    <!-- 에러메세지 -->
    <div v-if="errorMsg!=='' && !formType.vErrorNotShown"
         :style="errorStyle"
         class="lp-error-msg">{{ errorMsg }}
    </div>

  </div>
</template>

<script>
  import FormMixin from '@/mixins/FormMixin'

  export default {
    mixins: [
      FormMixin
    ],

    props: {
      type: {
        type: String,
        required: false,
        default: 'text'
      },
      deleteIcon: {
        type: Boolean,
        required: false
      },
      validate: {
        type: Object,
        required: false
      },
      prefix: {
        type: String,
        required: false
      }
    },

    created() {
      if(this.value) {
        this.inputValue = this.value;
        if(this.type === 'number') {
          this.inputValue = this.inputValue.replace(/-/gi, '');
        }
      }
    },

    mounted() {
      this.computeInputStyle();
      if(this.validate) {
        this.valid = this.validate;
      }
    },

    data() {
      return {
        inputValue: '',
        errorMsg: '',
        keyup: false,
        valid: {
          valid_required: false,
          error_msg: '',
          max_length:100,
          min_length:0,
          alpha_s: true,
          alpha_g: true,
          special: true,
          num: true
        },
        computedInputStyle: undefined
      };
    },

    watch: {
      value(n) {
        this.inputValue = n;
      }
    },

    computed: {
      maxLength() {
        if (this.validate)
          return this.validate.max_length ? this.validate.max_length : 50;
      },
      inputFormStyle() {
        let deco = {};
        deco.color = this.inputStyle.color;
        return deco;
      },
      iconStyle() {
        let styles = this.cloneItem(this.styles.input.icon);
        let deco = this.decoToStyle(styles);
        deco.position = 'absolute';
        if (this.styles[this.type].icon.direction==='left') deco.right = 'unset';
        else if (this.styles[this.type].icon.direction==='right') deco.left = 'unset';
        return deco;
      },

      errorStyle() {
        let deco = {
          color: this.brandBgColor.alert
        };
        return deco;
      },
    },

    methods: {
      computeInputStyle() {
        let deco = this.inputStyle;
        let color = this.brandBorder.main;
        if(this.errorMsg !== '') {
         color = this.brandBgColor.alert.backgroundColor;
        }

        switch (this.formType && this.formType.input) {
          case 'round':
            deco.borderRadius = this.radius.borderRadius;
            deco.border = `1px solid ${color}`;
            break;
          case 'underline':
            deco.borderBottom = `1px solid ${color}`;
            break;
        }

        this.computedInputStyle = deco;
      },
      onKeyup(value) {
        this.inputValue = value;

        if (this.type === 'phone') {
          this.inputValue= autoHyphenPhone(this.inputValue);
        }
        // 숫자 타입일 때, 최대값이 설정된 경우 그 값이상 못 올라가도록 설정
        else if(this.type === 'number') {
          this.inputValue.replace('-','');
          let max = this.validate.max_length;
          if(max && max > 0) {
            if(parseInt(this.inputValue) > max) {
              this.inputValue= max;
            }
          }
        }

        //console.log('input_', this.inputValue);
        this.$emit('update:value', this.inputValue);
      },
      chkValid() {
        //console.log(this.value)
        // validation이 필수가 아닌 경우
        if (!this.validate.valid_required) return;

        let props = {
          value: this.value,
          type: this.type,
          validate: this.validate
        }

        this.errorMsg = this.isValid(props, this.name);
        this.validate.error_msg = this.errorMsg;
        // this.valid.error_msg = this.errorMsg;
        this.computeInputStyle();
      },
      clear() {
        this.inputValue = '';
        this.$emit('update:value', this.inputValue);
      }

    }
  }
</script>

<style lang="stylus" type="stylus" scoped>

  .c-input-text-container
    width 100%

  .label
    display block

  input
    border 0
    flex 1
    background-color transparent !important
    -webkit-appearance 'none'
    -webkit-border-radius 0

  textarea:focus
  input:focus
    outline none

  .lp-error-msg
    color #e80000
    font-size 0.7rem
    margin-top 4px
    width: 100%

  textarea
    width 100%
    height 100%
    overflow hidden
    border 0
    resize none

  .input-disabled
    border 1px solid #eee
    background-color #eee
    color #777

</style>
