import { CSSProperties } from "react"
import { BaseTable } from "../../interface"


export interface PrioridadTicketTable extends BaseTable {
    name: "prioridad_ticket"
    value: "0" | "1" | "2" | "3" | "4"
    styles: CSSProperties
}

export const prioridades: PrioridadTicketTable[] = [
    {
        id: 92,
        name: "prioridad_ticket",
        value: "0",
        label: "Ninguna",
        styles: {
            color: "white",
            backgroundColor: "#9BA2AE",
        },
    },
    {
        id: 93,
        name: "prioridad_ticket",
        value: "1",
        label: "Baja",
        styles: {
            color: "white",
            backgroundColor: "#07CC25",
        },
    },
    {
        id: 94,
        name: "prioridad_ticket",
        value: "2",
        label: "Media",
        styles: {
            color: "white",
            backgroundColor: "#FFBF00",
        },
    },
    {
        id: 95,
        name: "prioridad_ticket",
        value: "3",
        label: "Alta",
        styles: {
            color: "white",
            backgroundColor: "#FF4D4D",
        },
    },
    {
        id: 96,
        name: "prioridad_ticket",
        value: "4",
        label: "Muy Alta",
        styles: {
            color: "white",
            backgroundColor: "#730B8D",
        },
    },
]
