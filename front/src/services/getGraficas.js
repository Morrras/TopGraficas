export default async function getGraficas({ id = '' } = {}) {
  //Añado la barra para la url en caso de que le pasemos una id de una gráfica asi al utilizar el servicio no es necesario pasar la barra
  if (id) {
    id = '/' + id
  } else {
    id = 's'
  }
  // const apiURL = 'https://top-graficas.herokuapp.com/api'
  const apiURL = `http://127.0.0.1:8000/api/grafica${id}`

  const res = await fetch(apiURL)
  const Response = await res.json()
  if (Array.isArray(Response)) {
    return Response
  }
}

