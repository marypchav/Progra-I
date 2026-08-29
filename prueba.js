// CONSTANTES

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

// FUNCIONES UI

// obtener tabla
async function obtenerTabla() {
  //la renombré a "obtenerTabla" para que hiciera match con el nombre del sp
  try {
    let pool = await sql.connect(bdSettings);
    console.log('Ya te conectaste al server'); //Avisa que sí se pudo entrar al server

    let resultado = await pool.request() 
      .execute('spObtenerTablaOrdenada');

    console.log('Output del server: ', resultado.recordset);
    return { succes: true };

  } catch (error) {
    console.error('Error al ejecutar el SP', error);
    return { succes: false, error: error.message}
  }
}

// insertar empleado
async function insertarEmpleado(nombre, salario) {
  try {

    let pool = await sql.connect(bdSettings);
    console.log('Ya te conectaste al server'); //Avisa que sí se pudo entrar al server

    let resultado = await pool.request()
      .input('Nombre', sql.VarChar, nombre)
      .input('Salario', sql.Money, salario)
      .execute('spInsertarEmpleado');

    console.log('Output del server: ', resultado.recordset[0].Mensaje); //Muestra el mensaje del SP "Empleado insertado correctamente"
    return { succes: true };
  
  } catch (error) {

    if (error.number === 51000) { //Error, nombre ya existente en la tabla
       console.log(error.message);
    }

    console.error('Error al ejecutar el SP'); //Error general
    return { succes: false, error: error.message }

    }
}

insertarEmpleado('Mary Chavarría', 200000.00)