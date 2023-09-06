# "FedeFlix"
App backend en nodejs donde se puede visualizar el listado de peliculas guardadas en la base de datos, crear, actualizar y eliminar. Ademas se listan peliculas de la api externa OMDB el cual se pueden agregar a nuestra base de datos. Estas acciones solo las puede realizar el usuario designado como administrador
Tambien contiene login/register conectado con la base de datos con sus validaciones y su respectivo CRUD.

# Para comenzar
-Asegurese de tener instalado Node.js 
-Clonar o descargar el proyecto de GitHub 'https://github.com/fedeAragona/fedeflixNodejs' (main)
-Instalar las dependencias ('npm install')
-Crear la base de datos en MySQL (Asegurarse que el nombre sea fedeflix y luego importar el archivo fedeflix.sql)
-Ejecutar con XAMPP los servicios MySQL en el puerto 3306
-Utilice 'npm start' para ejecutar la aplicacion 
-Abrir 'http://localhost:3030' en el navegador para ver los resultados

# API
-Para la data de las pelicula se utilizo la API external 'https://www.omdbapi.com'

# Nuestras APIs
-/api/peliculas
-/api/users

# GitHub Repositorio
-https://github.com/fedeAragona/fedeflixNodejs

# Componentes utilizados en el proyecto
-axios
-bcrypt
-bcryptjs
-ejs
-express
-express-session
-express-validator
-jsonwebtoken
-method-override
-morgan
-multer
-mysql2
-nodemon
-passport
-passport-jwt
-passport-local
-sequelize

# Herramienta de analisis utilizada
-Linter
