<template>
  <div class="chat-app">
    <Chat
      :chat="selectedChat"
      :messages="messages"
    />
    <ChatList :chats="chats" />
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
    ...mapActions(["getChats"])
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