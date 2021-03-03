<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in commentList" :key="item.art_id">
        <!-- 评论每一项 -->
        <commentItem :item="item"></commentItem>
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comments'
import commentItem from './comment-item'
export default {
  name: 'articleComment',
  components: {
    commentItem
  },
  model: {
    prop: 'isAdd', // 改变传值的默认键 value
    event: 'change' // 改变传值回去的默认事件名 input
  },
  props: {
    articleId: { type: [Number, String, Object], required: true },
    addObject: { type: Object, required: true }
  },
  data() {
    return {
      commentList: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      totalCount: 0 // 总数据条数
    }
  },
  created() {
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章的评论，c-对评论的回复
          source: this.articleId.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10 // 每页大小
        })
        // console.log(data)
        this.commentList.push(...data.data.results)
        // console.log(this.commentList)
        this.offest = data.last_id // 获取下次请求的偏移量
        this.$emit('getTotal', data.data.total_count) // 向父组件传数据总量
        // console.log(this.commentList)
        this.loading = false // 加载状态结束
        // 数据全部加载完成
        if (this.offest === data.end_id) {
          this.finished = true
        }
      } catch (err) {
        this.$toast('获取失败')
      }
    }
  },
  computed: {},
  watch: {
    // 监控父组件传过来的参数 如果参数变化 则重新渲染列表
    addObject: {
      handler(newValue, oldValue) {
        this.commentList.unshift(newValue)
      },
      deep: true, // 深度监听
      immediate: false // 是否首次监听
    }
  }
}
</script>

<style scoped lang="less">
</style>
