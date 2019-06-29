<template>
  <div class="chat-list">
    <ul>
      <li
        v-for="(chat,index) in chats"
        :key="chat.id"
        @click="selectContact(index,chat)"
        :class="{ 'selected': index == selected }"
      >
        <div class="avatar">
          <img src="../assets/user.png">
        </div>

        <div class="chat">
          <p class="name">{{ chat.name }}</p>
        </div>

      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    chats: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      selected: 0
    };
  },
  methods: {
    selectContact(index, chat) {
      this.selected = index;
      this.$emit("selected", chat);
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-list {
  flex: 2;
  max-height: 600px;
  overflow: scroll;
  border-left: 1px solid #a6a6a6;

  ul {
    list-style-type: none;
    padding-left: 0;
    li {
      display: flex;
      padding: 2px;
      border-bottom: 1px solid #aaaaaa;
      height: 80px;
      position: relative;
      cursor: pointer;
      &.selected {
        background: #dfdfdf;
      }
      span.unread {
        background: #82e0a8;
        color: #fff;
        position: absolute;
        right: 11px;
        top: 20px;
        display: flex;
        font-weight: 700;
        min-width: 20px;
        justify-content: center;
        align-items: center;
        line-height: 20px;
        font-size: 12px;
        padding: 0 4px;
        border-radius: 3px;
      }
      .avatar {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          width: 35px;
          border-radius: 50%;
          margin: 0 auto;
        }
      }
      .chat {
        flex: 3;
        font-size: 10px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          margin: 0;
          &.name {
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

