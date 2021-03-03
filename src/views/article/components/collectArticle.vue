<template>
  <van-icon :color="isCollect? '#ffa500': ''" :name="isCollect? 'star': 'star-o'" @click="changeCollect" :loading="isLoading" />
  <!-- @click="changeCollect" -->
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'collectActicle',
  components: {},
  model: {
    prop: 'isCollect', // 改变传值的默认键 value
    event: 'change' // 改变传值回去的默认事件名 input
  },
  props: {
    isCollect: { type: Boolean, required: true },
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
    // 改变 是否收藏
    async changeCollect() {
      this.isLoading = true
      try {
        if (this.isCollect) {
          await deleteCollect(this.articleId)
        } else {
          await addCollect(this.articleId)
        }
        this.$emit('change', !this.isCollect)
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
