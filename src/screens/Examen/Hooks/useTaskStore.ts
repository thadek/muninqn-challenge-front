import { create } from "zustand";
import { axios } from "../../../utils/axios"; 
import { Task } from "../Task/Types/Task";


interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  refresh: boolean;
  fetchTasks: (status:string[]) => Promise<void>;
  addTask: (task: Task) => Promise<void>;
  editTask: (task: Task) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  completeMyTask: (taskId: number) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  refresh: false,


  fetchTasks: async (status: string[] = []) => {  // Recibe un array de estados (por defecto vacío)
    set({ loading: true, error: null });
    try {
      // Agregar los parámetros a la URL si hay estados
      const response = await axios().get("/tasks", {
        params: {
          status: status.join(",")  // Convierte el array de estados a una cadena separada por comas
        }
      });

      set({ tasks: response.data.data, loading: false });
    } catch (error) {
      set({ error: "Error al cargar tareas", loading: false });
    }
  },


  addTask: async (task) => {
    try {
     //set({ loading: true, error: null });
     const {data} = await axios().post("/tasks", task);
    
      set((state) => ({  tasks: [...state.tasks, data.data.task] }));
    //  set({ loading: false, error: null, refresh: true });
    } catch (error) {
      set({ loading:false, error: "Error al agregar tarea" });
    }
  },

  editTask: async (task) => {
    try {
      //set({ loading: true, error: null });
     const {data} =  await axios().put(`/tasks/${task.id}`, task);
      set((state) => ({ loading:false, tasks: state.tasks.map((t) => (t.id === task.id ? data.data.task : t)) }));
    } catch (error) {
      set({ loading:false, error: "Error al editar tarea" });
    }
  },

  deleteTask: async (taskId) => {
    try {
      set({ loading: true, error: null });
      await axios().delete(`/tasks/${taskId}`);
      set((state) => ({ loading:false, tasks: state.tasks.filter((task) => task.id !== taskId) }));
    } catch (error) {
      set({ error: "Error al eliminar tarea" });
    }
  },

  completeMyTask: async (taskId) => {
    try {
      set({ loading: true, error: null });
      await axios().patch(`/tasks/${taskId}/complete`, { is_finished: true });
      set({loading:false, refresh: true });
    } catch (error) {
      set({ error: "Error al completar tarea" });
    }
  }
}));