import { Button, Modal } from "react-bootstrap";
import { Task } from "../Types/Task";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress, Typography } from "@mui/material";
import { CheckCircle, XCircle } from "lucide-react";

export default function TaskUsersModal({
    setModalState,
    modalState,
    task,
}: {
    setModalState: React.Dispatch<React.SetStateAction<any>>;
    modalState: { showEditModal: boolean; showDeleteModal: boolean; showUsersModal: boolean; selectedTask: Task | null };
    task: Task;
}) {
    const handleClose = () => {
        setModalState({ ...modalState, showUsersModal: false });
    };

    // Calcular el porcentaje de usuarios que completaron la tarea
    const totalUsers = task.users.length;
    const completedUsers = task.users.filter((user) => user.pivot.is_finished === 1).length;
    const completionPercentage = totalUsers > 0 ? (completedUsers / totalUsers) * 100 : 0;

    return (
        <Modal show={modalState.showUsersModal} onHide={handleClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Usuarios asignados a la tarea {task.title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {totalUsers === 0 ? (
                    <Typography variant="body1" color="textSecondary">
                        No hay usuarios asignados a esta tarea
                    </Typography>
                ) : (
                    <>
                        {/* Barra de progreso */}
                        <Typography variant="subtitle1" gutterBottom>
                            Progreso de la tarea ({Math.round(completionPercentage)}%)
                        </Typography>
                        <LinearProgress variant="determinate" value={completionPercentage} />

                        {/* Tabla de usuarios */}
                        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Usuario</strong></TableCell>
                                        <TableCell><strong>Correo</strong></TableCell>
                                        <TableCell align="center"><strong>Estado</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {task.users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name} {user.last_name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell align="center">
                                                {user.pivot.is_finished === 1 ? (
                                                    <CheckCircle color="green" size={20} />
                                                ) : (
                                                    <XCircle color="red" size={20} />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Modal.Body>
            
        </Modal>
    );
}
