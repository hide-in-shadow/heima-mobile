<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮 -->
    <form action="/">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" background="#3296FA" />
    </form>

    <!-- 搜索历史记录 -->
    <searchHistory />

    <!-- 联想建议 -->
    <searchSuggestion />

    <!-- 历史记录 -->
    <searchResult />
  </div>
</template>

<script>
import searchHistory from './components/search-history'
import searchSuggestion from './components/search-suggestion'
import searchResult from './components/search-result'
export default {
  name: 'search',
  components: {
    searchHistory,
    searchSuggestion,
    searchResult
  },
  props: {},
  data() {
    return {
      searchText: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    onSearch(val) {
      this.$toast(val)
    },
    onCancel() {
      this.$toast('取消')
    }
  },
  computed: {},
  watch: {}
}
</script>
<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff;
  }
}
</style>
