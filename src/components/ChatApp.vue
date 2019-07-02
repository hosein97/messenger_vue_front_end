<template>
  <div>

    <Menu @newChat="newChat" />
    <div class="chat-app">
      <Chat
        :chat="selectedChat"
        :messages="messages"
        :permissions="permissions"
        @new="saveNewMessage"
      />
      <ChatList
        :chats="chats"
        @selected="startConversationWith"
      />
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Chat from "./Chat";
import ChatList from "./ChatList";
import Menu from "./Menu";

export default {
  components: { Chat, ChatList, Menu },
  name: "chat-app",
  data() {
    return {
      selectedChat: null,
      messages: [],
      chats: [],
      permissions: []
    };
  },
  methods: {
    ...mapActions(["getChats", "getChatMessages", "getUser", "getPermissions"]),
    startConversationWith(chat) {
      this.getPermissions({ chatId: chat.id }).then(
        response => {
          this.permissions = response;
        },
        error => {}
      );

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
    },
    newChat(chat) {
      this.getChats().then(
        chats => {
          this.chats = chats;
          this.startConversationWith(chat);
        },
        error => {}
      );
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
  // mounted() {
  //   this.getUser().then(
  //     user => {
  //       console.log(Echo);
  //       Echo.private(`messages.${user.id}`).listen("NewMessage", e => {
  //         // this.hanleIncoming(e.message);
  //       });
  //     },
  //     error => {}
  //   );
  // }
};
</script>

<style lang="scss" scoped>
.chat-app {
  display: flex;
  // height: 100% !important;
}
</style>