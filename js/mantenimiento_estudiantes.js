import { ajaxRequest } from "../js/ajax.js";

init();

function init() {
  let id = getSelectedAlumno();
  if (!id) window.location = "?consulta";

  consultaProfesores();
  consultaAlumno(id);

  document.querySelector("#formMantenimiento").onsubmit = (e) => {
    e.preventDefault();
    switch (e.submitter.id) {
      case "modificar":
        modificarEstudiant();
        break;
      case "baixa":
        if (confirm("¿Quieres dar de baja el alumno?")) {
          baixaEstudiant();
        }
        break;
      default:
        break;
    }
  };
}

function getSelectedAlumno() {
  return sessionStorage.getItem("selectedAlumno");
}

async function consultaProfesores() {
  const selectProfesores = document.querySelector("#teacher");

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
      profesores.forEach(
        (profesor) =>
          (selectProfesores.innerHTML += `<option value="${profesor.idteacher}">${profesor.nombre}</option>`)
      );
    })
    .catch((error) => alert(error));

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
      consultaGruposProfesor(alumno[0].idprofesor);
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
    .then((grupos) => {
      document.querySelector("#groups").innerHTML = ``;
      grupos.forEach((grupo) => {
        document.querySelector(
          "#groups"
        ).innerHTML += `<option value="${grupo.idgrupo}">${grupo.nombregrupo}</option>`;
        document.querySelector("#groups").removeAttribute("disabled");
      });
    })
    .catch((error) => alert(error));
}

async function consultaGruposProfesor(idprofesor) {
  let data = {
    tipoconsulta: "P",
    idprofesor,
  };

  await ajaxRequest(
    "https://alcyon-it.com/PQTM/pqtm_consulta_grupos.php",
    "POST",
    data,
    "json"
  )
    .then((grupos) => {
      document.querySelector(
        "#changeTo"
      ).innerHTML = `<option value="0">Select Group</option>`;
      grupos.forEach((grupo) => {
        document.querySelector(
          "#changeTo"
        ).innerHTML += `<option value="${grupo.idgrupo}">${grupo.nombregrupo}</option>`;
      });
    })
    .catch((error) => alert(error));
}

function modificarEstudiant() {
  if (!validarCampos()) {
    alert("uno o mas campos son invalidos");
    return;
  }

  let data = {
    nombre: document.querySelector("#name").value,
    email: document.querySelector("#email").value,
    usuario: document.querySelector("#user").value,
    profesor: document.querySelector("#teacher").value,
    idalumno: document.querySelector("#id").value,
    grupo: document.querySelector("#changeTo").value,
  };

  if (document.querySelector("#image").files[0]) {
    data.foto = document.querySelector("#image").files[0]
  }

  ajaxRequest(
    "https://alcyon-it.com/PQTM/pqtm_modificacion_alumnos.php",
    "POST",
    data,
    "text"
  )
    .then((res) => {
      if (res.substring(0, 2) !== "00") throw res.substring(3);
      alert(res.substring(3));
      init();
    })
    .catch((error) => alert(error));
}

function validarCampos() {
  let form = document.querySelector('#formMantenimiento')

  if (form.checkValidity()) {
    if (
      !form.name.value ||
      !form.user.value ||
      !form.email.value ||
      !form.teacher.value ||
      !form.id.value ||
      !form.changeTo.value
    ) {
      console.log("hay almenos un campo que no esta informado");
      return false;
    }

    if (!form.teacher.getAttribute('disabled')) {
      alert("No puedes cambiar el profesor asignado al alumno")
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

function baixaEstudiant() {
  const id = document.querySelector("#id").value;

  if (!validarId(id)) {
    alert("el id no es válido");
    return;
  }

  let data = {
    idalumno: id,
  };

  ajaxRequest(
    "https://alcyon-it.com/PQTM/pqtm_baja_alumnos.php",
    "POST",
    data,
    "text"
  )
    .then((res) => {
      if (res.substring(0, 2) !== "00") throw res.substring(3);
      alert(res.substring(3));
      window.location = "?consulta";
    })
    .catch((error) => alert(error));
}

function validarId(id) {
  if (!id) return false;
  return true;
}