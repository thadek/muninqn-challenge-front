import Table from "../../../../components/Table";
import { TableDataColumnDef } from "./TableDataColumnDef";
import { MuniSpinner } from "../../../../components";
import { Task } from "../Types/Task";
import { useTaskStore } from "../../Hooks/useTaskStore";
import { useState } from "react";
import DeleteTaskModal from "../Modal/DeleteTaskModal";
import EditTaskModal from "../Modal/EditTaskModal";
import TaskUsersModal from "../Modal/TaskUsersModal";
import { toast } from "react-toastify";

export default function TaskTable() {
    const { tasks, loading, error, dismissError } = useTaskStore();

    const [modalState, setModalState] = useState({
        showEditModal: false,
        showDeleteModal: false,
        showUsersModal: false,
        selectedTask: null as Task | null,
    });

    const openEditModal = (task: Task) => {
        setModalState({ showEditModal: true, showUsersModal: false, showDeleteModal: false, selectedTask: task });
    };

    const openDeleteModal = (task: Task) => {
        setModalState({ showEditModal: false, showUsersModal: false, showDeleteModal: true, selectedTask: task });
    };

    const openUsersModal = (task: Task) => {
        setModalState({ showEditModal: false, showUsersModal: true, showDeleteModal: false, selectedTask: task });
    };

    if (loading) {
        return (
            <>
                <MuniSpinner textoSpinner="Cargando tareas" />
            </>
        );
    }

    if(error){
        toast.error( error);
        dismissError();

        
    }

    return (
        <>
            <Table
                height={800}
                search
                getRowHeight={() => "auto"}
                data={{ rows: tasks, columns: TableDataColumnDef(openEditModal, openDeleteModal, openUsersModal) }}
            />

            {modalState.showEditModal && modalState.selectedTask && (
                <EditTaskModal
                    setModalState={setModalState as React.Dispatch<React.SetStateAction<any>>}
                    modalState={modalState}
                    task={modalState.selectedTask}
                />
            )}


            {modalState.showUsersModal && modalState.selectedTask && (
                <TaskUsersModal
                    setModalState={setModalState as React.Dispatch<React.SetStateAction<any>>}
                    modalState={modalState}
                    task={modalState.selectedTask}
                />
            )}


            {modalState.showDeleteModal && modalState.selectedTask && (
                <DeleteTaskModal
                    setModalState={setModalState}
                    modalState={modalState}
                    task={modalState.selectedTask}
                />
            )}
        </>
    );
}