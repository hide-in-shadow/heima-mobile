<template>
  <div class="search-suggestion">
    <van-cell v-for="(item,i) in suggestions" :key='i' icon="search" @click="$emit('search', item)">
      <span slot="title" v-html="searchHightLight(item)"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
// lodash 按需加载 防抖模块，有利于打包结果优化
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  components: {},
  props: {
    searchText: { type: String, required: true }
  },
  data() {
    return {
      suggestions: []
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 根据 关键字 获取 联想搜索列表
    async searchSuggestion(text) {
      try {
        const { data } = await getSearchSuggestion(text)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    // 用于 替换 联想列表 高亮
    searchHightLight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // 简单正则替换无法插入 响应式数据
      // 使用 RegExp 构造函数创建了一个正则表达式对象 代替正则表达式
      // new RegExp(pattern, attributes)
      //  pattern：匹配模式字符串，它会根据这个字符串创建正则对象
      //  attributes：匹配模式，g 全局匹配 i 大小写不敏感匹配
      // text.replace(/匹配的内容/gi, highlightStr)
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 监视的处理函数 添加 防抖
      // debounce 参数1：函数 参数2：防抖时间 返回值：防抖之后的函数
      handler: debounce(function (val) {
        this.searchSuggestion(val)
        // console.log(val)
      }, 1000),
      // 首次监视触发
      immediate: true
    }
  }
}
</script>
<style scoped lang="less">
.search-suggestion {
  /deep/ .active {
    color: red;
  }
}
</style>
