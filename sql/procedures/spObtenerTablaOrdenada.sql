USE BDEmpleados
GO

CREATE OR ALTER PROCEDURE [dbo].[spObtenerTablaOrdenada]
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY

        SELECT -- Obtener los empleados ordenados alfabéticamente
            E.id,
            E.Nombre,
            E.Salario
        FROM dbo.Empleado AS E
        ORDER BY
            E.Nombre ASC;

    END TRY
    BEGIN CATCH

        THROW; -- Devolver el error

    END CATCH;
END;
GO