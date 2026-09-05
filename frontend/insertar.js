const API_URL = 'http://localhost:3000/api/empleados'; 

const inputNombre = document.getElementById('nombre');
const inputSalario = document.getElementById('salario');
const errorNombre = document.getElementById('error-nombre');
const errorSalario = document.getElementById('error-salario');
const mensajeGeneral = document.getElementById('mensaje-general');

// Regex según la especificación:
// Nombre: solo letras (con acentos/ñ) y espacios o guion
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s-]+$/;
// Salario: dígitos, opcionalmente un punto decimal, hasta 4 decimales
const REGEX_SALARIO = /^\d+(\.\d{1,4})?$/;

function limpiarErrores() {
  errorNombre.textContent = '';
  errorSalario.textContent = '';
  mensajeGeneral.textContent = '';
}

function validarFormulario(nombre, salario) {
  let esValido = true;

  if (nombre.trim() === '') {
    errorNombre.textContent = 'El nombre no puede estar vacío.';
    esValido = false;
  } else if (!REGEX_NOMBRE.test(nombre)) {
    errorNombre.textContent = 'El nombre solo puede contener letras, espacios o guiones.';
    esValido = false;
  }

  if (salario.trim() === '') {
    errorSalario.textContent = 'El salario no puede estar vacío.';
    esValido = false;
  } else if (!REGEX_SALARIO.test(salario)) {
    errorSalario.textContent = 'El salario debe ser un valor monetario válido (ej: 250000.00).';
    esValido = false;
  }

  return esValido;
}

document.getElementById('btn-guardar').addEventListener('click', async () => {
  limpiarErrores();

  const nombre = inputNombre.value;
  const salario = inputSalario.value;

  if (!validarFormulario(nombre, salario)) {
    return; // no llama al backend si la validación de UI falla
  }

  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, salario: parseFloat(salario) })
    });

    const resultado = await respuesta.json();

    // AJUSTAR según lo que realmente devuelva spInsertarEmpleado
    // Asumiendo algo tipo { Codigo: 0, Mensaje: '...' } o similar
    if (resultado.Codigo === 0 || resultado.exito) {
      mensajeGeneral.style.color = 'green';
      mensajeGeneral.textContent = 'Inserción exitosa.';
      setTimeout(() => { window.location.href = 'index.html'; }, 1000);
    } else {
      mensajeGeneral.style.color = 'red';
      mensajeGeneral.textContent = 'Nombre de Empleado ya existe.';
    }
  } catch (error) {
    console.error('Error al insertar:', error);
    mensajeGeneral.style.color = 'red';
    mensajeGeneral.textContent = 'Error de conexión con el servidor.';
  }
});

document.getElementById('btn-regresar').addEventListener('click', () => {
  window.location.href = 'index.html';
});