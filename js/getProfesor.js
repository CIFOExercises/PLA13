import { ajaxRequest } from "./ajax.js";

export function getProfesor(teacherId) {

    let data = {
        tipoconsulta: "P",
        id: teacherId
    }

    ajaxRequest('https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php', 'POST', data, 'json').then((profesor) => {
        document.querySelector("#idprofesor").value = profesor[0].idteacher;
        document.querySelector("#firstName").value = profesor[0].nombre;
        document.querySelector("#user").value = profesor[0].user;
        document.querySelector("#email").value = profesor[0].email;
        document.querySelector("#type").value = profesor[0].tipo;
        document.querySelector("#center").value = profesor[0].colegio;
    }, (error) => alert(error))
}