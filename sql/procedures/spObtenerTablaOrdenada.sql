USE BDEmpleados
GO

CREATE OR ALTER PROCEDURE spObtenerTablaOrdenada
AS
BEGIN
    SELECT * 
    FROM dbo.Empleado
    ORDER BY Nombre ASC;
END;
GO