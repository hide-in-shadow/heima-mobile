<template>
  <van-icon :color="isLike === 1 ? 'red' : ''" :name="isLike === 1?'good-job':'good-job-o'" @click="changeLike" :loading="isLoading" />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name: 'likeActicle',
  components: {},
  model: {
    prop: 'isLike', // 改变传值的默认键 value
    event: 'change' // 改变传值回去的默认事件名 input
  },
  props: {
    isLike: { type: [Number, String], required: true },
    articleId: { type: [Number, String, Object], required: true }
  },
  data() {
    return {
      isLoading: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 改变 是否点赞
    async changeLike() {
      this.isLoading = true
      try {
        if (this.isLike === 1) {
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
        }
        this.$emit('change', this.isLike === 1 ? 0 : 1)
      } catch (err) {
        // console.log(err)
        this.$toast.fail('操作失败')
      }
      this.isLoading = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
</style>
