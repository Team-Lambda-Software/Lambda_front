# Bienvenidos al Frontend de Gymnastic Lambda


<p align="center">
  <img src="https://ginastic-center.web.app/assets/icons/512.png" width="200" alt="Descripción de la imagen" />
</p>

## Diagrama de Arquitectura Hexagonal
[Diagrama de arquitectura](/public/Lambda_back_Diagrams%20-%20Hexagonal%20Front.svg)
<p align="center">
  <img src="https://ginastic-center.web.app/assets/Lambda_back_Diagrams%20-%20Hexagonal%20Front.svg" width="3000" alt="Descripción de la imagen" />
</p>


Repositorio del Frontend de la aplicación Gymnastic Center del Equipo Lambda, aplicación que basa su contenido en video tutoriales y blogs sobre yoga, ejercicio y semejantes.

# Arquitectura

Nuestra aplicación utiliza varios patrones de diseño y arquitecturas para garantizar un código limpio, entre los que se encuentran la arquitectura Hexagonal y patrones de diseño como son proxy

- **Arquitectura Hexagonal**: Esta arquitectura nos permite separar la lógica de negocio de los detalles técnicos, lo que facilita el mantenimiento y las pruebas de la aplicación.

## Instalacion

```bash
$ npm install
```

## Requisitos
- Angular V.17

## Correr la aplicacion

```bash
# development
$ npm install

## Documentación

## Aportes de cada desarrollador

### Alfredo Fung

- Capa de Core:
  
    Creacion de todas las interfaces y modelos de la capa de dominio sobre los datos recibidos por el backend, asi como sus respectivas interfaces para su implementacion en infraestructura

- Capa de Aplicación: 

    Todos los casos de usos del user, asi como la logica del modulo de auth asi como de administrador. Implementación de la interfaz de casos de uso de dichos modulos

- Capa de Infraestructura:

    La implementacion de las conecciones a los servicios de la API Rest externa en dichos modulos

### Paul Gamboa

- Capa de Dominio:
  Propuesta de arquitectura inicial del proyecto. Iterada múltiples veces en el transcurso del desarrollo en conjunto con el equipo de front.
  Creación de los modelos de dominio de trainer, blogs, cursos inicialmente, y comentarios.

- Capa de Aplicación:
  Realización de los casos de usos de trainer, blogs, cursos parcialmente, comentarios.

- Capa de Infraestructura:
  Implementación de concreta de trainer, blogs, y categorías.

- Despliegue:
    Encargado de la realización del github actions para el despliegue automático del frontend, deplegado con firebase.

### Eduardo Rumbos

- Capa de Dominio:
  Creación de los módelos de dominio de cursos y posterior refactorización, progress, categorias y search.
  Propuesta inicial del patrón de diseño proxy para los módulos más frecuentes.

- Capa de Aplicación: 
  Realización de los casos de usos de cursos, progress, categorias y search.

- Capa de Infraestructura:
  Implementación concreta de cursos, progress, categorias, y search.
 ```

## Autores

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/116277334?v=4&size=50" width=115><br><sub>Alfredo Fung</sub><br>
  <img src="https://avatars.githubusercontent.com/u/118032807?v=4&size=50" width=115><br><sub>Paul Gamboa</sub><br>
  <img src="https://avatars.githubusercontent.com/u/117108052?v=4&size=50" width=115><br><sub>Eduardo Rumbos</sub><br>
</p>



