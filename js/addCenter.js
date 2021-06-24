import { ajaxRequest } from "./ajax.js";
import { refreshCentersTable } from "./refreshCentersTable.js";

export function addCenter() {
    const centerNameinput = document.querySelector('#centerName')

    let centerName =  centerNameinput.value.trim()

    if (!centerName) { 
        alert('No hay ningun centro escrito')
        return
    }

    let data = {
        nombre: centerName
    }

    ajaxRequest('https://alcyon-it.com/PQTM/pqtm_alta_colegios.php', 'POST', data, 'text')
    .then(res => {
        if(res.substring(0,2) !== "00") throw res
        alert(res.substring(3))

        refreshCentersTable()

        centerNameinput.value = ''
    })
    .catch(error => alert(error))
}