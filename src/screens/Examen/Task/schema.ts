import * as Yup from "yup"

export const status = [
    {
        id: "pendiente",
        value: "pendiente",
        label: "Pendiente",
        styles: {
            color: "white",
            backgroundColor: "#FF4D4D",
        },
    },
    {
        id: "en progreso",
        value: "en progreso",
        label: "En progreso",
        styles: {
            color: "white",
            backgroundColor: "#FFBF00",
        },
    },
    {
        id: "completada",
        value: "completada",
        label: "Completada",
        styles: {
            color: "white",
            backgroundColor: "#07CC25",
        },
    },
];


export const priority = [     
    {
        id: "baja",  
        value: "baja",
        label: "Baja",
        styles: {
            color: "white",
            backgroundColor: "#07CC25",
        },
    },
    {
        id: "media",     
        value: "media",
        label: "Media",
        styles: {
            color: "white",
            backgroundColor: "#FFBF00",
        },
    },
    {
        id: "alta",  
        value: "alta",
        label: "Alta",
        styles: {
            color: "white",
            backgroundColor: "#FF4D4D",
        },
    },
   
];

export const schema = Yup.object({
    id: Yup.string().optional(),
    title: Yup.string().required("El titulo de la tarea es requerido"),
    description: Yup.string().required("La descripción de la tarea es requerida"),
    status: Yup.string().oneOf(['pendiente', 'en progreso', 'completada'], 'Selecciona una opción válida').required("El status es requerido"),
    priority: Yup.string().oneOf(['alta','media','baja'], 'Selecciona una opción válida').required("La prioridad es requerida"),
    users: Yup.array()
})