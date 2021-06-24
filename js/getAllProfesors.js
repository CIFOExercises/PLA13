import { ajaxRequest } from "./ajax.js";

export async function getAllProfesors(page) {

    let data = {
        tipoconsulta: "T",
        pag: page
    }

    let profesores = await ajaxRequest('https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php', 'POST', data, 'json').then((res) => res, (error) => alert(error))

    return profesores;
}