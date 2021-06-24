import { loadTable as refreshTable } from "./refresh-table.js";
import { ajaxRequest } from "./ajax.js";

export function updateProfesor() {

    let isValid = validarCampos();

    if (!isValid) return;
    let profesor = isValid;

    let data = {
        idprofesor: profesor.idprofesor,
        nombre: profesor.name,
        email: profesor.email,
        usuario: profesor.user,
        tipo: profesor.type,
        colegio: profesor.center
    }

    ajaxRequest('https://alcyon-it.com/PQTM/pqtm_modificacion_profesores.php', 'POST', data, 'text').then((res) => {
        if (res.substring(0, 2) !== '00') throw res.substring(2)
        alert(res.substring(2));
        refreshTable();
    }, (error) => alert(error))
}

function validarCampos() {
    let form = document.forms.namedItem('manteniment-profesor')

    let idprofesor = parseInt(document.querySelector('#idprofesor').value)
    let name = document.querySelector('#firstName').value
    let user = document.querySelector('#user').value
    let email = document.querySelector('#email').value
    let type = document.querySelector('#type').value
    let center = document.querySelector('#center').value

    if (form.checkValidity()) {
        if (!idprofesor || !name || !user || !email || !type || !center) {
            console.log("hay almenos un campo que no esta informado");
            return false;
        }

        let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
        if (!regex.test(form.email.value)) {
            form.email.setCustomValidity("El email no tiene el formato correcto");
            form.reportValidity();
            return false;
        }
    } else {
        form.reportValidity();
        return false;
    }

    let profesor = {}
    profesor.idprofesor = idprofesor
    profesor.name = name
    profesor.user = user
    profesor.email = email
    profesor.type = type
    profesor.center = center
    return profesor;
}