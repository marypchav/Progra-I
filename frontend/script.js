// Cosas que interactuan con el html
// FUNCIONES UI

//Cargar tabla al html
async function cargarTabla() {
    const respuesta = await fetch('/empleados'); //Conecta directamente con server.js
    const resultado = await respuesta.json();

    const tbody = document.getElementById('tabla-empleados');
    if (!tbody) {
        return;
    }

    resultado.datos.forEach(empleado => { //Arreglar los datos de cada empleado para que sigan la estructura deseada en el html
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
  //Constante para los mensajes de error en la app web
  const mensajeGeneral = document.getElementById('mensaje-general');

  //Limpiar mensajes anteriores
  mensajeGeneral.textContent = "";
  mensajeGeneral.style.color = "";

  //Ahora sí, función validarIE
  const nombreFormato = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/; //Formato alfabético a seguir del nombre + apellido
  const salarioFormato = /^\d+(?:\.\d{1,2}|\.\d{4})?$/; //Formato numérico a seguir con 2 o 4 decimales
  if (!nombre || nombre.trim() === "") { //Si nombre = null
    mensajeGeneral.style.color = "red";
    mensajeGeneral.textContent = "Por favor, escriba el nombre";
    return;
  }

  salario = String(salario).trim();

  if (!salarioFormato.test(salario)) { //Si el salario no sigue el formato dado con anterioridad
    mensajeGeneral.style.color = "red";
    mensajeGeneral.textContent = "El salario debe ser un valor monetario válido, con solo dígitos y un punto decimal, y con máximo 2 o 4 decimales";
    return;
  }

  const salarioNumero = Number(salario); //Convierte el string de salario a número, variable a usar en insertarEmpleado()

  if (nombre.trim() !== "-" && !nombreFormato.test(nombre.trim())) { //Si el nombre no sigue el formato dado con anterioridad
    mensajeGeneral.style.color = "red";
    mensajeGeneral.textContent = "El nombre debe de contener solo valores alfabéticos, o ser '-'";
    return;
  }

    try {
      const respuesta = await fetch('/empleados', { //Conecta directamente con server.js
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              nombre: nombre,
              salario: salarioNumero
          })
    });

    const resultado = await respuesta.json();
    console.log(resultado); //Ver si inserta

    if (resultado.success) {
        mensajeGeneral.style.color = "green";
        mensajeGeneral.textContent = resultado.mensaje || "Empleado insertado con éxito";
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

if (botonGuardar) { //Si el botón guardar se clickea, llama a validarIE()
    botonGuardar.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value;
        
        const salario = document.getElementById('salario').value.trim();

        validarIE(nombre, salario);
    });
};