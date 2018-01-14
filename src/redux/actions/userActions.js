export function insertUser(user){
  return {
    type: 'ADD_USER',
    payload: user
  }
}

export function removeUser(user){
  return {
    type: 'POP_USER',
    payload: user
  }
}