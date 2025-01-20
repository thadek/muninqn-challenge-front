import { Grid } from '@mui/material';
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
  const { completeMyTask } = useTaskStore();

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
          usr={usr as any}
          statusColor={statusColor}
          priorityColor={priorityColor}
        />
      ))}
    </Grid>
  );
}