<template>
  <Menubar :model="items">
    <template #start>
        <img width="30" src="/src/assets/sticker.svg"/>
    </template>
    <template #item="{ item, props }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon"/>
          <span>{{ item.label }}</span>
        </a>
      </router-link>
    </template>
    <template #end>
        <Avatar icon="pi pi-user" shape="circle" />
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";

export default {
  components: {
    name: 'Menubar',
    Menubar,
    Avatar,
  },
  data() {
    return {
      items: [
        {label: 'Home', icon: 'pi pi-home', route: '/'},
        {label: 'Gallery', icon: 'pi pi-list', route: '/gallery'},
        {label: 'Map', icon: 'pi pi-map', route: '/map'},
      ]
    }
  }
}
</script>
