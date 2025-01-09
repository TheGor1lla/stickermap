<template>
  <Menubar :model="items">
    <template #item="{ item }">
<!--      <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>-->
<!--        <a v-ripple :href="href" @click="navigate">-->
          <span :class="item.icon"/>
          <span>{{ item.label }}</span>
<!--        </a>-->
<!--      </router-link>-->
    </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-list',
          route: '/',
        },
        {
          label: 'List',
          icon: 'pi pi-list',
          route: '/list',
        },
        {
          label: 'Map',
          icon: 'pi pi-map',
          route: '/map',
        }
      ]
    }
  }
}
</script>
