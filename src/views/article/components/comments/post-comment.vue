<template>
  <div class="post-comment">
    <van-field class="post-field" v-model.trim="message" rows="2" autosize type="textarea" maxlength="50" placeholder="优质评论将会被优先展示" show-word-limit />
    <van-button type="primary" size="small" class="post-btn" @click="add" :disabled="message===''">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comments'
export default {
  name: 'postComment',
  components: {},
  // 注入 可以从祖先组件中引入 数据 祖父组件provide 提供
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: { type: [Number, String, Object], required: true }
  },
  data() {
    return {
      message: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    async add() {
      if (this.message === '') return this.$toast('评论内容不能为空')
      try {
        const data = await addComment({
          target: this.target.toString(),
          content: this.message,
          art_id:
            this.articleId.toString() === this.target.toString()
              ? null
              : this.articleId.toString()
        })
        console.log(data)
        this.message = ''
        if (data.status !== 201) {
          return this.$toast('评论失败，请重试！')
        }
        // 返回的数据中没有 is_liking 所以需要添加
        data.data.data.new_obj.is_liking = false
        this.$emit('add', data.data.data.new_obj) // 执行了添加评论操作
        this.$toast('评论成功')
      } catch (err) {
        console.log(err)
        this.$toast('评论添加失败')
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background-color: #f5f7f9;
    margin-right: 15px;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    &::before {
      display: none;
    }
  }
}
</style>
