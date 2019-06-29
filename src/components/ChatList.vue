<template>
  <div class="chat-list">
    <ul>
      <li
        v-for="chat in chats"
        :key="chat.id"
      >
        <div class="avatar">
          <img
            :src="chat.profile_image"
            :alt="chat.name"
          >
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
  }
};
</script>




