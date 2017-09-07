import initialState from './init'

class Store {

  //------
  // State

  state = initialState()

  setState(updates) {
    this.state = { ...this.state, ...updates }
    this.notify()
  }

  getState() {
    return this.state
  }

  //------
  // Subscriptions

  handlers = new Set()

  subscribe(handler) {
    this.handlers.add(handler)
    handler(this.state)

    return {
      remove: () => this.handlers.delete(handler)
    }
  }

  notify() {
    for (const handler of this.handlers) {
      handler(this.state)
    }
  }

}

export default new Store()