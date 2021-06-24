import { getProfesor } from "./getProfesor.js";
import { getAllProfesors } from "./getAllProfesors.js";
import { ajaxRequest } from "./ajax.js";

export async function loadTable() {
    let profesores = await getAllProfesors(1)
    appendTable(profesores)
}

export async function changePage() {
    let page = this.innerText.trim()

    document.querySelectorAll(`[data-page]`).forEach(item => item.style.fontWeight = 400)

    document.querySelector(`[data-page='${page}']`).style.fontWeight = 700;

    let profesores = await getAllProfesors(page)
    appendTable(profesores)
}

export function appendTable(profesores) {

    document.querySelector(".table").innerHTML = "";
    for (const item of profesores[0]) {
        document.querySelector(".table").innerHTML += `
            <tr class='table-item'>
                    <td>${item.idteacher}</td>
                    <td>${item.nombre}</td>
                    <td>${item.tipo === "TC" ? "Teacher" : "Administrator"}</td>
            </tr>
            `;
    }
    document.querySelectorAll(".table-item").forEach((item) => {
        item.onclick = function () {
            document.querySelectorAll(".table-item").forEach((item) => {
                item.style.backgroundColor = "transparent";
            });
            this.style.backgroundColor = "white";
            document
                .querySelector(".modificar-formador")
                .removeAttribute("disabled");
            document.querySelector(".baixa-formador").removeAttribute("disabled");
            getProfesor(this.children[0].textContent);
            document.querySelector('#idprofesor').value = this.children[0].textContent;
        };
    });

}