<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多评论了" @load="onLoad">
      <van-cell v-for="item in list" :key="item.art_id">
        <!-- 评论每一项 -->
        <commentItem :item="item" @show="$emit('show', item)"></commentItem>
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
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
  props: {
    id: { type: [Number, String, Object], required: true },
    list: { type: Array, required: true },
    type: {
      type: String,
      // 自定义 prop 数据验证
      validator(value) {
        // value 就是传过来的值 只能是 a或c
        return ['a', 'c'].includes(value)
      },
      default: 'a' // 默认值
    }
  },
  data() {
    return {
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, // 请求下一页数据的页码
      limit: 20 // 获取评论个数
    }
  },
  created() {
    if (this.type === 'a') {
      this.onLoad()
    }
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          type: this.type, // 评论类型，a-对文章的评论，c-对评论的回复
          source: this.id.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 每页大小
        })
        // console.log(data)
        this.list.push(...data.data.results)
        this.offest = data.last_id // 获取下次请求的偏移量
        if (this.type === 'a') {
          // 向父组件传数据总量
          this.$emit('getTotal', data.data.total_count)
        }
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
  watch: {}
}
</script>

<style scoped lang="less">
</style>
