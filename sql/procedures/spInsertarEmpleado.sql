USE BDEmpleados
GO

CREATE OR ALTER PROCEDURE [dbo].[spInsertarEmpleado]
	@Nombre VARCHAR(128)
	, @Salario MONEY
AS
BEGIN
	SET NOCOUNT ON;

	IF EXISTS (SELECT 1 FROM dbo.Empleado WHERE Nombre = @Nombre)
	BEGIN
		;THROW 51000, 'Ya existe el empleado', 1;
	END

	INSERT INTO dbo.Empleado(Nombre, Salario)
	VALUES (@Nombre, @Salario);

	SELECT 'Empleado insertado correctamente' AS Mensaje;
END
GO