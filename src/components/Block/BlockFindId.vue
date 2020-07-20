<template>
  <div class="full-width">

    <!-- 아이디 찾기 -->
    <div v-if="!accounts">
      <component
        :is="form.elType"
        v-for="form in formData"
        :key="`form${form.id}`"
        v-bind="form"
        :value.sync="form.value"
        :checkValid="checkValidValue"></component>
      <div class="flex-end" style="margin-top: 24px">
        <btn @clicked="find"
          :color="brandColor.white"
          :backgroundColor="brandBgColor.brand">아이디 찾기</btn>
      </div>
    </div>

    <!-- 결과값 -->
    <div v-if="accounts && accounts.length > 0" style="margin-top:20px;">
      <div v-for="(item,idx) in accounts" :key="`id${idx}`"
        class="size-14 weight-500 margin-bottom-4"
        :style="brandColor.main">
        <span> · </span>
        <span>{{ item.username }}</span>
      </div>
      <div class="flex-end" style="margin-top: 36px">
        <btn @clicked="confirm"
          :color="brandColor.white"
          :backgroundColor="brandBgColor.brand">확인</btn>
      </div>
    </div>

  </div>
</template>

<script>
  import FormMixin from "@/mixins/FormMixin"
  import Btn from "@/components/Common/Btn";

  export default {
    name: 'BlockFindId',
    mixins: [
      FormMixin
    ],
    components: { Btn },
    created() {
      this.formData = this.setForm(this.formData);
    },
    data() {
      return {
        accounts: undefined,
        checkValidValue: false,
        formData: [
          {
            id: 0,
            name: '이름',
            field: 'username',
            label: '이름',
            placeholder: '이름을 입력하세요',
            format: 'CInput_text',
            validate: {
              required: true,          // 값 필수 여부
              valid_required: true,     // validation 필수 여부
              min_length: 1,            // 최소 문자 수
              max_length: 30,           // 최대 문자 수
              alpha_s: true,            // 알파벳 소문자
              alpha_g: true,            // 알파벳 대문자
              num: true,                // 숫자
              special: true             // 특수문자
            },
            value: ''
          },
          {
            id: 1,
            name: '연락처',
            field: 'phone',
            label: '연락처',
            placeholder: '연락처을 입력하세요',
            format: 'CInput_phone',
            validate: {
              required: true,          // 값 필수 여부
              valid_required: true,     // validation 필수 여부
              min_length: 1,            // 최소 문자 수
              max_length: 30,           // 최대 문자 수
              alpha_s: true,            // 알파벳 소문자
              alpha_g: true,            // 알파벳 대문자
              num: true,                // 숫자
              special: false             // 특수문자
            },
            value: ''
          },
        ]
      }
    },
    methods: {
      find() {
        this.checkValidValue = true;
        let result = this.getParamData(this.formData);
        if (result.enable) {
          this.$axios.get(`auth/user/findid`, {params: result.params})
          .then(res => {
            if (res.status===200) {
              this.accounts = res.data;
            }
          })
          .catch(err=> {
            this.toast(err.response.data.message);
          })
        }
      },
      confirm() {
        this.accounts = undefined;
        this.$emit('confirm');
      }
    }
  }
</script>
