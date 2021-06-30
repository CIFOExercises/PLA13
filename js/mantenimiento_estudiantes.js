import { ajaxRequest } from "../js/ajax.js";

init()

function init() {
    let id = getSelectedAlumno()
    sessionStorage.removeItem('selectedAlumno')
    if (!id) window.location = '?consulta'

    consultaProfesores()
}

function getSelectedAlumno() {
    return sessionStorage.getItem('selectedAlumno')
}

async function consultaProfesores() {
    const selectProfesores = document.querySelector('#teacher');
    console.log(selectProfesores)

    let data = {
        tipoconsulta: "A"
    }

    await ajaxRequest("https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php", "POST", data, "json")
        .then(profesores => {

            selectProfesores.removeAttribute('disabled')
            profesores.forEach(profesor => selectProfesores.innerHTML += `<option value="${profesor.idteacher}">${profesor.nombre}</option>`)
        })
        .catch(error => alert(error))

    // selectProfesores.onchange = handleChange;
}