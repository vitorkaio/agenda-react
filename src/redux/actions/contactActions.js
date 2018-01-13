export function insertContact(contact){
  return {
    type: 'ADD_CONCTAC',
    payload: contact
  }
}

export function removeContact(list){
  return {
    type: 'REMOVE_CONCTACT',
    payload: undefined
  }
}