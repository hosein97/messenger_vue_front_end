<template>
  <div class="chat">
    <h1>{{ chat ? chat.name : 'Select a Chat' }}</h1>
    <MessagesFeed
      :chat="chat"
      :messages="messages"
    />
    <MessageComposer @send="sendMessage" />
  </div>
</template>

<script>
import MessagesFeed from "./MessagesFeed";
import MessageComposer from "./MessageComposer";
import { mapActions } from "vuex";

export default {
  props: {
    chat: {
      type: Object,
      default: null
    },
    messages: {
      type: Array,
      default: []
    }
  },
  methods: {
    ...mapActions(["addMessage"]),
    sendMessage(text) {
      if (!this.chat) {
        return;
      }
      this.addMessage({ chatId: this.chat.id, text: text }).then(
        newMessage => {
          this.$emit("new", newMessage);
        },
        error => {}
      );
    }
  },
  components: { MessagesFeed, MessageComposer }
};
</script>

<style lang="scss" scoped>
.chat {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 20px;
    padding: 10px;
    margin: 0;
    border-bottom: 1px dashed lightgray;
  }
}
</style>