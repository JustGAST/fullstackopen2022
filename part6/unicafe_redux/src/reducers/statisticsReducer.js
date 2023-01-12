const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
}

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return {...state, good: state.good + 1};
    case 'NEUTRAL':
      return {...state, neutral: state.neutral + 1};
    case 'BAD':
      return {...state, bad: state.bad + 1};
    default:
      return state;
  }
}

export default statisticsReducer;