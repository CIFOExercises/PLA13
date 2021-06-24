import { ajaxRequest } from './ajax.js'

export function consultaCentros() {

    ajaxRequest('https://alcyon-it.com/PQTM/pqtm_consulta_colegios.php', 'GET', 'json').then((res) => appendCenters(JSON.parse(res)), (error) => alert(error))
}

function appendCenters(centers) {
    for (const item of centers) {
        document.querySelector('#center').innerHTML += `<option value='${item.idcolegio}'>${item.nombre}</option>`
    }
}