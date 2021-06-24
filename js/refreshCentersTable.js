import { ajaxRequest } from "./ajax.js";
import { getAllCenters } from "./getAllCenters.js";

export async function refreshCentersTable() {
    let centros = await getAllCenters()
    appendTable(centros)
}

function appendTable(centros) {
    document.querySelector(".centersTable tbody").innerHTML = ''
    for (const item of centros) {
        document.querySelector(".centersTable tbody").innerHTML += `
            <tr class="centersTable-item">
                <td class="idcolegio">${item.idcolegio}</td>
                <td>
                    <input type="text" value="${item.nombre}">
                </td>
                <td>
                    <button class="modifyCenter">Modificar</button>
                </td>
                <td>
                    <button class="deleteCenter">X</button>
                </td>
            </tr>
            `;
    }

    document.querySelectorAll(".centersTable-item .modifyCenter").forEach((item) => {
        item.onclick = modifyCenter
    });

    document.querySelectorAll(".centersTable-item .deleteCenter").forEach((item) => {
        item.onclick = deleteCenter
    });

}

function modifyCenter() {
    let idcolegio = this.closest('tr').children[0].textContent
    let nombre = this.closest('tr').children[1].children[0].value.trim()

    let data = {
        idcolegio,
        nombre
    }

    ajaxRequest('https://alcyon-it.com/PQTM/pqtm_modificacion_colegios.php', 'POST', data)
    .then(res => {
        if(res.substring(0,2) !== "00") throw res
        alert(res.substring(3))

        refreshCentersTable()
    })
    .catch(error => alert(error))
}

function deleteCenter() {
    let idcolegio = this.closest('tr').children[0].textContent

    let data ={
        idcolegio
    }

    ajaxRequest('https://alcyon-it.com/PQTM/pqtm_baja_colegios.php', 'POST', data)
    .then(res => {
        if(res.substring(0,2) !== "00") throw res
        alert(res.substring(3))

        refreshCentersTable()
    })
    .catch(error => alert(error))
}