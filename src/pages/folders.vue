<template>
  <q-page class="row q-pa-md">
    <div >
    <b>
      WATCHED FOLDERS
    </b>
    </div>
    <q-btn  color="red" @click="onGetPassword()">

    </q-btn>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/* import {
  ipcRenderer
} from 'electron';
 */

export default defineComponent({
  name: 'PageFolders',
  components: {  },

  setup() {


  function onGetPassword(): void {

/*     const password = ipcRenderer.sendSync('get-password', 'xxx') as string;

    console.log(password); */

  }


    return {
      onGetPassword
    };
  },


});
</script>
