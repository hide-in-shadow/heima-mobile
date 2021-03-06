<template>
  <van-cell class="comment-item">
    <van-image slot="icon" class="avatar" round fit="cover" :src="item.aut_photo" />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{item.aut_name}}</div>
      <van-button class="like-btn" :class="item.is_liking ? 'active' : ''" :icon="item.is_liking ? 'good-job' : 'good-job-o'" @click="changeLike(item)">
        {{item.is_liking ? item.like_count : '赞'}}
      </van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{item.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{item.pubdate | relativeTime}}</span>
        <van-button class="reply-btn" round @click="$emit('show', item)">回复 {{item.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { deleteCommentLike, addCommentLike } from '@/api/comments'
export default {
  name: 'commentItem',
  components: {},
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    async changeLike(item) {
      // 如果已经赞了则取消点赞
      if (item.is_liking) {
        await deleteCommentLike(item.com_id)
        this.item.like_count--
      } else {
        // 如果没有赞，则点赞
        await addCommentLike(item.com_id)
        this.item.like_count++
      }
      // 更新视图状态
      item.is_liking = !item.is_liking
      this.$toast('操作成功')
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
    /deep/.van-button__content {
      width: 82px;
    }
  }
  /deep/ .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
    background-color: #f4f5f6;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 30px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 40px;
    }
  }
  .active {
    color: red;
  }
}
</style>
