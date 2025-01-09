<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu }">
      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon"/>
          <span>{{ item.label }}</span>
        </a>
      </router-link>
    </template>
  </Menubar>
</template>

<script>
import Menubar from "primevue/menubar";

export default {
  components: {
    name: 'Menubar',
    Menubar,
  },
  data() {
    return {
      items: [
        {label: 'Home', icon: 'pi pi-home', route: '/'},
        {label: 'List', icon: 'pi pi-list', route: '/list'},
        {label: 'Map', icon: 'pi pi-map', route: '/map'},
      ]
    }
  }
}
</script>
