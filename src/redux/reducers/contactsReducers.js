
let contact = {};

const contactReducer = (state = contact, action) => {
  switch (action.type) {
    case 'ADD_CONCTAC':
      state = {
        ...state,
        contact: action.payload
      }
      break;

    case 'REMOVE_CONCTACT':
      state = {
        ...state,
        contact: action.payload 
      }
    break;

    default:
      break;
  }

  return state;

}// Fim do reducers

export default contactReducer 