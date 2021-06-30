import { ajaxRequest } from "../js/ajax.js";

document.querySelector('.component-container').setAttribute('id', "alta")

init()

function init() {
    fillTeacherSelect()

    document.querySelector('#formAlta').onsubmit = handleSubmit;
    document.querySelector('#formAlta').onreset = handleReset;

}

async function fillTeacherSelect() {
    const selectProfesores = document.querySelector('#teacher');

    let data = {
        tipoconsulta: "A"
    }

    selectProfesores.innerHTML = '<option value="0">Select Teacher</option>'

    await ajaxRequest("https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php", "POST", data, "json")
        .then(profesores => profesores.forEach(profesor => selectProfesores.innerHTML += `<option value="${profesor.idteacher}">${profesor.nombre}</option>`))
        .catch(error => alert(error))

    selectProfesores.onchange = handleChange;
}

async function handleChange() {
    const selectProfesoresValue = document.querySelector('#teacher').value;
    const selectGrupos = document.querySelector('#addTo');

    let data = {
        tipoconsulta: "P",
        idprofesor: selectProfesoresValue
    }

    selectGrupos.innerHTML = '<option value="0">Select Group</option>'

    await ajaxRequest("https://alcyon-it.com/PQTM/pqtm_consulta_grupos.php", "POST", data, "json")
        .then(grupos => grupos.forEach(grupo => selectGrupos.innerHTML += `<option value="${grupo.idgrupo}">${grupo.nombregrupo}</option>`))
        .catch(error => alert(error))
}

async function handleSubmit(e) {
    e.preventDefault();

    if (!validateFields()) {
        alert("Uno o mas campos son invalidos")
        return
    }

    let data = {
        opcion: "AA",
        nombre: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        usuario: document.querySelector("#user").value,
        profesor: document.querySelector("#teacher").value,
        grupo: document.querySelector("#addTo").value
    }

    if (document.querySelector("#image").files[0]) data.foto = document.querySelector("#image").files[0]

    console.log(data)

    await ajaxRequest("https://alcyon-it.com/PQTM/pqtm_alta_alumnos.php", "POST", data, "text")
        .then(res => {
            if (res.substring(0, 2) !== "00") throw res.substring(3)
            document.querySelector('#formAlta').reset()
            alert(res.substring(3))
        })
        .catch(error => alert(error))

}

function validateFields() {
    let fields = [...document.querySelector("#formAlta").children]
    let form = document.querySelector("#formAlta")

    fields.filter(q => q.nodeName === "INPUT" || q.nodeName === "SELECT").forEach(item => {
        if (item.id === "image") {
            if (!item.files[0]) return false
        } else if (item.id === "email") {
            let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
            if (!regex.test(item.value)) {
                item.setCustomValidity("El email no tiene el formato correcto");
                form.reportValidity();
                return false;
            }
        } else {
            if (!item.value) return false
        }
    })
    return true
}

function handleReset(e) {
    e.preventDefault();

    let fields = [...document.querySelector("#formAlta").children]

    fields.filter(q => q.nodeName === "INPUT").forEach(item => {
        item.value = ""
    })

    fields.filter(q => q.nodeName === "SELECT").forEach(item => {
        item.value = 0
    })
}