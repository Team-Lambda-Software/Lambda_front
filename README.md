# Bienvenidos al Frontend de Gymnastic Lambda


<p align="center">
  <img src="../Lambda_front/src/assets/icons/icon-512x512.png" width="200" alt="Descripción de la imagen" />
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
$ npm intall

## Documentación

### Diagrama de Arquitectura Hexagonal
![App Screenshot](./src/assets/Lambda_Hexagonal_Front.svg)

## Aportes de cada desarrollador

### Alfredo Fung

- Capa de Core:
  
    Creacion de todas las interfaces y modelos de la capa de dominio sobre los datos recibidos por el backend, asi como sus respectivas interfaces para su implementacion en infraestructura

- Capa de Aplicación: 

    Todos los casos de usos del user, asi como la logica del modulo de auth asi como de administrador. Implementación de la interfaz de casos de uso de dichos modulos

- Capa de Infraestructura:

    La implementacion de las conecciones a los servicios de la API Rest externa en dichos modulos

### Paul Gamboa

- Capa de Aplicación: 

- Capa de Infraestructura:

- Despliegue:

    Encargado de la realización del github actions para el despliegue automático del frontendo, deplegado con firebase

### Eduardo Rumbos

- Capa de Dominio


- Capa de Aplicación: 


- Capa de Infraestructura:


## Autores
| <img src="https://avatars.githubusercontent.com/u/116277334?v=4&size=64" width=115><br><sub>Alfredo Fung</sub> |  
| :---: | 
| <img src="https://avatars.githubusercontent.com/u/118032807?v=4&size=64" width=115><br><sub>Paul Gamboa</sub> |  
| :---: | 
| <img src="https://avatars.githubusercontent.com/u/117108052?v=4&size=64" width=115><br><sub>Eduardo Rumbos</sub> |  


