<template>
  <q-page class="q-pa-md auto large-gutter">

    <div class="q-mb-lg">
    <b>
      KEYS
    </b>
    </div>

    <q-btn  class="col-2" color="green" icon="add" @click="onNewKey()">
      NEW KEY
    </q-btn>
    <div
      v-for="(key, keyIndex) in keys"
      :key="key.keyId"
      class="row q-pt-md q-gutter-sm auto"
    >
      <q-input
        outlined

        class="col-3"
        v-model="key.name"
        stack-label
        label="Name"
      />

      <q-input
        outlined
        class="col-3"
        v-model="key.keyId"
        stack-label
        label="Fingerprint"
      />

      <q-btn
        class="col-1"
        color="blue"
        icon="visibility"
        @click="onShowKeyPair(key, keyIndex)"
      />

      <q-btn class="col-1" color="red" icon="delete" @click="onDeleteKey(key, keyIndex)"/>

      <q-input
        outlined
        class="col-5"
        v-model="key.privateKeyPEM"
        stack-label
        v-show="visibleKeyPairIndex === keyIndex"
        type="textarea"
        label="Private Key (PEM)"
      />

      <q-input
        outlined
        class="col-5"
        v-model="key.publicKeyPEM"
        stack-label
        v-show="visibleKeyPairIndex === keyIndex"
        type="textarea"
        label="Public Key (PEM)"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Key from '../common/Key';

export default defineComponent({
  name: 'PageSettings',
  components: {

  },
  setup() {

    const visibleKeyPairIndex = ref(-1);

    function onDeleteKey(key: Key, index: number): void {
      console.debug('onDeleteKey');
      keys.splice(index, 1);
    }

    function onNewKey(): void {
      console.debug('onNewKey');
      keys.push();
    }

    function onShowKeyPair(key: Key, index: number): void {
      console.debug('onShowKeyPair');
      console.debug(visibleKeyPairIndex);
      console.debug(index);

      visibleKeyPairIndex.value = index;
    }


    let keys = [

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
      visibleKeyPairIndex,
      onDeleteKey,
      onNewKey,
      onShowKeyPair,
    };
  }
});
</script>
