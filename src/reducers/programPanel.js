import {
  SELECT_PROGRAM_TAB,
  SELECT_GITHUB_TAB,
} from '../actions/actionTypes'

export default (state = 'program', { type }) => {
  switch (type) {
    case SELECT_PROGRAM_TAB:
      return 'program'
    case SELECT_GITHUB_TAB:
      return 'github'
    default:
      return state
  }
}


export const getSelectedProgramPanel = state => state.programPanel
