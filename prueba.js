/*
const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

// Create the server and define the response
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('holaaa!\n');
});

// Start listening for requests
server.listen(port, hostname, () => {
  console.log(`aquí está tu server bella un abrazo http://${hostname}:${port}/`);
});
*/

const sql = require('mssql');
const { default: Null } = require('tedious/lib/data-types/null');

const bdSettings = {
  user: 'sa',
  password: 'basesI',
  server: '192.168.5.192',
  database: 'BDEmpleados',
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

async function mostrarTabla(id = null) {
  try {
    let pool = await sql.connect(bdSettings);
    console.log('Ya te conectaste al server');

    //probar con sp
    let solicitud = pool.request();

    if (id !== null) {
      solicitud.input('EmpleadoId', sql.Int, id);
    } 
    console.log('...Ejecutando SP...')
    let resultado = await solicitud.execute('dbo.spDiccionarioEmpleados');

    console.log('Datos: ', resultado.recordset);

  } catch (error) {
    console.log('Error al conectar: ', error);
  }
}

// Funciones UI

// insertar
async function insertarEmpleado(nombre, salario) {
  try {
    let pool = await sql.connect(bdSettings);
    console.log('Ya te conectaste al server');

    let resultado = await pool.request()
      .input('Nombre', sql.VarChar, nombre)
      .input('Salario', sql.Money, salario)
      .execute('spInsertarEmpleado');

    console.log('Output del server: ', resultado.recordset[0].Mensaje);
    return { succes: true };
  
  } catch (error) {
    console.error('Error al ejecutar el SP: ', error);
    return { succes: false, error: error.message}
  }
}

insertarEmpleado('Sahora García', 500000.00);
mostrarTabla();