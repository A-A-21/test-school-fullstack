const userReducer = (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      return payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default userReducer;
