import { ajaxRequest } from "../js/ajax.js";

init()

async function init() {
    document.querySelector('.component-container').setAttribute('id', "consulta")

    await fillTeacherSelect()

    await consultarAlumnosByProfesor(0, 1)

    document.querySelector(`[data-page='1']`).style.fontWeight = 700;
}

async function changePage() {
    let page = this.innerText.trim()

    document.querySelectorAll(`[data-page]`).forEach(item => item.style.fontWeight = 400)

    let idteacher = parseInt(document.querySelector('#teacher').value);

    await consultarAlumnosByProfesor(idteacher, page)

    document.querySelector(`[data-page='${page}']`).style.fontWeight = 700;
}

function appendTable(alumnos) {
    let consultaTable = document.querySelector('#consultaTable tbody');
    consultaTable.innerHTML = "";

    alumnos[0].forEach(alumno => {
        consultaTable.innerHTML += `<tr class="table-item">
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

    for (const item of pagination.children) {
        item.onclick = changePage
    }

    document.querySelectorAll(".table-item").forEach(item => {
        item.onclick = selectAlumno;
        console.log(item)
    })
}

function selectAlumno(e) {
    document.querySelectorAll(".table-item").forEach(item => {
        item.style.backgroundColor = "transparent"
    })
    e.target.parentNode.style.backgroundColor = "white"
    e.target.parentNode.setAttribute('selected', true)

    document.querySelector("#nav-mantenimiento").classList.remove('inactive-link')
}

async function fillTeacherSelect() {
    const selectProfesores = document.querySelector('#teacher');

    let data = {
        tipoconsulta: "A"
    }

    await ajaxRequest("https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php", "POST", data, "json")
        .then(profesores => profesores.forEach(profesor => selectProfesores.innerHTML += `<option value="${profesor.idteacher}">${profesor.nombre}</option>`))
        .catch(error => alert(error))

    selectProfesores.onchange = handleChange;
}

function handleChange(e) {
    consultarAlumnosByProfesor(e.target.value, 1)
}

async function consultarAlumnosByProfesor(idteacher, page) {

    let data1 = {
        tipoconsulta: "T",
        pag: page,
        id: idteacher
    }

    await ajaxRequest("https://alcyon-it.com/PQTM/pqtm_consulta_alumnos.php", "POST", data1, "json")
        .then(alumnos => appendTable(alumnos))
        .catch(error => alert(error))

}

