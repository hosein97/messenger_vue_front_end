<template>
  <div
    class="feed"
    ref="feed"
  >
    <ul v-if="chat">
      <li
        v-for="message in messages"
        :class="`message${message.user_id == user.id ? ' sent' : ' received'}`"
        :key="message.id"
      >
        <div class="text">
          {{ message.text }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    chat: {
      type: Object
    },
    messages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    this.getUser().then(
      user => {
        this.user = user;
      },
      error => {}
    );
  },
  methods: {
    ...mapActions(["getUser"]),
    scrollToBottom() {
      setTimeout(() => {
        this.$refs.feed.scrollTop =
          this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight;
      }, 50);
    }
  },
  watch: {
    contact(chat) {
      this.scrollToBottom();
    },
    messages(messages) {
      this.scrollToBottom();
    }
  }
};
</script>

<style lang="scss" scoped>
.feed {
  background: #f0f0f0;
  height: 100%;
  max-height: 470px;
  min-height: 470px;
  overflow: scroll;
  ul {
    list-style-type: none;
    padding: 5px;
    li {
      &.message {
        margin: 10px 0;
        width: 100%;
        .text {
          max-width: 200px;
          border-radius: 5px;
          padding: 12px;
          display: inline-block;
        }
        &.received {
          text-align: right;
          .text {
            background: #b2b2b2;
          }
        }
        &.sent {
          text-align: left;
          .text {
            background: #81c4f9;
          }
        }
      }
    }
  }
}
</style>
