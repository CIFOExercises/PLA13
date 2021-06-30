import { ajaxRequest } from "../js/ajax.js";

init();

function init() {
  let id = getSelectedAlumno();
  if (!id) window.location = "?consulta";

  consultaProfesores();
  consultaAlumno(id);
}

function getSelectedAlumno() {
  return sessionStorage.getItem("selectedAlumno");
}

async function consultaProfesores() {
  const selectProfesores = document.querySelector("#teacher");
  console.log(selectProfesores);

  let data = {
    tipoconsulta: "A",
  };

  await ajaxRequest(
    "https://alcyon-it.com/PQTM/pqtm_consulta_profesores.php",
    "POST",
    data,
    "json"
  )
    .then((profesores) => {
      selectProfesores.removeAttribute("disabled");
      profesores.forEach(
        (profesor) =>
          (selectProfesores.innerHTML += `<option value="${profesor.idteacher}">${profesor.nombre}</option>`)
      );
    })
    .catch((error) => alert(error));

  // selectProfesores.onchange = handleChange;
}

async function consultaAlumno(id) {
  let data = {
    tipoconsulta: "A",
    id,
  };

  await ajaxRequest(
    "https://alcyon-it.com/PQTM/pqtm_consulta_alumnos.php",
    "POST",
    data,
    "json"
  )
    .then((alumno) => {
      document.querySelector("#id").value = alumno[0].idalumno;
      document.querySelector("#name").value = alumno[0].nombre;
      document.querySelector("#user").value = alumno[0].user;
      document.querySelector("#email").value = alumno[0].email;
      document.querySelector("#teacher").value = alumno[0].idprofesor;
      if (alumno[0].foto) {
        document.getElementById(
          "avatar"
        ).src = `https://alcyon-it.com/PQTM/img/${alumno[0].foto}`;
      }

      consultaGruposAlumno(alumno[0].idalumno, alumno[0].idprofesor);
    })
    .catch((error) => alert(error));
}

async function consultaGruposAlumno(id, idprofesor) {
  let data = {
    tipoconsulta: "A",
    id,
    idprofesor,
  };

  await ajaxRequest(
    "https://alcyon-it.com/PQTM/pqtm_consulta_grupos_alumno.php",
    "POST",
    data,
    "json"
  )
    .then((grupos) =>
      grupos.forEach((grupo) => {
        document.querySelector(
          "#groups"
        ).innerHTML = `<option value="${grupo.idgrupo}">${grupo.nombregrupo}</option>`;
        document.querySelector("#groups").removeAttribute("disabled");
      })
    )
    .catch((error) => alert(error));
}
