<template>
  <q-page class="q-pa-md auto large-gutter">

    <div class="q-mb-lg">
    <b>
      KEYS
    </b>
    </div>

    <q-btn  class="order-1 q-mb-md" color="green" icon="add" @click="onNewKey()">
      NEW KEY
    </q-btn>

    <div
      v-for="(key, keyIndex) in keys"
      :key="key.keyId"
      class="row q-pt-md q-gutter-sm auto"
    >
      <div class="col-4 floating-label">
        <label>Key Name</label>
        <input v-model="key.name">
      </div>

      <div class="col-4 floating-label">
        <label>Key ID</label>
        <input v-model="key.keyId">
      </div>

      <q-btn class="col-1" color="red" icon="delete" @click="onDeleteKey(key, keyIndex)"/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Key from '../common/Key';

export default defineComponent({
  name: 'PageSettings',
  components: {

  },
  setup() {

    function onDeleteKey(key: Key, index: number): void {
      console.debug('onDeleteKey');
      keys.splice(index, 1);
    }

    function onNewKey(): void {
      console.debug('onNewKey');
      keys.push();
    }

    const keys: Key[] = [

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

    return {
      keys,
      onDeleteKey,
      onNewKey
    };
  }
});
</script>
