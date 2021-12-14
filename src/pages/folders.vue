<template>

     <q-dialog v-model="confirmDeletion" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span><b>Delete folder "{{watchedFolders[deleteIndex].path}}" ?</b></span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Delete" color="red" @click="onDeleteExecute()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  <q-page class="q-pa-md auto">


    <div
      class="row full-width "
    >
      <q-btn
        class="q-mr-sm"
        style="width:120px"
        color="black"
        unelevated
        rounded
        icon="add"
        label="NEW"
        :disable="isCreating"
        @click="onNew()"
      />

      <q-btn
        class="q-mr-sm"
                style="width:120px"
        color="green"
        dense
        unelevated
        rounded
        v-show="isCreating"
        icon="save"
        label="Save"
        @click="onSave()"
      />

      <q-btn
                style="width:120px"
        color="red"
        dense
        label="Discard"
        rounded
        unelevated
        v-show="isCreating"
        icon="close"
        @click="isCreating = false"
      />


    </div>

    <div
      class="row q-mt-sm q-pb-sm q-gutter-sm auto bg-green-1"
      v-show="isCreating"
    >
      <q-input
        outlined
        dense
        class="col-6"
        v-model="newItem.path"
        stack-label
        label="Path"
      />

    </div>

    <div
      v-for="(folder, folderIndex) in watchedFolders"
      :key="folder.path"
      class="row q-mt-sm q-pb-sm q-gutter-sm auto"
    >
      <q-input
        outlined
        dense
        class="col-6"
        v-model="folder.path"
        readonly
        stack-label
        label="Path"
      >
        <template v-slot:append>
          <q-btn
            dense
            flat
            color="grey-5"
            icon="content_copy"
            @click="copyToClipboard(folder.path);   $q.notify({ message: 'Copied' });"/>
        </template>
      </q-input>

      <q-btn
        class="col-1 q-mt-sm"
        color="red"
        outline
        dense
        :disable="isCreating"
        icon="delete"
        @click="onDelete(folder, folderIndex)"
      />

    </div>
  </q-page>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';

import {
  WatchedFolder
} from '../common/WatchedFolder';

import { copyToClipboard } from 'quasar'

import { useQuasar } from 'quasar'
const $q = useQuasar();

//--------------------------------------------------------------------------------------------------

let allwatchedFolders: WatchedFolder[] = [

  {
    path: 'D:/test',
    includePattern: [],
    excludePattern: []
  },

];

//--------------------------------------------------------------------------------------------------

let watchedFolders = ref(allwatchedFolders);
let deleteIndex = ref(-1);

let confirmDeletion = ref(false);

let isCreating = ref(false);

let newItem: Partial<WatchedFolder> = {

};

//--------------------------------------------------------------------------------------------------

function onDelete(folder: WatchedFolder, index: number): void
{
  console.debug('onDelete');
  confirmDeletion.value = true;
  deleteIndex.value = index;
  //watchedFolders.value.splice(index, 1);
}

//--------------------------------------------------------------------------------------------------

function onDeleteExecute(): void
{
  console.debug('onDeleteExecute');
  watchedFolders.value.splice(deleteIndex.value, 1);
  confirmDeletion.value = false;
  deleteIndex.value = -1;
}

//--------------------------------------------------------------------------------------------------

function onNew(): void
{
  console.debug('onNew');
  newItem.path = '';
  isCreating.value = true;
}

//--------------------------------------------------------------------------------------------------

function onSave(): void
{
  console.debug('onSave');

  watchedFolders.value = [newItem as WatchedFolder].concat(watchedFolders.value);
  isCreating.value = false;

  $q.notify({
    message: 'Folder created',
    color: 'green-6'
  });
}

//--------------------------------------------------------------------------------------------------

export default defineComponent({
  name: 'PageSettings',
  components: {

  },
  setup() {

    return {
      watchedFolders,
      onDelete,
      onNew,
      onSave,
      confirmDeletion,
      deleteIndex,
      onDeleteExecute,
      newItem: ref(newItem),
      isCreating,
      copyToClipboard,
      $q
    };

  }
});

</script>
