USE BDEmpleados
GO

CREATE OR ALTER PROCEDURE spInsertarEmpleado
    @Nombre NVARCHAR(128),
    @Salario MONEY
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM dbo.Empleado
        WHERE Nombre = @Nombre
    )
    BEGIN
        ;THROW 51000, 'El nombre del empleado ya existe en la tabla.', 1;
    END;    

    INSERT INTO dbo.Empleado
            (Nombre
            ,Salario)
    VALUES
        (@Nombre,
        @Salario)

    SELECT 'Empleado insertado correctamente' AS Mensaje;
END;
GO