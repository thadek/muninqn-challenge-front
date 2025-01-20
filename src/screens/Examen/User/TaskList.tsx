import { Card, CardContent, CardActions, Typography, Grid, Chip, Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import { CheckCircle, XCircle } from 'lucide-react';
import { Task } from '../Task/Types/Task';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserWrapper';
import { useTaskStore } from '../Hooks/useTaskStore';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  
  const { actions } = useContext(UserContext);
  const usr = actions.user();
  const { completeMyTask, loading } = useTaskStore();

  const handleCompleteMyTask = async (taskId: number) => {
    
    await completeMyTask(taskId);
  
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'pendiente':
        return 'warning';
      case 'en progreso':
        return 'info';
      case 'completada':
        return 'success';
      default:
        return 'default';
    }
  }

  const priorityColor = (priority: string) => {
    switch (priority) {
      case 'baja':
        return 'success';
      case 'media':
        return 'warning';
      case 'alta':
        return 'error';
      default:
        return 'default';
    }
  }


  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          handleCompleteMyTask={handleCompleteMyTask}
          usr={usr}
          statusColor={statusColor}
          priorityColor={priorityColor}
        />
      ))}
    </Grid>
  );
}