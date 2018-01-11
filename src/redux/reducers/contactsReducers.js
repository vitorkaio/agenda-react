let modeloInicial = {
  listContacts: []
}

const contactReducer = (state = modeloInicial, action) => {
  switch (action.type) {
    case 'ADD_CONCTACS':
      state = {
        ...state,
        listContacts: [...state.listContacts, action.payload]
      }
      break;

    case 'POP_CONCTACt':
      state = {
        ...state,
        listContacts: action.payload 
      }
    break;

    case 'INSERT_CONTACTS':
      state = {
        ...state,
        listContacts: action.payload.slice() 
      }
    break;
  
    default:
      break;
  }

  return state;

}// Fim do reducers

export default contactReducer 