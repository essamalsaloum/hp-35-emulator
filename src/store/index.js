import initialState from './init'

class Store {

  //------
  // State

  state = initialState()

  setState(updates) {
    const date = new Date()
    console.group('old state ' + date.toLocaleTimeString())
    console.dir(this.state)
    console.groupEnd()

    Object.assign(this.state, updates)

    console.group('new state')
    console.dir(this.state)
    console.groupEnd()

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