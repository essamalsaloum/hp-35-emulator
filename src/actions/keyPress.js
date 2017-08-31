import store from '../store'
import execute from '../processor/operations/executor'

export default opCode => store.setState(execute(opCode)(store.getState()))

