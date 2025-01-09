<template>
<!--  <Menubar :model="items" />-->
  <Menu :model="items"/>
  <RouterView/>
</template>

<script>

export default {
  data() {
    return{
      items: [
        {
          label: 'One'
        },
        {
          label: 'Two'
        },
        {
          label: 'Three'
        },
      ]
    }
  }
}
</script>
