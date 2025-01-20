import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Task} from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';

import TaskTable from "../Task/Table/TasksTable";
import AddTaskModal from "../Task/Modal/AddTaskModal";
import { useTaskStore } from '../Hooks/useTaskStore'


export default function AdminContainer() {

    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const {  fetchTasks, refresh } = useTaskStore();
    

    useEffect(() => {
        fetchTasks([],0);
    }, [refresh]);


    return (
        <div className="d-flex flex-column p-3 gap-3  ">

            <h2><Task /> Menu de Administrador</h2>
            <div className="d-flex gap-2">
                <Button variant="primary" onClick={
                    () => setShowNewTaskModal(true)
                }> <AddIcon/> Nueva tarea</Button>
                
               
            </div>

            <TaskTable />

            <AddTaskModal  showTaskModal={showNewTaskModal} setShowTaskModal={setShowNewTaskModal} />
            
        </div>
    )

}