<template>
   <div class="pagination">
    <!-- 当前页码等于1就不可操作 -->
    <button :disabled="myCurrentPage===1" @click="setCurrentPage(myCurrentPage-1)">上一页</button>
    <!-- 只有start大于1 -->
    <button v-if="startEnd.start>1" @click="setCurrentPage(1)">1</button>
    <!-- 只有start大于2 -->
    <button disabled v-if="startEnd.start>2">···</button>
``
    <!-- 连续页码 -->
    <button v-for="num in startEnd.end" v-if="num>=startEnd.start" :class="{active: num===myCurrentPage}"
      @click="setCurrentPage(num)">
      {{num}}
    </button>
    <!-- v-for的优先级高于v-if:先执行v-for的遍历，每遍历一个再进行v-if的判断  面试题 -->
    <!-- 只有end<totalPages-1才显示  -->
    <button disabled v-if="startEnd.end<totalPages-1">···</button>
    <!-- 只有end<totalPages才显示 -->
    <button v-if="startEnd.end<totalPages" @click="setCurrentPage(totalPages)">{{totalPages}}</button>
    <!-- 当前页码等于总页码totalPages就不可操作 -->
    <button :disabled="myCurrentPage===totalPages" @click="setCurrentPage(myCurrentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
    name:"Pagination",

    props:{
        currentPage:{ //当做页码
            type: Number,
            default:1
        },
        pageSize:{ //每一页数量
            type:Number,
            default:10
        },
        total:{ //总数量
            type:Number,
            default:0
        },
        showPageNo:{ //连续页码数
            type:Number,
            default:5  //最好指定奇数
        },

    },
    data () {
            // 将外部传入的页码作为当前组件的当前面页码初始值
        return{
            myCurrentPage:this.currentPage //保存当前页面码
        }
    },
    computed:{
        /*
        总页码数
        依赖数据：
            总数量：total
            每页数量：pageSize
        */
       totalPages () {
           //取出依赖数据    31 5 => 7
           const {total,pageSize} = this
            // 返回计算后的结果
            return Math.call(total/pageSize)
       },
       /*
       返回连续页码的开始页码(start)与结束页码(end):
       比如：{start；3，end:7}
       依赖数据：
            当前页码：mcPage
            最大连续页码数：showPageNo
            总页码数:totalPages
        注意：
            start的最小值为1
            end的最大值为totalPages
            start与end之间的最大差值为:showPageNo-1
       */
      startEnd(){
          let start,end
          const {myCurrentPage,showPageNo,totalPages} = this

          //计算start
          /*
          myCurrentPage showPageNo   totalPages    start到end
            4            5            10            23[4]56
          */
          start = myCurrentPage - Math.floor(showPageNo/2) // 4 -2
         if(start<1){
             start = 1
         }
          end = start + showPageNo - 1  
            /*
                myCurrentPage,  showPageNo,  totalPages
                     7              5            8          456[7]8  
            */
         if (end > totalPages) {
             end = totalPages
             // 根据最大连续页码修正start
             start = end = showPageNo + 1
             /*myCurrentPage,  showPageNo,  totalPages
                    3               5           4
                上面算出的start = 0   end = 4    01234不对
             */
                
             if (start<1){
                 start = 1
             }
         }
         return {start,end}
      }
    },
    watch:{
        /*
        当接收的currentPage发生变化时调用
        */
       currentPage (value){  // 父组件改变了其对应的当前页码数据时，此回调函数就会自动调用
           //更新内部的当前页码
           this.myCurrentPage = value // 也可以this.currentPage
       }
    },

    methods:{
        /*
        将当前页码改为指定页码
        */
       setCurrentPage(page){
           //修改当前页码     一定要是更新自己data中的当前页码，而不是更新接收的currentPage属性
           this.myCurrentPage = currentPage
           // 通知外部父组件     分发vue自定义事件：通知父组件，当前页码变化了
           this.$emit('currentChange',currentPage)
       }
    }
}
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>