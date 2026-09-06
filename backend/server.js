//Cosas para acceder el sql server
//Abre de un solo el index.html porque es lo primero que siempre busca

//CONSTANTES
const express = require ('express');
const sql = require('mssql');
const app = express();

app.use(express.static('../frontend'));
app.use(express.json());

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

//Funciones
async function obtenerTabla() {
  try {

    let pool = await sql.connect(bdSettings);
    console.log('Ya te conectaste al server'); //Avisa a la consola que sí se pudo entrar al server

    let resultado = await pool.request() 
      .execute('dbo.spObtenerTablaOrdenada');

    console.log('Output del server: ', resultado.recordset);
    return { success: true , datos: resultado.recordset};

  } catch (error) {

    console.error('Error al ejecutar el SP', error);
    return { success: false, error: error.message}

  }
};

app.get('/empleados', async (req, res) => {
    const resultado = await obtenerTabla();
    res.json(resultado);
});

async function insertarEmpleado(nombre, salario) {
  try {

    let pool = await sql.connect(bdSettings);
    console.log('Ya te conectaste al server'); //Avisa que sí se pudo entrar al server

    let resultado = await pool.request()
      .input('Nombre', sql.VarChar, nombre)
      .input('Salario', sql.Money, salario)
      .execute('spInsertarEmpleado');

    console.log('Output del server: ', resultado.recordset[0].Mensaje); //Muestra el mensaje del SP "Empleado insertado correctamente"
    return { success: true, mensaje: resultado.recordset[0].Mensaje };
  
  } catch (error) {

    if (error.number === 51000) { //Error, nombre ya existente en la tabla
       console.log(error.message);
       return { success: false, mensaje: "Ya existe el empleado" };
    }

    console.error('Error al ejecutar el SP'); //Error general
    return { success: false, error: 'Error al insertar el empleado' }

  }
}

app.post('/empleados', async (req, res) => {
    const { nombre, salario } = req.body;

    const resultado = await insertarEmpleado(nombre, salario);
    res.json(resultado);
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

