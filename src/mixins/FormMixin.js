import { formValidate, isValid } from '../utils/helper/form-helper'

export default {
  props: {
    formType: {
      type: Object,
      required: false,
      default: function() {
        return {
          input: 'round',         // round, underline
          button: 'round',
          box: 'round',
          list: 'horizontal',     // 라디오 버튼 등 가로/세로 정렬(vertical, horizontal)
          label: true,
          align: 'block',        // 가로 정렬(block, center, space-between, flex-start, flex-end)
          inputIcon: false,
          dropdown: 'list',      // list, modal
          vErrorNotShown: false  // 에러메시지 비노출 여부
        }
      },
    },
    labelCustomStyle: {
      type: Object,
      required: false
    },
    inputCustomStyle: {
      type: Object,
      required: false
    },
    inputDateStyle: {
      type: Object,
      required: false
    },
    inputTimeStyle: {
      type: Object,
      required: false
    },
    imgUploaderStyle: {
      type: Object,
      required: false
    },
    gutter: {
      type: Number,
      required: false
    },
    value: {
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: false
    },
    options: {
      required: false
    },
    validate: {
      type: Object,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    // 폼 요소들 상위에서 자식 폼 요소들 전체 validation check 감지
    checkValid: {
      type: Boolean,
      default: false,
      required: false
    }
  },

  data() {
    return {
      checkValidValue: false
    }
  },

  watch: {
    checkValid(n) {
      if (n) {
        // method chkValid가 존재할 경우
        if (typeof(this.chkValid)==='function') {
          this.chkValid();
        }
      }
    }
  },

  methods: {
    // 폼 구성하는 데이터 마다 elType 추가
    // 동적 컴포넌트 호출시 elType에 맞춰서 컴포넌트 띄움
    setForm(formData) {
      formData.forEach(item => {
        item.elType = this.formatChanger(item.format);

        // valid required true일때 * 추가
        if(item.label && item.validate.valid_required) {
          item.label = '*' + item.label;
        }

        // CRadiobuttonGroup일때, options에 value 추가
        if(['CRadiobuttonGroup', 'CCheckboxGroup'].indexOf(item.format)>-1) {
          item.options.forEach(item=>{
            if(item.id)
              item.value = item.id;
          });
        }

        item.type = item.elType.replace('c-input-','');
        if(item.type === 'checkboxArray')  {
          item.value = false;
        }
        else if(item.value === undefined) {
          if(item.type === 'checkbox-group' || item.type === 'tag') {
            item.value = [];
          } else {
            item.value = '';
          }
        }
      });
      return formData;
    },
    formatChanger(format) {
      switch(format) {
        case 'CInput_text':
          return 'c-input-text';
        case 'CInput_number':
          return 'c-input-number';
        case 'CInput_password':
          return 'c-input-password';

        case 'CInput_email':
          return 'c-input-email'

        case 'CInput_phone':
          return 'c-input-phone';

        case 'CAddress':
          return 'c-input-address';

        case 'CBankAccount':
          return 'c-input-bank-account';

        case 'CCasCadingDropDown':
          return 'c-input-cascading-dropdown';

        case 'CInput_checkbox':
          return 'c-input-checkbox';

        case 'CgCheckboxTextarea':
          return 'c-input-checkbox-textarea';

        case 'CgCheckboxArray':
          return 'c-input-checkboxArray';

        case 'CCheckboxGroup':
          return 'c-input-checkbox-group';

        case 'CDate':
          return 'c-input-date';

        case 'CDateTime':
          return 'c-input-datetime';

        case 'CDropdown':
          return 'c-input-dropdown';

        case 'CFileUploader':
          return 'c-input-fileUploader';

        case 'CImgUploader':
          return 'c-input-imgUploader';

        case 'CImgUploaderArray':
          return 'c-input-imgUploaderArray';

        case 'CRadiobuttonGroup':
          return 'c-input-radiobuttonGroup';

        case 'CRadioFullButtonGroup':
          return 'c-input-radio-full-buttonGroup';

        case 'CRating':
          return 'c-input-rating';

        case 'CRegionForm':
          return 'c-input-regionForm';

        case 'CRange':
          return 'c-input-range';

        case 'CInput_textarea':
          return 'c-input-textarea';

        case 'CInputEditor':
          return 'c-input-editor';

        case 'CTime':
          return 'c-input-time';

        case 'CInputTag':
          return 'c-input-tag';

        case 'CInputVideo':
          return 'c-input-video';

        case 'CInput_emailSelect':
          return 'c-input-email-select';

      }
    },
    // form Data 유효성 체크
    formValidate(data, toast) {
      return formValidate(data, toast);
    },
    // formdata의 value 값이 있을 경우 유효성 체크
    isValid(properties, label) {
      return isValid(properties, label);
    },
    // post 요청 param 데이터 만들기
    getParamData(formData) {
      this.checkValidValue = true;

      let password_new = find(formData, 'field', 'password');
      let password_re = find(formData, 'field', 'password_re');

      if (password_new !== undefined &&
        password_new.validate.required &&
        password_new.validate.valid_required &&
        password_re !== undefined &&
        password_re.validate.required &&
        password_re.validate.valid_required
      ) {
        if (password_new.value !== undefined && password_re.value !== undefined &&
          password_new.value !== password_re.value) {
          this.toast("비밀번호가 일치하지 않습니다.");
          return { 'enable': false };
        }
      }

      let enable = true;
      let params = {};
      params['params'] = [];

      formData.some(item=>{
        // 유효성 체크
        let res = this.formValidate(item, this.toast);

        let value = '';
        if (res === '_!valid_false') {
          enable= false;
          return true;    // 유효성 체크 false / Break;
        }
        else {
          value = res;
        }

        // 맞춤 디비일 경우
        if( item.is_param ) {
          let param = {
            param_id: item.id,
            param_type: item.param_type,
            value: value
          };
          params.params.push(param);
        }
        // 맞춤 아닐 경우
        else {
          //console.log(item.field, value);
          params[item.field] = value;
        }
      })

      return { 'enable': enable, 'params': params }
    },
    // counsel request 데이터 만들기 - (answers 부분)
    setCounselForm(formData) {
      let enable = true;
      let result = [];

      formData.some(item=>{
        // 유효성 체크
        let res = this.formValidate(item, this.toast);

        let value = '';
        if (res === '_!valid_false') {
          enable= false;
          return true;    // 유효성 체크 false / Break;
        }
        else {
          value = res;
        }

        // answer 데이터 만들기
        let answer = item.value;
        if (item.elType === 'c-input-checkbox-group') {
          answer = ''
          for (let k=0; k<item.value.length; k++) {
            if (k<item.value.length-1) {
              answer += `${item.value[k]}, `
            }
            else if (k===item.value.length-1) {
              answer += `${item.value[k]}`
            }
          }
        }
        else if (item.elType === 'c-input-regionForm') {
          answer = `${item.value.sido.label} ${item.value.sigungu.label}`
        }
        result.push({
          answer: answer,
          question: item.name
        })
      })

      return { 'enable': enable, 'result': result };
    },
    // 삭제할 폼 데이터
    removeFormData(field) {
      for(let i=0; i<this.formData.length; i++) {
        if(this.formData[i].field===field) {
          this.formData.remove(i);
          break;
        }
      }
    },
    // 추가할 폼 데이터
    addFormData(data) {
      data.forEach(d => {
        let field =  find(this.formData, 'field', d.field);
        if(!field) this.formData = this.formData.concat(this.setForm(data));
      })
    }
  },

  computed: {
    containerStyle() {
      let deco = {};

      // flex일 경우
      if (this.formType
        && this.formType.align!==undefined
        && this.formType.align!=='block') {
        deco.display = 'flex';
        deco.justifyContent = this.formType.align;
      }

      let gutter = this.gutter !== undefined ? this.gutter : 24;
      deco.marginTop = gutter + 'px';

      return deco;
    },
    labelStyle() {
      if(this.labelCustomStyle) {
        return this.labelCustomStyle;
      }

      let deco = {};
      deco = {
        margin: '20px 0 6px 0',
        fontSize: '14px',
        color: this.getColor('보조 내용 색상')
      };
      if (this.formType.align!=='block') deco.margin = 0;
      return deco;
    },
    inputStyle() {
      // console.log(this.name);
      // console.log(this.inputCustomStyle.border);
      if(this.inputCustomStyle)
        return this.inputCustomStyle;
      if(this.inputDateStyle)
        return this.inputDateStyle;
      if(this.inputTimeStyle)
        return this.inputTimeStyle;

      let deco = {
        border: this.brandBorder.main.color,
        padding: '12px',
        fontSize: '14px'
      };

      switch (this.formType && this.formType.input) {
        case 'round':
          deco.borderRadius = this.radius;
          deco.border = `1px solid ${this.brandBorder.main.color}`;
          break;
        case 'underline':
          deco.borderBottom = this.brandBorder.main.color;
          break;
      }

      return deco;
    },
    buttonStyle() {
      let deco = {
        border: 0,
        padding: '10px 20px',
        fontSize: '14px',
        color: this.brandColor.main,
      };

      switch (this.formType && this.formType.button) {
        case 'round':
          deco.borderRadius = this.radius.borderRadius;
          deco.border = `1px solid ${this.brandBorder.main}`;
          deco.backgroundColor = this.brandBorder.sub;
          break;
        case 'underline':
          deco.borderBottom = `1px solid ${this.brandBorder.main}`;
          deco.backgroundColor = this.brandBorder.main;
          break;
      }

      return deco;
    },
    boxStyle() {
      let deco = {
        border: 0,
        width: '18px',
        height: '18px'
      };

      switch (this.formType && this.formType.box) {
        case 'round':
          deco.borderRadius = '4px';
          deco.border = `1px solid ${this.brandBorder.main.color}`;
          break;
      }

      return deco;
    },
    checkStyle() {
      let deco = {
        fontSize: '16px',
        backgroundColor: this.brandBgColor.primary.backgroundColor,
        borderRadius:'4px',
        color: 'white'
      };

      return deco;
    },
    listStyle() {
      let deco = {};

      switch (this.formType && this.formType.list) {
        case 'horizontal':
          deco.display = 'flex';
          break;
        case 'vertical':
          deco.display = 'block';
      }

      return deco;
    },
    dropdownStyle() {
      let deco = {
        padding: '8px 16px',
        fontSize: '14px'
      };

      switch (this.formType && this.formType.input) {
        case 'round':
          deco.borderRadius = this.radius.borderRadius;
          deco.border = `1px solid ${this.brandBorder.main.color}`;
          break;
        case 'underline':
          deco.borderRadius = 0;
          deco.borderBottom = `1px solid ${this.brandBorder.main.color}`;
          break;
      }

      return deco;
    },
    deleteIconStyle() {
      return {
        backgroundColor: 'rgb(221, 221, 221)',
        color: 'white',
        borderRadius: '14px',
        fontSize: '14px',
        right: '12px',
        top: '10px',
        padding: '2px',
        position: 'absolute'
      };
    }
  }
}
