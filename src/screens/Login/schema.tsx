import { object, string } from "yup"

export const schema = object({
    identifier: string().required("DNI o correo electrónico es requerido"),
    password: string().required("Contraseña es requerida"),
})
