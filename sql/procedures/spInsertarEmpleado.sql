USE BDEmpleados
GO

CREATE OR ALTER PROCEDURE [dbo].[spInsertarEmpleado]
	@Nombre VARCHAR(128),
	@Salario MONEY
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRY

		IF EXISTS
		(
			SELECT 1
			FROM dbo.Empleado AS E
			WHERE E.Nombre = @Nombre
		)
		BEGIN
			;THROW 51000, 'Ya existe el empleado', 1; -- Validar que no exista otro empleado con el mismo nombre
		END

		INSERT INTO dbo.Empleado --Insertar el nuevo empleado
		(
			Nombre,
			Salario
		)
		VALUES
		(
			@Nombre,
			@Salario
		);

		SELECT 
			'Empleado insertado correctamente' AS Mensaje;
	
	END TRY
    BEGIN CATCH

        THROW; -- Devolver el error generado durante la ejecución.

    END CATCH;

END
GO