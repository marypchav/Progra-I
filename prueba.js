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

//Obtener tabla
async function obtenerTabla() {
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

//Insertar empleado
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

//Validación de entrada insertarEmpleado(nombre, salario)
function validarIE(nombre, salario) {

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
  
  insertarEmpleado(nombre, salario); //Inserta el empleado

}

