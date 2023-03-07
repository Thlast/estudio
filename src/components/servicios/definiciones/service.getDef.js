const urlserver = process.env.REACT_APP_SERVERSQL_PRODUCTION_URL || process.env.REACT_APP_SERVERSQL_LOCAL_URL

export const getDef = async (def) => {

  const data = await fetch(`${urlserver}/def/${def}`)
  return data.json();
}
