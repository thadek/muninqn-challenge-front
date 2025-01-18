import { Card, CardContent, CardActions, Typography, Grid, Chip, Box } from '@mui/material';
import { Button } from 'react-bootstrap';
import { CheckCircle, XCircle } from 'lucide-react';
import { Task } from '../Task/Types/Task';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserWrapper';
import { useTaskStore } from '../Hooks/useTaskStore';

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
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <Card sx={{ borderLeft: task.status === 'completada' ? '5px solid green' : '5px solid orange' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">{task.title}</Typography>
              <Typography variant="body2" color="textSecondary">{task.description}</Typography>
              <Box mt={2}>
                <Chip label={task.status.toUpperCase()} color={statusColor(task.status)} />
                <Chip label={"Prioridad "+task.priority} color={priorityColor(task.priority)} sx={{ ml: 1 }} />
              </Box>

              <Box mt={2}>
                {task.users.map((user) => (
                  <Chip
                    key={user.id}
                    icon={user.pivot.is_finished === 1 ? <CheckCircle size={16} color="green" /> : <XCircle size={16} color="red" />}
                    label={`${user.name} ${user.last_name}`}
                    variant="outlined"
                    sx={{ mb: 1, mr: 1 }}
                  />
                ))}
              </Box>

              {task.users.every((user) => user.pivot.is_finished === 1) && (
                <Typography variant="body2" color="textSecondary" >
                  En espera de ser revisada y completada por un administrador
                </Typography>
              )}
              
              <Typography variant="caption" color="textSecondary">
                Última actualización: {task.updated_at ?
                  new Date(task.updated_at).toLocaleString() : 'N/A'}
              </Typography>
            </CardContent>

            <CardActions sx={{  padding:3 }}>
              <Button
                size="lg"
                onClick={() => handleCompleteMyTask(task.id)}
                disabled={task.users.some((user) => user.id === usr?.id && user.pivot.is_finished === 1)}
              >
                Completar mi parte
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}