import {
    Key
} from '../common/Key';

import {
    Secret
} from '../common/Secret';


const store = {
    debug: true,
    state: {
      currentPage: '/',
      keys: Array<Key>(),
      secrets: Array<Secret>()
    },
    setCurrentPage (newValue: string) {
      if (this.debug) console.log('setCurrentPage triggered with', newValue)
      this.state.currentPage = newValue
    },
    resetCurrentPage () {
      if (this.debug) console.log('resetCurrentPage triggered')
      this.state.currentPage = '/'
    }
  }

export {
    store
};