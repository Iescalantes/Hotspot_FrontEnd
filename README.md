# Nombre del proyecto

HotSpot

# Objetivo

El objetivo es crear una página en la que tanto los fanáticos de los festivales como los usuarios que se plantean ir a uno 
puedan acceder a toda la información de los festivales que se celebran en el país, los artistas que asistirán, las ubicaciones 
en las que se celebran, las fechas etc. 

# Funcionalidades

USUARIO ADMINISTRADOR:
    - Registrarse y loguearse.
    - Admitir y denegar peticiones de adición de festivales.
    - Crear, editar y eliminar los artistas de la base de datos.

USUARIO EMPRESA:
    - Registrarse y loguearse
    - Editar sus datos de pefil.
    - Realizar petición nivel FREE a los administradores para que añadan su festival.
    - Realizar petición nivel PRO a los administradores para que añadan su festival.
    - Realizar petición nivel ENTERPRISE a los administradores para que añadan su festival.
    - Consultar y eliminar los festivales asociados a su cuenta .
    - Dar de baja su cuenta y todos sus datos.

USUARIO VISITANTE: 
    - Registrarse y loguearse
    - Seguir a otros usuarios que te interesen.
    - Editar sus datos de perfil.
    - Acceder a su espacio personal.
        - Consultar sus festivales favoritos.
        - Consultar sus artistas favoritos.
        - Visualizar a qué usuarios sigue.
    - Eliminar su cuenta y todos sus datos.

# Modelos

VISITANTE: 
- ID_Usuario (PK)
- Foto de perfil
- Nombre de usuario
- Fecha de nacimiento
- [Artistas_favoritos] (IDs Artistas guardados)
- [Festivales_favoritos] (IDs Festivales guardados)

EMPRESA 
- ID_Empresa (PK)
- Nombre
- Foto de perfil
- Descripción
- [Festivales_Realizados] (IDs Festivales asociados)

ARTISTA
- ID_Artista (PK)
- Foto de perfil
- Nombre artistico
- Nombre real
- Géneros
- Descripción
- [Tags]
- [Festivales_que_acude] (IDs Festivales a los que pertenece)

FESTIVAL
- ID_Festival (PK)
- ID_Empresa (FK)
- Nombre
- Localización
- Descripción
- Imágenes
- Mayoría_Edad
- Es_HOT
- Es_Novedad
- [Artistas_Participantes]

# Stack tecnológico

Back End: - NodeJs - Express

BBDD: - MongoDB

Diseño: - HTML, CSS y Boostrap

Front End: - Angular (JavaScript)

Despliegues: - GithubPages & Railway
