const API_URL = 'http://localhost:3000/api/empleados';

async function cargarEmpleados() {
  try {
    const respuesta = await fetch(API_URL);
    const empleados = await respuesta.json();

    const tbody = document.getElementById('tabla-empleados');
    tbody.innerHTML = ''; // limpiar antes de repintar

    empleados.forEach(emp => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.Nombre}</td>
        <td>${emp.Salario}</td>
      `;
      tbody.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar empleados:', error);
    alert('No se pudo conectar con el servidor.');
  }
}

document.getElementById('btn-insertar').addEventListener('click', () => {
  window.location.href = 'insertar.html';
});

cargarEmpleados(); // se ejecuta al cargar la página