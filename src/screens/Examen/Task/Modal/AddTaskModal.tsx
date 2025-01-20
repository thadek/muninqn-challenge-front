import TaskForm from "../../Task/TaskForm";
import { Modal } from "../../../../components";
import MuniSpinner from "../../../../components/MuniSpinner";
import { useTaskStore } from "../../Hooks/useTaskStore";
import { Task } from "../Types/Task";


export default function AddTaskModal({ showTaskModal, setShowTaskModal }) {

    const { addTask, loading } = useTaskStore();

    const onSubmit = (task: Task) => {
        addTask(task);
        setShowTaskModal(false);
    }



    return (<>
        <Modal
            size="xl"
            show={showTaskModal}
            title={() => "Crear una nueva tarea"}
            onHide={() => setShowTaskModal(false)}
        >
            {loading ? <MuniSpinner textoSpinner="Agregando tarea.." /> :
                <TaskForm onSubmit={onSubmit} />}
        </Modal>
    </>
    )
}