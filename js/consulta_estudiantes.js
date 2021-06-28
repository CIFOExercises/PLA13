import { ajaxRequest } from "../js/ajax.js";

const selectProfesores = document.querySelector('#teacher');

let data = {
    tipoconsulta: "A"
}

ajaxRequest("https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php", "POST", data, "json")
    .then(profesores => profesores.forEach(profesor => selectProfesores.innerHTML += `<option value="${profesor.idteacher}">${profesor.nombre}</option>`))
    .catch(error => alert(error))

selectProfesores.onchange = handleChange;

function handleChange(e) {
    consultarAlumnosByProfesor(e.target.value, 1)
}

consultarAlumnosByProfesor(0, 1)

function consultarAlumnosByProfesor(idteacher, page) {

    let data1 = {
        tipoconsulta: "T",
        pag: page,
        id: idteacher
    }

    ajaxRequest("https://alcyon-it.com/PQTM/pqtm_consulta_alumnos.php", "POST", data1, "json")
        .then(alumnos => {
            console.log(alumnos)

            let consultaTable = document.querySelector('#consultaTable tbody');
            consultaTable.innerHTML = "";

            alumnos[0].forEach(alumno => {
                consultaTable.innerHTML += `<tr>
                                                <td>${alumno.idalumno}</td>
                                                <td>${alumno.nombre}</td>
                                                <td>${alumno.profesor}</td>
                                            </tr>`
            })

            let pagination = document.querySelector('#pagination');
            pagination.innerHTML = "";

            for (let i = 0; i < alumnos[1]; i++) {
                pagination.innerHTML += `<span data-page='${i + 1}'> ${i + 1} </span>`
            }
        })
        .catch(error => alert(error))

}

