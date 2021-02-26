<template>
  <van-cell class="article-item">
    <div slot="title" class="title">{{ item.title }}</div>
    <div slot="label">
      <div v-if="item.cover.type === 3" class="cover-wrap">
        <div class="cover-item" v-for="(img, index) in item.cover.images" :key="index">
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span v-if='item.is_top' class='top'>置顶</span>
        <span>{{ item.aut_name }}</span>
        <span>{{ item.comm_count }}评论</span>
        <span>{{ item.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image v-if="item.cover.type === 1" slot="default" class="right-cover" fit="cover" :src="item.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'articleItem',
  components: {},
  props: ['item'],
  data() {
    return {}
  },
  created() {
    console.log(this.item)
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {}
}
</script>
<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
  .top {
    font-size: 23px;
    color: #e22829 !important;
  }
}
</style>
