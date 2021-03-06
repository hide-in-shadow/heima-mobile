<template>
  <div style="padding: 10px;">
    <!-- 导航栏 -->
    <van-nav-bar title="编辑昵称" left-text="取消" right-text="确定" @click-left="$emit('close')" @click-right="change" />
    <!-- /导航栏 -->
    <van-field v-model="newName" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入新昵称" show-word-limit />
  </div>
</template>

<script>
import { updateUser } from '@/api/user.js'
export default {
  name: 'userName',
  components: {},
  model: {
    prop: 'userName', // 改变传值的默认键 value
    event: 'change' // 改变传值回去的默认事件名 input
  },
  props: {
    userName: { type: String, required: true }
  },
  data() {
    return {
      newName: this.userName
    }
  },
  created() {},
  mounted() {},
  methods: {
    async change() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.newName.trim() === '') return this.$toast('请输入昵称')
        const { data } = await updateUser({ name: this.newName })
        this.$emit('change', data.data.name) // 更新父组件数据
        this.$emit('close') // 关闭弹出层
        this.$toast('更新成功')
      } catch (err) {
        if (err.response && err.response.status === 409) {
          return this.$toast('用户名已存在')
        }
        this.$toast('更新失败')
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
/deep/.van-cell {
  background: #f5f7f9;
}
</style>
