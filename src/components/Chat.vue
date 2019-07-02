<template>
  <div class="chat">
    <h1>{{ chat ? chat.name : 'Select a Chat' }}</h1>
    <div>
      <a-button
        @click="openAddModal"
        style="width:50% !important"
        v-if="permissions.includes('ADD_MEMBER')"
        type="primary"
      >Add Member</a-button>
      <a-button
        @click="openDeleteModal"
        style="width:50% !important"
        v-if="permissions.includes('ADD_MEMBER')"
        type="danger"
      >Delete Member</a-button>

      <a-modal
        title="Add Member"
        centered
        v-model="addModal"
        @ok="() => addModal = false"
      >
        <a-select
          mode="multiple"
          placeholder="Select members"
          @change="selectContacts"
          style="width: 100%"
        >
          <a-select-option
            v-for="(item, index) in contacts"
            :key=index
            :value="item.username"
          >
            {{item.username}}
          </a-select-option>
        </a-select>
        <a-button
          @click="addMember"
          type="primary"
          :disabled="selectedContacts.length == 0"
        >Add</a-button>
      </a-modal>

      <a-modal
        title="Delete Member"
        centered
        v-model="deleteModal"
        @ok="() => deleteModal = false"
      >
        <a-select
          mode="multiple"
          placeholder="Select members"
          @change="selectMembersToDelete"
          style="width: 100%"
        >
          <a-select-option
            v-for="(item, index) in members"
            :key=index
            :value="item.username"
          >
            {{item.username}}
          </a-select-option>
        </a-select>
        <a-button
          @click="deleteMember"
          type="primary"
          :disabled="selectedMembersToDelete.length == 0"
        >Delete</a-button>
      </a-modal>

    </div>

    <MessagesFeed
      :chat="chat"
      :messages="messages"
    />
    <MessageComposer
      v-if="permissions.includes('SEND_MESSAGE')"
      @send="sendMessage"
    />
  </div>
</template>

<script>
import MessagesFeed from "./MessagesFeed";
import MessageComposer from "./MessageComposer";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      deleteModal: false,
      selectedMembersToDelete: [],
      members: [],
      addModal: false,
      selectedContacts: [],
      contacts: []
    };
  },
  props: {
    permissions: {
      type: Array,
      default: null
    },
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
    ...mapActions([
      "addMessage",
      "getContacts",
      "addMemberToChat",
      "getMembers",
      "deleteMemberFromChat"
    ]),
    selectMembersToDelete(selected) {
      this.selectedMembersToDelete = selected;
    },
    selectContacts(selectedContacts) {
      this.selectedContacts = selectedContacts;
    },
    deleteMember() {
      this.deleteModal = false;
      this.deleteMemberFromChat({
        usernames: this.selectedMembersToDelete,
        chatId: this.chat.id
      }).then(
        response => {
          this.$message.success("Member deleted successfully!");
        },
        error => {}
      );
    },
    addMember() {
      this.addModal = false;
      this.addMemberToChat({
        usernames: this.selectedContacts,
        chatId: this.chat.id
      }).then(
        response => {
          this.$message.success("Member added successfully!");
        },
        error => {}
      );
    },
    openDeleteModal() {
      return this.getMembers({ chatId: this.chat.id }).then(
        members => {
          this.members = members;
          this.deleteModal = true;
        },

        error => {}
      );
    },
    openAddModal() {
      return this.getContacts().then(
        contacts => {
          this.contacts = contacts;
          this.addModal = true;
        },

        error => {}
      );
    },
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