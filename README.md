![image](https://github.com/user-attachments/assets/57c20b19-2150-4bbd-b142-b300ab202fab)

# Examen Sec. de Modernización - Template Frontend - Pamich Gabriel


## Descripción de la app
Sistema gestor de tareas colaborativas en donde los usuarios pueden crear, editar, listar y eliminar tareas.

- Cada tarea tiene un estado (Pendiente, En progreso, Completada)
- Cada tarea tiene una prioridad (Baja, Media, Alta)
- Cada tarea puede ser asignada a multiples usuarios
- El sistema debe incluir roles de usuario y administrador

### Requerimientos funcionales especificos:
- Administrador: puede gestionar todas las tareas y asignar multiples users a una tarea.
- User estandar: Solo puede ver y editar las tareas que esta asignado

## Instalación
1) Clonar repositorio y  ejecutar `npm install`
2) Configurar `.env.local`, `.env.production` y `.env.replica` a partir del `.env.example`
3)  Ejecutar `npm run dev`

## Estructura del proyecto

➡️Normalmente suelo separar las carpetas en el directorio raíz del proyecto, pero para este caso concreto y por los requerimientos asi especificados incluí todo en `src/screens/Examen` para que sea mas simple visualizar cada cosa.

## 🚧 Importante: Detalles y Supuestos
- Reutilicé implementaciones existentes para el login de usuarios (Logos, spinners, usercontext, entre otros)
- El login funciona tanto con DNI como con email.
- Reutilicé componentes ya definidos como Modals, Containers, Buttons, entre otros.
- Reutilicé las librerías ya incluídas en el proyecto para la estilización (Bootstrap y MUI)
- Agregué la librería [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) para la gestión de estados globales en el CRUD (Zustand funciona con hooks, encontraran el hook `useTaskStore`  dentro de `src/screens/Examen/Hooks`)
- Cree 2 vistas principales renderizadas condicionalmente: User Panel  y Admin Panel. 
- Admin tiene acceso a ambas vistas a traves de un switch button.
![image](https://github.com/user-attachments/assets/0af76c17-ef94-4403-98e4-19637dc0e58c)
- Admin visualiza las tareas en formato tabla reutilizando su componente Table basado en MUI
![image](https://github.com/user-attachments/assets/39b0b641-9e5c-46d7-8ebf-803196377988)
- User visualiza las tareas en formato de Cards usando MUI
![image](https://github.com/user-attachments/assets/9a28fd3a-d30b-4a64-b8c9-deac724608a7)
- Para el RF4 de completar una tarea SOLO cuando todos los usuarios hayan completado su parte, utilizar el editar del panel y cambiar a completada. La validación se realiza en backend, ya que solo permite pasar a estado completada la tarea si todos los usuarios tienen marcada su parte como completada, Y se infiere que solo el administrador puede marcar como completada la tarea globalmente. Los usuarios sólo pueden completar su parte.
![image](https://github.com/user-attachments/assets/28d80c88-80ef-4c2e-93ee-645d46bf8a60)
- [Supuesto] : Se asume que debido al tamaño del proyecto la cantidad de tareas a mostrar no es mayor a 10-20, por lo cual no se realizó paginación.

