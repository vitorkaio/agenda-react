let modeloInicial = {
  user: null
}

const userReducer = (state = modeloInicial, action) => {
  switch (action.type) {
    case 'ADD_USER':
      state = {
        ...state,
        user: action.payload
      }
      break;

    case 'POP_USER':
      state = {
        ...state,
        user: action.payload 
      }
    break;

    default:
      break;
  }

  return state;

}// Fim do reducers

export default userReducer 