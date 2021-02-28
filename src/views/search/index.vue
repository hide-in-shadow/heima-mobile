<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form action="/">
      <van-search v-model="searchText" clear-trigger="always" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="$router.push('/')" @input='onCancel' @clear='onCancel' background="#3296FA" />
    </form>

    <!-- 搜索结果 -->
    <searchResult v-if='isResult' :searchText='searchText' />
    <!-- 联想建议 -->
    <searchSuggestion v-else-if="searchText" :searchText='searchText' @search='onSearch' />
    <!-- 搜索历史记录 -->
    <searchHistory v-else @search='onSearch' />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
export default {
  name: 'search',
  components: {
    searchResult,
    searchSuggestion,
    searchHistory
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResult: false // 控制是否显示搜索结果
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 回车或确定触发 点击联想选项或历史选项 改变input框并触发
    onSearch(value) {
      this.isResult = true
      this.searchText = value
      if (!this.token) {
        const arr = getItem('hostoryList')
        // 如果 关键字相同 则先 去除 相同 再添加
        const i = arr.findIndex((e) => e === value)
        if (i !== -1) {
          arr.splice(i, 1)
        }
        // unshift() 添加到数组第一项 改变原数组
        arr.unshift(value)
        setItem('hostoryList', arr)
      }
    },
    // 清除 取消 或者 input框变化 触发
    onCancel() {
      this.isResult = false
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {}
}
</script>
<style scoped lang="less">
.search-container {
  padding-top: 106px;
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
    &:active {
      background-color: #007cf8;
    }
  }
}
</style>
