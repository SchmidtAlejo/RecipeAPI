# RecipeAPI
Introducción: 

En esta API es para una aplicación donde se podran buscar recetas de comidas en base a un ingrediente. 
Los usuarios podrán darle "likes" y guardar sus recetas favoritas. Además, podrán ver las recetas con 
mayor cantidad de likes.

# Alcance:

1. Registro de usuario.
2. Inicio de sesión de usuario.
3. Cambio de constraseña.
5. Buscar recetas por ingrediente. 
6. Agregar recetas a favorito.
7. Agregar like a las recetas.
8. Agregar comentarios a las recetas.
9. Agregar likes a los comentarios de las recetas.
10. Ver listado de recetas guardadas en favorito.
11. Eliminar receta del listado de favoritos.

# Base Url:

https://recipeapi-production-06e1.up.railway.app

### Endpoints para los usuarios: 

GET: api/users (Devuelve todos los usuarios)

GET: api/users/[id] (Devuelve el usuario del id ingresado)

POST: api/users (crea el usuario)
body:{
    "email": [email],
    "username": [username],
    "password": [password]
}

POST: api/users/login (devuelve el usuario y el token)
body:{
    "email": [email],
    "password": [password]
}

PUT: api/users (Cambia la contraseña del usuario)
body:{
    "password": [password]
}

### Endpoints para las recetas: 

GET: api/recipes?ingridientSearch=[ingredientQuery] (Devuelve todos los ingredientes que emparejen con el ingrediente ingresado)

GET: api/recipes??ingridient=[ingredientName] (devuelve todas las recetas que se pueden hacer con el ingrediente ingresado)

GET: api/recipes/[id] (devuelve los detalles de la receta ingresada)

### Endpoints para los likes:

GET: api/likes/[recipeId] (Devuelve todos los likes que recibio una receta)

POST: api/likes (Agrega un like del usuraio a la receta que se pasa por el body)
{
    "recipeId": [recipeId]
}

DELETE: api/likes/[recipeId] (Elimina el like del usuario a la receta)

### Endpoints para los comentarios:

GET: api/comments/[recipeId] (Devuelve todos los comentarios que recibio una receta)

POST: api/comments (Agrega un comentario del usuraio a la receta que se pasa por el body)
{
    "recipeId": [recipeId],
    "text": [comment]
}

DELETE: api/comments/[id] (Elimina el like del usuario a la receta que se pasa por el body)

PUT: api/comments/[id] (Edita un comentario del usuraio a la receta que se pasa por el body)
{
    "text": [comment]
}

### Endpoints para los likes de los comentarios:

GET: api/likeComments/[commentId] (Devuelve todos los likes que recibio un comentario)

POST: api/likeComments (Agrega un like del usuraio al comentario que se pasa por el body)
{
    "commentId": [commentId]
}

DELETE: api/likeComments/[commentId] (Elimina el like del usuario al comentario)

### Endpoints para las recetas favoritas:

GET: api/favorites (Devuelve todas las recetas que esten agregadas en favorito)

GET: api/favorites/[recipeId] (Devuelve una receta favorita del id ingresado)

POST: api/likes (Agrega un receta a la lista de favoritos)
{
    "recipeId": [recipeId]
}

DELETE: api/likes/[recipeId] (Elimina una receta de la lista de favoritos)
