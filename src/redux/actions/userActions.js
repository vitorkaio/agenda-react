export function insertUser(user){
  return {
    type: 'ADD_USER',
    payload: user
  }
}

export function removeUser(){
  return {
    type: 'POP_USER',
    payload: null
  }
}