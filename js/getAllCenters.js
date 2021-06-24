import { ajaxRequest } from "./ajax.js";

export async function getAllCenters() {
    let centers = await ajaxRequest('https://alcyon-it.com/PQTM/pqtm_consulta_colegios.php', 'GET', '', 'json')
    .then(res => res)
    .catch(error => alert(error))

    return centers
}