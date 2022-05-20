const lessonsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case 'ALL_LESSONS':
      return payload;
    case 'ADD_LESSON':
      return [payload, ...state];
    case 'DELETE_LESSON':
      return state.filter((el) => el.id !== payload);
    case 'EDIT_LESSON':
      return state.map((el) => {
        if (el.id === payload._id) {
          return el = payload;
        } else {
          return el;
        }
      });
    default:
      return state;
  }
};

export default lessonsReducer;
