<template>
  <!-- 페이지 -->
  <div class="pagination-group">
    <div class="pagination-btn-prev" @click="startPage">
      <i class="material-icons unselect" style="margin-top:5px;margin-right:-18px">keyboard_arrow_left</i>
      <i class="material-icons unselect" style="margin-top:5px">keyboard_arrow_left</i>
    </div>
    <div class="pagination-btn-prev" @click="prevPage">
      <i class="material-icons unselect" style="margin-top:5px">keyboard_arrow_left</i>
    </div>
    <div class="pagination-num" v-for="(n,idx) in calcPageList" :key="'page-'+idx">
        <span
          class="unselect"
          :class="{
            'pagination-num-selected': n === filtered.page_num,
            'pagination-num-not-selected': n !== filtered.page_num,
          }"
          @click="changePage(n)"
          style="font-size:1.2rem">{{ n }}</span>
    </div>
    <div class="pagination-btn-next" @click="nextPage">
      <i class="material-icons unselect" style="margin-top:5px">keyboard_arrow_right</i>
    </div>
    <div class="pagination-btn-next" @click="endPage">
      <i class="material-icons unselect" style="margin-top:5px">keyboard_arrow_right</i>
      <i class="material-icons unselect" style="margin-top:5px;margin-left:-18px">keyboard_arrow_right</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pagination",
    props: {
      filtered: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        pageLengthList: [
          {
            label: '5개씩 보기',
            value: 5
          },
          {
            label: '10개씩 보기',
            value: 10
          },
          {
            label: '20개씩 보기',
            value: 20
          },
          {
            label: '30개씩 보기',
            value: 30
          },
          {
            label: '40개씩 보기',
            value: 40
          },
          {
            label: '50개씩 보기',
            value: 50
          },
          {
            label: '100개씩 보기',
            value: 100
          }
        ],
        page_length:10,
        block: 1,
        start: 1,
        end: 10,
      }
    },
    watch: {
      filtered: {
        handler(val) {
          // console.log('end', this.filtered.total_page);
          if(this.filtered.page_num===1) {
            this.start = 1;
            this.block = 1;
          }
          if(this.start + 9 >= this.filtered.total_page) {
            this.end = this.filtered.total_page;
          }
          else if(this.block===1) {
            this.end = 10;
          }
        },
        deep: true
      },
      'filtered.total_page'(n) {
        //console.log(n)
        // if(this.filtered.total_page<10) this.end = this.filtered.total_page;
        if(this.start + 9 >= this.filtered.total_page) {
          this.end = this.filtered.total_page;
        }
      }
    },
    computed: {
      calcPageList() {
        let page_list = [];
        for(let i=this.start; i<=this.end; i++) {
          page_list.push(i);
        }
        return page_list;
      }
    },
    methods:{
      changePage(num) {
        this.filtered.page_num = num;
        this.filtered.cur_page = num;
        this.check = false;
        this.$emit('getData');
      },
      prevPage() {
        if (this.filtered.page_num - 10 >= 1) {
          this.block -= 1;
          this.start = (this.block-1)*10+1;
          this.end = this.start + 9;
          this.filtered.page_num = this.start;
          this.filtered.cur_page = this.start;
          this.$emit('getData');
        }
      },
      nextPage() {
        if (this.filtered.page_num + 10 <= this.filtered.total_page) {
          this.block += 1;
          this.start = (this.block-1)*10+1;
          if(this.start + 9 >= this.filtered.total_page) {
            this.end = this.filtered.total_page;
          }
          else {
            this.end = this.start + 9;
          }
          this.filtered.page_num = this.start;
          this.filtered.cur_page = this.start;
          this.$emit('getData');
        }
        else {
          let next_block = this.block+1;
          if ((next_block - 1) * 10 + 1 <= this.filtered.total_page) {
            this.block += 1;
            this.start = (this.block - 1) * 10 + 1;
            this.end = this.filtered.total_page;
            this.filtered.page_num = this.start;
            this.filtered.cur_page = this.start;
            this.$emit('getData');
          }
        }
      },
      startPage() {
        this.block = 1;
        this.start = (this.block-1)*10+1;
        if (this.filtered.total_page>10) this.end = this.start + 9;
        else this.end = this.filtered.total_page;
        this.filtered.page_num = 1;
        this.filtered.cur_page = 1;
        this.$emit('getData');
      },
      endPage() {
        let block = Math.floor(this.filtered.total_page/10);
        let remainder = this.filtered.total_page % 10;
        if(remainder > 0) block += 1;
        this.block = block;
        this.start = (this.block-1)*10+1;
        this.end = this.filtered.total_page;
        this.filtered.page_num = this.filtered.total_page;
        this.filtered.cur_page = this.filtered.total_page;
        this.$emit('getData');
      }
    }
  }
</script>

<style lang="stylus" type="stylus" scoped>
  .pagination-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .pagination-btn-prev
  .pagination-btn-next {
    display: inline-block;
    /*height: 25px;*/
  }

  .pagination-num {
    display: inline-block;
  }

  .pagination-btn-prev i
  .pagination-btn-next i {
    color: #18a4ed;
    margin: 4px;
    cursor: pointer;
  }

  .pagination-num {
    padding: 5px 8px;
    cursor: pointer;
    font-size: .9rem;
  }

  .pagination-num-selected {
    color: #18a4ed;
  }

  .pagination-num-not-selected {
    color: #666;
  }
</style>
