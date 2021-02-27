<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" success-text="刷新成功">
      <van-list class="heima" v-model="loading" :error.sync="error" error-text="加载失败，点击重新加载" @load="getArticleList" :finished="finished" finished-text="没有更多了">
        <articleItem v-for="(item,i) in articleList" :key="i" :item="item"></articleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/user'
import articleItem from './article-item/index.vue'
export default {
  name: 'articleList',
  components: {
    articleItem
  },
  props: ['newsNav'],
  data() {
    return {
      list: [],
      // 列表数据 及 配置
      articleList: [],
      error: false,
      loading: false,
      finished: false,
      // 发送请求 时间戳
      timestamp: null,
      // 下拉刷新
      refreshing: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 刷新 列表函数
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.newsNav.id, // 频道 id
          timestamp: Date.now(), // 时间戳
          with_top: 1 // 是否包含置顶
        })
        // 将 获取 的数据 添加到 articleList 尾部
        this.articleList.push(...data.data.results)
        this.$toast.success('刷新成功')
        this.refreshing = false
      } catch (err) {
        this.refreshing = false // 关闭下拉刷新的 loading 状态
        this.$toast.fail('刷新失败')
      }
    },
    // 获取 现在列表及历史列表 函数
    async getArticleList() {
      try {
        const { data } = await getArticleList({
          channel_id: this.newsNav.id, // 频道 id
          timestamp: this.timestamp ? this.timestamp : Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // 将 获取 的数据 添加到 articleList 尾部
        this.articleList.push(...data.data.results)
        // console.log(data.data)
        // 本次更新完成 将 loading 设置为 false
        this.loading = false
        // 判断 本次获取 的 数据列表长度
        if (data.data.results.length) {
          // 获取 下一页数据 的 时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true // 长度为false 表示全部加载完毕
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    }
  },
  computed: {},
  watch: {}
}
</script>
<style scoped lang="less">
</style>
