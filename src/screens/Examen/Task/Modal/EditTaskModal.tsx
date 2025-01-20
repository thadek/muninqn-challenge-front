import { Button } from "react-bootstrap";
import { Modal} from '../../../../components';
import TaskForm from "../TaskForm"
import { Task } from "../Types/Task";
import { useTaskStore } from "../../Hooks/useTaskStore";

interface EditTaskModalProps {
  setModalState: React.Dispatch<
    React.SetStateAction<{
      showEditModal: boolean;
      showDeleteModal: boolean;
      selectedTask: Task | null;
    }>
  >;
  modalState: {
    showEditModal: boolean;
    showDeleteModal: boolean;
    selectedTask: Task | null;
  };
  task: Task;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ setModalState, modalState, task }) => {
  const { editTask } = useTaskStore(); 

  const handleClose = () => {
    setModalState((prev) => ({ ...prev, showEditModal: false, selectedTask: null }));
  };

  const handleSave = async (updatedTaskData: Task) => {
    editTask(updatedTaskData); 
    handleClose(); 
  };

  return (

    <Modal
            size="xl"
            show={modalState.showEditModal}
            title={() => "Editar Tarea"}
            onHide={() => handleClose()}
        >
   
        <TaskForm task={task} onSubmit={handleSave} />
     
      
    </Modal>
  );
};

export default EditTaskModal;