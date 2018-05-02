import { SET_VISIBILITY_FILTER } from '../actionTypes'
import { ALL_TODOS } from '../../common/constants'

const visibilityFilter = (state = ALL_TODOS, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter;
