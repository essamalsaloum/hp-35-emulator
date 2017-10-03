import { createAction } from 'redux-actions'

const SHOW_GITHUB_PANEL = 'rpnext/programPanel/SHOW_GITHUB_PANEL'
const SHOW_PROGRAM_PANEL = 'rpnext/programPanel/SHOW_PROGRAM_PANEL'

export const showProgramPanel = createAction(SHOW_PROGRAM_PANEL)
export const showGitHubPanel = createAction(SHOW_GITHUB_PANEL)

export default (state = 'program', { type }) => {
  switch (type) {
    case SHOW_PROGRAM_PANEL:
      return 'program'
    case SHOW_GITHUB_PANEL:
      return 'github'
    default:
      return state
  }
}

export const programPanelSelector = state => state.programPanel