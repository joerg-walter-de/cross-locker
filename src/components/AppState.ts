const store = {
    debug: true,
    state: {
      currentPage: '/'
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