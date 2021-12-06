<template>

     <q-dialog v-model="confirmDeletion" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span><b>Delete key "{{keys[keyDeleteIndex].name}}" ?</b></span>
          <br>
          Secrets that are ecnrypted with this key will not be readable after the key is deleted!
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Delete" color="red" @click="onDeleteKeyExecute()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  <q-page class="q-pa-md auto">


    <div
      class="row full-width q-gutter-sm "
    >
      <q-btn
        class="col-2"
        color="primary"
        icon="add"
        label="NEW"
        :disable="isCreating"
        @click="onNewKey()"
      />

    </div>

    <div
      class="row q-mt-sm q-pb-sm q-gutter-sm auto bg-green-1"
      v-show="isCreating"
    >
      <q-input
        outlined
        dense
        class="col-4"
        v-model="newKey.name"
        stack-label
        label="Name"
      />

      <q-btn
        class="col-2 "
        color="green"
        dense
        v-show="isCreating"
        icon="save"
        label="Save"
        @click="onSaveKey()"
      />

      <q-btn
        class="col-2 "
        color="red"
        dense
        label="Discard"
        v-show="isCreating"
        icon="close"
        @click="isCreating = false"
      />

    </div>

    <div
      v-for="(key, keyIndex) in keys"
      :key="key.keyId"
      class="row q-mt-sm q-pb-sm q-gutter-sm auto bg-grey-2"
    >
      <q-input
        outlined
        dense
        class="col-4"
        v-model="key.name"
        readonly
        stack-label
        label="Name"
      >
        <template v-slot:append>
          <q-btn dense flat color="grey-5"  icon="content_copy" />
        </template>
      </q-input>

      <q-input
        outlined
        dense
        class="col-4"
        v-model="key.keyId"
        readonly
        stack-label
        label="Fingerprint"
      >
        <template v-slot:append>
          <q-btn dense flat color="grey-5" icon="content_copy" />
        </template>
      </q-input>

      <q-btn
        class="col-1 q-mt-sm"
        color="blue"
        outline
        dense
        :icon="visibleKeyPairIndex === keyIndex ? 'visibility_off' : 'visibility'"
        @click="onShowKeyPair(key, keyIndex)"
      />

      <q-btn
        class="col-1 q-mt-sm"
        color="red"
        outline
        dense
        :disable="isCreating"
        icon="delete"
        @click="onDeleteKey(key, keyIndex)"
      />

      <q-input
        outlined
        class="col-8"
        v-model="key.privateKeyPEM"
        stack-label
        readonly
        v-show="visibleKeyPairIndex === keyIndex"
        type="textarea"
        label="Private Key (PEM)"
      >
        <template v-slot:append>
          <q-btn dense flat color="grey-5" icon="content_copy" />
        </template>
      </q-input>
      <q-input
        outlined
        class="col-8"
        v-model="key.publicKeyPEM"
        stack-label
        readonly
        v-show="visibleKeyPairIndex === keyIndex"
        type="textarea"
        label="Public Key (PEM)"
      >
        <template v-slot:append>
          <q-btn dense flat color="grey-5" icon="content_copy" />
        </template>
      </q-input>
    </div>
  </q-page>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import {
  Key
} from '../common/Key';

import { useQuasar } from 'quasar'
const $q = useQuasar();

//--------------------------------------------------------------------------------------------------

let allKeys: Key[] = [

  {
    name: 'AAA',
    keyId: '1234',
    privateKeyPEM: 'PK1',
    publicKeyPEM: 'PK2',
    encryptionAlgorithm: 'RSA-OAEP'
  },
  {
    name: 'BBB',
    keyId: '5678',
    privateKeyPEM: 'PK1',
    publicKeyPEM: 'PK2',
    encryptionAlgorithm: 'RSA-OAEP'
  }

];

//--------------------------------------------------------------------------------------------------

let keys = ref(allKeys);
const visibleKeyPairIndex = ref(-1);
let keyDeleteIndex = ref(-1);

let confirmDeletion = ref(false);

let isCreating = ref(false);

let newKey: Partial<Key> = {

};

//--------------------------------------------------------------------------------------------------

function onDeleteKey(key: Key, index: number): void
{
  console.debug('onDeleteKey');
  confirmDeletion.value = true;
  keyDeleteIndex.value = index;
  //keys.value.splice(index, 1);
}

//--------------------------------------------------------------------------------------------------

function onDeleteKeyExecute(): void
{
  console.debug('onDeleteKeyExecute');
  keys.value.splice(keyDeleteIndex.value, 1);
  confirmDeletion.value = false;
  keyDeleteIndex.value = -1;
}

//--------------------------------------------------------------------------------------------------

function onNewKey(): void
{
  console.debug('onNewKey');
  newKey.name = '';
  newKey.encryptionAlgorithm = 'RSA-OAEP';
  isCreating.value = true;
}

//--------------------------------------------------------------------------------------------------

function onShowKeyPair(key: Key, index: number): void
{
  console.debug('onShowKeyPair');

  if(visibleKeyPairIndex.value === index)
  {
    visibleKeyPairIndex.value = -1;
    return;
  }
  visibleKeyPairIndex.value = index;
}

//--------------------------------------------------------------------------------------------------

function onSaveKey(): void
{
  console.debug('onSaveKey');

  keys.value = [newKey as Key].concat(keys.value);
  isCreating.value = false;

  $q.notify({
    message: 'Key created',
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
      keys,
      visibleKeyPairIndex,
      onDeleteKey,
      onNewKey,
      onShowKeyPair,
      onSaveKey,
      confirmDeletion,
      keyDeleteIndex,
      onDeleteKeyExecute,
      newKey,
      isCreating,
      $q
    };

  }
});

</script>
