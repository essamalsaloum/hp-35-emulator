import store from '../store'
import execute from '../processor/controlUnit'

export default opCode => store.setState(execute(opCode)(store.getState()))

