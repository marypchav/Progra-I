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

  const nombreFormato = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/; //Formato alfabético a seguir del nombre + apellido

  if (!nombre || nombre.trim() === "") { //Si nombre = null
    console.log('Por favor, escriba el nombre');
    return;
  }
  if (!salario) { //Si salario = null
    console.log('Por favor, digite el salario');
    return;
  }
  if (nombre.trim() !== "-" && !nombreFormato.test(nombre.trim())) { //Si el nombre no sigue el formato alfabético dado con anterioridad ó no es "-"
    console.log('El nombre debe de contener solo valores alfabéticos, o ser "-"');
    return;
  }
  if (typeof salario !== "number" || !Number.isFinite(salario)) { //Si el salario no es de tipo número ó no es un número finito válido
    console.log('El salario debe de ser un valor monetario válido');
    return;
  }
  
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

  console.log(resultado); //Inserta el empleado

};
  
const botonGuardar = document.getElementById('btn-guardar');

if (botonGuardar) {
    botonGuardar.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        const salario = Number(document.getElementById('salario').value);

        validarIE(nombre, salario);
    });
};