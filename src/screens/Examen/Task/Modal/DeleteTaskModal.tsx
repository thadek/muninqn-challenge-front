import { Modal, Button } from "react-bootstrap";
import { Task } from "../Types/Task";
import { useState } from "react";
import { useTaskStore } from "../../Hooks/useTaskStore";

interface DeleteTaskModalProps {
  task: Task;
  setModalState: React.Dispatch<React.SetStateAction<any>>;
  modalState: { showDeleteModal: boolean; selectedTask: Task | null };
}

export default function DeleteTaskModal({
  task,
  setModalState,
  modalState,
}: DeleteTaskModalProps) {
  const handleClose = () => {
    setModalState({ ...modalState, showDeleteModal: false });
  };


  const { deleteTask } = useTaskStore();

  const handleDelete = () => {
    deleteTask(task.id);
    handleClose();
  };

  return (
    <Modal
      show={modalState.showDeleteModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Estás seguro de que deseas eliminar la tarea{" "}
          <strong>{task.title}</strong>? Esta acción no se puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}