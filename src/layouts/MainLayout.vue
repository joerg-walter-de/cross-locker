<template>
    <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2 rounded-borders">
      <q-header elevated class="primary">
        <q-toolbar>
          <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
          <q-toolbar-title>Cross Locker</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above

        :breakpoint="500"
        bordered
        class="bg-orange-1"
      >
      <q-list>
        <q-item
          v-for="link in essentialLinks"
          :key="link.title"
          clickable
          v-ripple
          :active="this.$route.path === link.link"
          active-class="bg-orange-3"
          :to="link.link"
          exact

        >
          <q-item-section
            v-if="link.icon"
            avatar
          >
            <q-icon :name="link.icon" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ link.title }}
            </q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

const linksList = [
  {
    title: 'Secrets',
    icon: 'lock',
    link: '/secrets'
  },
  {
    title: 'Watched Folders',
    icon: 'folder',
    link: '/folders'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: 'Legal',
    icon: 'info',
    link: '/legal'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    const leftDrawerOpen = ref(true);
    const link = ref('/folders');

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      link,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
