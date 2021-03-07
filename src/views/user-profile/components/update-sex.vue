<template>
  <van-picker title="性别" show-toolbar :columns="columns" :default-index="value" @cancel="$emit('close')" @confirm="change" />
</template>

<script>
import { updateUser } from '@/api/user.js'
export default {
  name: 'updataSex',
  components: {},
  props: {
    value: { type: Number, required: true }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  created() {},
  mounted() {},
  methods: {
    async change(value, i) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUser({ gender: i })
        this.$emit('input', i) // 更新父组件数据
        this.$emit('close')
        this.$toast('更新成功')
      } catch (err) {
        this.$toast('更新失败')
      }
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
/deep/ .van-picker__columns {
  background-color: #dddddd !important;
}
</style>
