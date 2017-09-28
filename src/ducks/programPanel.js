import { createAction } from 'redux-actions'

const GITHUB = 'rpnext/programPanel/GITHUB'
const PROGRAM = 'rpnext/programPanel/PROGRAM'

export const selectProgramTab = createAction(PROGRAM)
export const selectGitHubTab = createAction(GITHUB)

export default (state = 'program', { type }) => {
  switch (type) {
    case PROGRAM:
      return 'program'
    case GITHUB:
      return 'github'
    default:
      return state
  }
}

export const programPanelSelector = state => state.programPanel