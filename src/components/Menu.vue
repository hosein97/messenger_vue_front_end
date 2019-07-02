<template>
  <div class="card-header">
    <a-dropdown-button>
      <a-icon
        type="caret-down"
        theme="filled"
      />
      <a-menu slot="overlay">
        <a-menu-item
          @click="openGpModal"
          key="1"
        >
          <a-icon type="plus" />create gp</a-menu-item>

        <a-modal
          title="Create Group"
          centered
          v-model="gpModal"
          @ok="() => gpModal = false"
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
            @click="createGroup"
            type="primary"
            :disabled="selectedContacts.length == 0"
          >Create Group</a-button>
          <a-input
            v-model="chatName"
            placeholder="Group Name"
          />
        </a-modal>
        <!-- //////////////////////////////// -->
        <a-menu-item
          @click="openContactModal"
          key="2"
        >
          <a-icon type="plus" />cantacts</a-menu-item>

        <a-modal
          title="Contacts"
          centered
          v-model="contactModal"
          @ok="() => contactModal = false"
        >
          <a-input-search
            placeholder="input contact username"
            @search="addToContacts"
            enterButton
            v-model="inputAddContact"
          />
          <a-select
            showSearch
            placeholder="Select contact to start chat with"
            :value="contactToStartChatWith"
            @change="selectContact"
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
            @click="startChatWith"
            type="primary"
            :disabled="contactToStartChatWith === ''"
          >Start Chat</a-button>

        </a-modal>

        <a-menu-item
          @click="openChannelModal"
          key="3"
        >
          <a-icon type="plus" />create channel</a-menu-item>

        <a-modal
          title="Create Channel"
          centered
          v-model="channelModal"
          @ok="() => channelModal = false"
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
            @click="createChannel"
            type="primary"
            :disabled="selectedContacts.length == 0"
          >Create Channel</a-button>
          <a-input
            v-model="chatName"
            placeholder="Channel Name"
          />
        </a-modal>

        <a-menu-item
          @click="logOut"
          key="4"
        >
          <a-icon type="logout" />log out</a-menu-item>
      </a-menu>

    </a-dropdown-button>

  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      channelModal: false,
      chatName: "",
      selectedContacts: [],
      gpModal: false,
      contacts: [],
      contactModal: false,
      inputAddContact: "",
      contactToStartChatWith: ""
    };
  },
  methods: {
    ...mapActions(["getContacts", "addContact", "addChat", "logout"]),
    logOut() {
      return this.logout().then(
        () => {
          this.$router.push({ name: "login" });
        },
        error => {}
      );
    },
    selectContacts(selectedContacts) {
      this.selectedContacts = selectedContacts;
    },
    openChannelModal() {
      return this.getContacts().then(
        contacts => {
          this.contacts = contacts;
          this.channelModal = true;
        },
        error => {}
      );
    },
    openGpModal() {
      return this.getContacts().then(
        contacts => {
          this.contacts = contacts;
          this.gpModal = true;
        },

        error => {}
      );
    },
    openContactModal() {
      return this.getContacts().then(
        contacts => {
          this.contacts = contacts;
          this.contactModal = true;
        },
        error => {}
      );
    },

    selectContact(contact) {
      this.contactToStartChatWith = contact;
    },

    addToContacts() {
      if (this.inputAddContact == "") {
        return;
      }
      return this.addContact(this.inputAddContact).then(
        contact => {
          this.$message.success("Contact added successfully!");
          this.contacts.push(contact);
          this.inputAddContact = "";
        },
        error => {
          this.$message.error(error);
          this.inputAddContact = "";
        }
      );
    },
    startChatWith() {
      this.contactModal = false;
      this.addChat({
        usernames: [this.contactToStartChatWith]
      }).then(
        chat => {
          this.$emit("newChat", chat);
        },
        error => {}
      );
    },
    createGroup() {
      this.gpModal = false;
      this.addChat({
        usernames: this.selectedContacts,
        chatName: this.chatName,
        isGroup: true
      }).then(
        chat => {
          this.$emit("newChat", chat);
        },
        error => {}
      );
    },
    createChannel() {
      this.channelModal = false;
      this.addChat({
        usernames: this.selectedContacts,
        chatName: this.chatName,
        isGroup: false
      }).then(
        chat => {
          this.$emit("newChat", chat);
        },
        error => {}
      );
    }
  }
};
</script>