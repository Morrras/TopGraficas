
export default async function deleteGrafica(id) {
  // const apiURL = 'https://top-graficas.herokuapp.com/api'
  const apiURL = `http://127.0.0.1:8000/api/grafica/${id}`

  const res = await fetch(apiURL, {
    method: 'DELETE'
  })
  const Response = await res.json()
  const { data = [] } = Response
  if (Array.isArray(data)) {
    return data
  }
}