// Cosas que interactuan con el html
// FUNCIONES UI

//Cargar tabla al html
async function cargarTabla() {
    const respuesta = await fetch('/empleados');
    const resultado = await respuesta.json();

    const tbody = document.getElementById('tabla-empleados');
    if (!tbody) {
        return;
    }

    resultado.datos.forEach(empleado => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${empleado.id}</td>
            <td>${empleado.Nombre}</td>
            <td>${empleado.Salario}</td>
        `;

        tbody.appendChild(fila);
    });
}

cargarTabla();

//Validación de entrada insertarEmpleado(nombre, salario)
async function validarIE(nombre, salario) {
  //Constantes para los mensajes de error en la app web
  const mensajeGeneral = document.getElementById('mensaje-general');

  // Limpiar mensajes anteriores
  mensajeGeneral.textContent = "";
  mensajeGeneral.style.color = "";

  //Funcion validarIE
  const nombreFormato = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/; //Formato alfabético a seguir del nombre + apellido

  if (!nombre || nombre.trim() === "") { //Si nombre = null
    mensajeGeneral.style.color = "red";
    mensajeGeneral.textContent = "Por favor, escriba el nombre";
    return;
  }
  if (salario === "" || salario === null || salario === undefined || Number.isNaN(salario)) {
    mensajeGeneral.style.color = "red";
    mensajeGeneral.textContent = "Por favor, digite el salario";
    return;
  }
  if (nombre.trim() !== "-" && !nombreFormato.test(nombre.trim())) { //Si el nombre no sigue el formato alfabético dado con anterioridad ó no es "-"
    mensajeGeneral.style.color = "red";
    mensajeGeneral.textContent = "El nombre debe de contener solo valores alfabéticos, o ser '-'";
    return;
  }
  if (typeof salario !== "number" || !Number.isFinite(salario)) { //Si el salario no es de tipo número ó no es un número finito válido
    mensajeGeneral.style.color = "red";
    mensajeGeneral.textContent = "El salario debe de ser un valor monetario válido";
    return;
  }
    try {
      const respuesta = await fetch('/empleados', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              nombre: nombre,
              salario: salario
          })
    });

    const resultado = await respuesta.json();
    console.log(resultado); //Ver si inserta

    if (respuesta.ok) {
          mensajeGeneral.style.color = "green";
          mensajeGeneral.textContent = "Empleado insertado con éxito";
      } else {
          mensajeGeneral.style.color = "red";
          mensajeGeneral.textContent = resultado.mensaje || "Error al insertar el empleado";
      }

    } catch (error) {
      mensajeGeneral.style.color = "red";
      mensajeGeneral.textContent = "Error de conexión con el servidor";
    }

};
  
const botonGuardar = document.getElementById('btn-guardar');

if (botonGuardar) {
    botonGuardar.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        
        const salarioInput = document.getElementById('salario').value.trim();
        const salario = salarioInput === "" ? "" : Number(salarioInput);

        validarIE(nombre, salario);
    });
};