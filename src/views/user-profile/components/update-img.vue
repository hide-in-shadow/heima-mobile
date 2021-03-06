<template>
  <div class="update-avatar">
    <img :src="img" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span>完成</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'updataImg',
  components: {},
  props: {
    img: { type: [String, Object], retuired: true }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
