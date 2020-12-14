# CAR-RENTAL-AGENCY
Proyecto: Agencia de alquiler de autos

Tecnologias: HTML, CSS, JS, Nunjucks, Bulma, NodeJS, SQLite.

## To-Do:
- [ ] Fix details.
- [ ] Add validations ¿?
- [ ] Unit testing.

## Requisitos C18 PT4:

### ABM/CRUD DE AUTOS:
    - Marca
    - Modelo
    - Año
    - Kms
    - Color
    - Aire acondicionado (Si/No)
    - Pasajeros
    - Manual / Automatico

## Requisitos C18 PT5: 

### Se deben poder dar de alta clientes manualmente (panel de backoffice)

    - Nombres
    - Apellidos
    - Tipo documento
    - Numero documento
    - Nacionalidad
    - Direccion
    - Telefono
    - E-mail
    - Fecha de nacimiento

### Se deben poder gestionar alquileres manualmente

    - 1 alquiler se realiza entre 1 auto (maximo) y 1 cliente (maximo)

    - La tabla de alquileres debe guardar:

    -- fk auto
    -- fk cliente
    -- precio unitario del auto
    -- fecha desde
    -- fecha hasta
    -- precio total
    -- medio de pago
    -- si el alquiler esta pago (booleano)
    
    - Realizar diagrama C4 L1, L2 y L3 del sistema de gestion de autos
