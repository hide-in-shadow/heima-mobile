<template>
  <div class="search-result">
    <van-list v-model="loading" :error.sync="error" error-text="加载失败，点击重新加载" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, i) in searchList" :key="i">
        <span slot="title" v-html="searchHightLight(item.title)"></span>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search.js'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchText: { type: String, required: true }
  },
  data() {
    return {
      // 列表 配置
      searchList: [],
      error: false,
      loading: false,
      finished: false,
      // 请求 参数
      page: 1,
      perPage: 20
    }
  },
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearch({
          page: this.page, // 页码
          per_page: this.perPage, // 每页大小
          q: this.searchText // 搜索关键字
        })
        // 将 获取 的数据 添加到 articleList 尾部
        this.searchList.push(...data.data.results)
        // console.log(data.data)
        // 本次更新完成 将 loading 设置为 false
        this.loading = false
        // 判断 本次获取 的 数据列表长度
        if (data.data.results.length) {
          this.page++ // 下一页数据 的 页码
        } else {
          this.finished = true // 长度为false 表示全部加载完毕
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    // 替换 结果 高亮
    searchHightLight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.search-result {
  /deep/ .active {
    color: red;
  }
}
</style>
