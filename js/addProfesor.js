import { ajaxRequest } from "./ajax.js";
import { loadTable as refreshTable } from "./refresh-table.js";

export function addProfesor(endpoint, data, method, dataType) {
    let form = document.forms.namedItem("manteniment-profesor");

    let isValid = validateForm();
    if (!isValid) return;

    console.log("Ha pasado la validacion");

    let datos = new FormData();
    datos.append("nombre", form.firstName.value);
    datos.append("usuario", form.user.value);
    datos.append("email", form.email.value);
    datos.append("password", form.type.value);

    sendRequest(datos);

    function validateForm() {
        if (form.checkValidity()) {
            if (
                !form.firstName.value ||
                !form.user.value ||
                !form.email.value ||
                !form.type.value
            ) {
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
        return true;
    }

    function sendRequest(data) {
        let param = {
            nombre: form.firstName.value,
            usuario: form.user.value,
            email: form.email.value,
            password: form.type.value
        };

        ajaxRequest('https://alcyon-it.com/PQTM/pqtm_alta_profesores.php', 'POST', param, 'text').then((res) => refreshTable(), (error) => alert(error))
    }

}