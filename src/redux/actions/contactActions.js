export function insertContact(contact){
  return {
    type: 'ADD_CONCTACS',
    payload: contact
  }
}

export function insertList(list){
  return {
    type: 'INSERT_CONTACTS',
    payload: list
  }
}