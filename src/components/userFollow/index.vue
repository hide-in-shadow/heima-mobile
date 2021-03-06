<template>
  <van-button v-if="isFollow" class="follow-btn" round size="small" :loading="isFollowLoading" @click="changeFollow()">取消关注</van-button>
  <van-button v-else class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus" :loading="isFollowLoading" @click="changeFollow()">关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/article'
export default {
  name: 'userFollow',
  components: {},
  model: {
    prop: 'isFollow', // 改变传值的默认键 value
    event: 'change' // 改变传值回去的默认事件名 input
  },
  props: {
    isFollow: { type: Boolean, required: true },
    userId: { type: [Number, String, Object], required: true }
  },
  data() {
    return {
      isFollowLoading: false // 控制关注按钮的loading状态
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 改变 是否关注
    async changeFollow() {
      // 开启 Loading 防止 用户多次点击触发
      this.isFollowLoading = true
      try {
        // 如果已关注，则取消关注
        if (this.isFollow) {
          this.$toast('取消关注接口有些问题，刷新即可')
          await deleteFollow(this.userId)
        } else {
          // 否则添加关注
          await addFollow(this.userId)
        }
        // 更新视图
        this.$emit('change', !this.isFollow)
        // 在视图更新完后 才会触发 需要一个返回值
        this.$nextTick(() =>
          this.$toast(this.isFollow ? '取消关注' : '关注成功')
        )
      } catch (err) {
        // console.log(err)
        if (err.response && err.response.status === 400) {
          return this.$toast.fail('不能关注自己')
        }
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.follow-btn {
  width: 170px;
  height: 58px;
}
</style>
