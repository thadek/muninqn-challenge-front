import { Box, Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from 'react-bootstrap';
import { Task, User } from '../Task/Types/Task';


export default function TaskCard({ task, handleCompleteMyTask, usr, statusColor, priorityColor }:{task:Task, handleCompleteMyTask:any, usr:User, statusColor:any, priorityColor:any}) {
    return (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card sx={{ borderLeft: task.status === 'completada' ? '5px solid green' : '5px solid orange' }}>
                <CardContent>
                    <Typography variant="h6" fontWeight="bold">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{task.description}</Typography>
                    <Box mt={2}>
                        <Chip label={task.status.toUpperCase()} color={statusColor(task.status)} />
                        <Chip label={"Prioridad " + task.priority} color={priorityColor(task.priority)} sx={{ ml: 1 }} />
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

                    {task.users.every((user:User) => user.pivot.is_finished === 1) && task.status!== 'completada' && (
                        <Typography variant="body2" color="textSecondary" >
                            En espera de ser revisada y completada por un administrador
                        </Typography>
                    )}

                    <Typography variant="caption" color="textSecondary">
                        Última actualización: {task.updated_at ?
                            new Date(task.updated_at).toLocaleString() : 'N/A'}
                    </Typography>
                </CardContent>

                {task.status !== 'completada' && (
                    <CardActions sx={{ padding: 3 }}>
                        <Button
                            size="lg"
                            onClick={() => handleCompleteMyTask(task.id)}
                            disabled={task.users.some((user) => user.id === usr?.id && user.pivot.is_finished === 1)}
                        >
                            Completar mi parte
                        </Button>
                    </CardActions>)}
            </Card>
        </Grid>
    )
}