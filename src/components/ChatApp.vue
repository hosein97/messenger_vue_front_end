<template>
  <div class="chat-app">
    <Chat
      :chat="selectedChat"
      :messages="messages"
      @new="saveNewMessage"
    />
    <ChatList
      :chats="chats"
      @selected="startConversationWith"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Chat from "./Chat";
import ChatList from "./ChatList";

export default {
  components: { Chat, ChatList },
  name: "chat-app",
  data() {
    return {
      selectedChat: null,
      messages: [],
      chats: []
    };
  },
  methods: {
    ...mapActions(["getChats", "getChatMessages"]),
    startConversationWith(chat) {
      this.getChatMessages({ chatId: chat.id }).then(
        response => {
          this.messages = response;
          this.selectedChat = chat;
        },
        error => {}
      );
    },
    saveNewMessage(message) {
      this.messages.push(message);
    }
  },
  created() {
    this.getChats().then(
      response => {
        this.chats = response;
      },
      error => {}
    );
  }
};
</script>

<style lang="scss" scoped>
.chat-app {
  display: flex;
  // height: 100% !important;
}
</style>