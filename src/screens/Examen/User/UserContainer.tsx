
import { useTaskStore } from "../Hooks/useTaskStore";
import { useContext } from "react";
import { UserContext } from "../../../context/UserWrapper";

import { Cached, Refresh, Task } from "@mui/icons-material"

import { useEffect } from "react";
import TaskList from "./TaskList";
import { Button } from "react-bootstrap";
import { MuniSpinner } from "../../../components";
import { Card, CardHeader, Stack, Typography } from "@mui/material";

export default function UserContainer() {

    const { tasks, fetchTasks, refresh, loading, error } = useTaskStore();


    useEffect(() => {
        fetchTasks([]);
    }, [refresh]);


    if(error){
        return <div className="alert alert-danger">Ocurrió un error al cargar las tareas. </div>
    }

    return (
        <div className="d-flex flex-column p-3 gap-3  ">



            <div className="d-flex gap-3">
                <Button onClick={() => fetchTasks(['pendiente', 'en progreso'])} variant="primary"> <Cached/> Ver tareas activas </Button>
                <Button onClick={() => fetchTasks(['completada'])} variant="primary"> <Task /> Ver tareas completadas</Button>  </div>


            <div className="d-flex gap-2 flex-row justify-content-center align-items-center">

                {loading && <div className="">
                    <MuniSpinner textoSpinner="Cargando tus tareas" /> </div>}
                {tasks && !loading && <TaskList tasks={tasks} />}

                {tasks && tasks.length === 0 && !loading && 
                    <Card className="col-12">
                        <Stack direction="column" alignItems="center" className="p-3">
                            <Task color="primary" style={{ fontSize: 40 }} />
                            <Typography variant="h6" color="textSecondary" className="text-center">No hay tareas para mostrar</Typography>
                        </Stack>
                    </Card>
                }
            </div>

        </div>



    )

}