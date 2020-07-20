<template>
  <c-input-text v-bind="$props"
                :value.sync="inputValue"
                type="email"></c-input-text>
</template>

<script>
  import CInputText from "./CInputText";
  import FormMixin from "@/mixins/FormMixin";

  export default {
    components: {CInputText},
    name: "c-input-email",
    mixins:[
      FormMixin
    ],
    props: {
      value: {
        type: [String, Number],
        required:false
      },
      label: {
        type: String,
        required: false
      },
      placeholder: {
        type: String,
        required: false
      },
      disabled: {
        type: Boolean,
        required: false
      },
      visibleTitle: {
        type: Boolean,
        required: false
      },
      validate: {
        type: Object,
        required: false
      },
      name: {
        type: String,
        required: true
      }
    },
    watch: {
      inputValue(n) {
        this.$emit('update:value', n);
      }
    },
    data() {
      return {
        inputValue: ''
      }
    },
    created() {
      if(this.value) this.inputValue = this.value;
    }
  }
</script>
