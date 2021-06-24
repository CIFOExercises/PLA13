import { loadTable as refreshTable } from "./refresh-table.js";
import { ajaxRequest } from "./ajax.js";

export function removeProfesor() {
    let idProfesor = parseInt(document.querySelector('#idprofesor').value)

    if (!idProfesor) return;

    let data = {
        idprofesor: idProfesor
    }

    ajaxRequest('https://alcyon-it.com/PQTM/pqtm_baja_profesores.php', 'POST', data, 'text').then((res) => {
        if (res.substring(0, 2) !== '00') throw res.substring(2)
        alert(res.substring(2));
        refreshTable();
        document.querySelector('#manteniment-profesor').reset();
        document.querySelector(".modificar-formador").toggleAttribute("disabled");
        document.querySelector(".baixa-formador").toggleAttribute("disabled");
    }, (error) => alert(error))
}