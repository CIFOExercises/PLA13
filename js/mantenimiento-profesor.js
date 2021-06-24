import { loadTable as refreshTable, appendTable, changePage } from "./refresh-table.js";
import { updateProfesor } from "./updateProfesor.js";
import { removeProfesor } from "./removeProfesor.js";
import { addProfesor } from "./addProfesor.js";
import { getAllProfesors } from "./getAllProfesors.js";
import { consultaCentros } from "./consultaCentros.js";

(async () => {
	let profesores = await getAllProfesors(1)
	appendTable(profesores)

	for (let i = 0; i < profesores[1]; i++) {
		document.querySelector('#pagination').innerHTML += `<span data-page='${i + 1}'> ${i + 1} </span>`
	}

	for (const item of document.querySelector('#pagination').children) {
		item.onclick = changePage
	}

	document.querySelector(`[data-page='1']`).style.fontWeight = 700;

	await consultaCentros();
})();

document.forms.namedItem('manteniment-profesor').onsubmit = handleSubmit;

function handleSubmit(e) {
	e.preventDefault();

	switch (e.submitter.name) {
		case 'alta-formador':
			addProfesor();
			break;
		case 'modificar-formador':
			updateProfesor();
			break;
		case 'baixa-formador':
			removeProfesor();
			break;

		default:
			break;
	}
}