<template>
  <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="change" />
</template>

<script>
import { updateUser } from '@/api/user.js'
import dayJs from 'dayjs'
export default {
  name: 'updataBirthday',
  components: {},
  props: {
    value: { type: String, required: true }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  created() {},
  mounted() {},
  methods: {
    async change(value) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUser({
          birthday: dayJs(value).format('YYYY-MM-DD')
        })
        this.$emit('input', dayJs(value).format('YYYY-MM-DD'))
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
