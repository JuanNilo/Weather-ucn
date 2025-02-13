
# Departamento Informática UCN

Esta aplicación permite visualizar datos meteorológicos en tiempo real, obtenidos de una API externa, y mostrarlos en una tabla con opciones de paginación y descarga en formato CSV. Además, incluye la funcionalidad de mostrar camaras del campus Guayacán de la Universidad Católica del Norte.


## Instalación y Ejecución

Ejecución del proyecto

```bash
  npm i
  npm run start 
```
Crear archivo **.env** que contrandra las variables globales.

```bash
  DATABASE_URL  =  "postgresql://user:password@localhost:5432/mydatabase"
  VITE_API_URL  =   http://localhost:80
```

Asegúrate de reemplazar `user`, `password`, `localhost`, `5432`, y `mydatabase` con los valores correctos para tu configuración de base de datos.

#### Ejecutar migraciones de Prisma

Ejecuta las migraciones de Prisma para configurar la base de datos:

```bash
npx prisma migrate dev --name init --schema ./backend/prisma/schema.prisma
```
## Llamadas a la API

#### Obtener todos los datos


```http
  GET /api/data
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Obtener los datos de un día especifico

```http
  GET /api/data/${fecha}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fecha`      | `string` | Formato de la fecha: YYYY-MM-DDTHH:MM:SS.MSZ |

```http
  GET /api/data/${fechaInicial}/${fechaFinal}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `fechaInicial`      | `string` | Formato de la fecha: YYYY-MM-DDTHH:MM:SS.MSZ |
| `fechaFinal`      | `string` | Formato de la fecha: YYYY-MM-DDTHH:MM:SS.MSZ |

## Ejecutar el proyecto en paralelo
Nos conectamos con la contenedora mediante SSH.
Utilizaremos PM2 para ejecutar el proyecto en paralelo

Si aun no esta instalado PM2 usamos el siguiente comando.
````
  npm install pm2 -g
````

Nos dirigimos a la carpeta del proyecto y ejecutamos

````
pm2 start npm --name "nombre-del-proyecto" -- run start
````

Para verificar si el proyecto esta corriendo 

````
pm2 list
````

Para ver los logs del proyecto
````
pm2 logs "nombre-del-proyecto"
````

Para que el programa se reinicie automáticamente cuando el servidor se reinicie

````
pm2 startup
````

## Actualizar cambios en el servidor
Nos dirigimos mediante ssh a la carpeta del proyeto
Aplicamos los siguientes comandos
````
  git pull
  npm install (Si se instaló una nueva dependencia)
  pm2 restart "Weather-ucn"

````