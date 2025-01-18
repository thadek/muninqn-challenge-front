import { Task } from "../Types/Task";

export const handleEdit = (task:Task) => {
    console.log("Editar tarea:", task);
  };
  
export const handleDelete = (taskId:number) => {
    console.log("Eliminar tarea con ID:", taskId);
  };
  
export const handleViewUsers = (task:Task) => {
    console.log("Ver usuarios de la tarea con ID:", task);
  };