<template>
  <div class="comment-reply">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon slot="right" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <commentItem :item="comment"></commentItem>
    <!-- /当前评论项 -->

    <div class="scroll-wrap">
      <van-cell title="所有回复" />
      <!-- 评论的回复列表 -->
      <articleComment :list="list" :id="comment.com_id" type='c' @show="addReply" />
      <!-- /评论的回复列表 -->
    </div>

    <!-- 底部 -->
    <!-- 回复评论按钮 -->
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="show = true">写评论</van-button>
    </div>
    <!-- /回复评论按钮 -->
    <!-- /底部 -->

    <!-- 写 文章评论的评论 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <postComment :target="comment.com_id" @add="addComment"></postComment>
    </van-popup>
    <!-- /写 文章评论的评论 弹出层 -->

    <!-- 回复 文章评论的评论 弹出层 -->
    <van-popup v-model="show" position="bottom">
      <postComment :target="item.com_id" @add="addComment"></postComment>
    </van-popup>
    <!-- /回复 文章评论的评论 弹出层 -->
  </div>
</template>

<script>
import commentItem from './comment-item'
import articleComment from './articleComment'
import postComment from './post-comment'
export default {
  name: 'replyComment',
  components: {
    commentItem,
    articleComment,
    postComment
  },
  props: {
    comment: { type: Object, required: true }
  },
  data() {
    return {
      list: [],
      show: false, // 控制回复评论弹窗
      item: {} // 存储 需要回复的 文章评论的评论
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 向 评论 文章评论 的列表 添加新的评论
    addComment(obj) {
      this.comment.reply_count++
      this.show = false // 关闭弹出层
      this.list.unshift(obj) // 向评论列表 开头 添加数据
    },
    // 回复 评论文章的 评论
    addReply(item) {
      this.show = true // 开启弹出层
      console.log(item.com_id)
      this.item = item // 存储 需要回复的 文章评论的评论
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 400px;
  right: 0;
  bottom: 88px;
  left: 0;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
