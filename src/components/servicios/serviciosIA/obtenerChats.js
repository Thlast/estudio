const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const getChats = async (idUser) => {

  const data = await fetch(`${urlserver}/chats/${idUser}`)
  return data.json();
}

export const getMessages = async (idChat) => {

  const data = await fetch(`${urlserver}/messages/${idChat}`)
  return data.json();
}
