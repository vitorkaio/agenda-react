import FakeServer from './../../shared/services/fakeServer'

const fakeServer = new FakeServer();

let modeloInicial = {
  listContacts: fakeServer.getList()
}

const contactReducer = (state = modeloInicial, action) => {
  switch (action.type) {
    case 'ADD_CONCTACS':
      fakeServer.pushContact(action.payload);
      state = {
        ...state,
        listContacts: fakeServer.getList()
      }
      break;

    case 'POP_CONCTACT':
      state = {
        ...state,
        listContacts: action.payload 
      }
    break;

    case 'INSERT_CONTACTS':
      state = {
        ...state,
        listContacts: action.payload
      }
    break;
  
    default:
      break;
  }

  return state;

}// Fim do reducers

export default contactReducer 