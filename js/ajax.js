export async function ajaxRequest(endpoint, method, data = {}, responseType = "text") {
    let datos;
    
    if (data != '') {
        datos = new FormData()

        for (let prop in data) {
            datos.append(prop, data[prop])
        }
    }

    let headers = {
        method: method
    }

    if (method != 'GET') {
        headers.body = datos
    }

    return new Promise((resolve, reject) => {
        fetch(endpoint, headers)
            .then(res => {
                if (res.ok) {
                    switch (responseType) {
                        case 'json': return res.json()
                        case 'text': return res.text()
                        case 'blob': return res.blob()

                        default: throw ('Tipo de respuesta no válido');
                    }
                } else {
                    throw ('Algo ha ido mal en la petición')
                }
            })
            .then(msg => {
                resolve(msg)
            })
            .catch(error => {
                console.log(error)
                reject(error)
            })
    })
}