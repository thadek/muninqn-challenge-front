import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Button, Badge } from 'react-bootstrap';
import { Edit, Trash, User } from 'lucide-react';
import React from 'react';
import { Task } from '../Types/Task';
import { handleDelete, handleEdit, handleViewUsers } from './handlers';




const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


const statusColors = {
  pendiente: "warning",
  en_progreso: "info",
  completado: "success",
  cancelado: "danger",
};



const priorityColors = {
  baja: "secondary",
  media: "primary",
  alta: "danger",
  crítica: "dark",
};

export const TableDataColumnDef = (openEditModal: any, openDeleteModal: any, openUsersModal:any): GridColDef[] => {
  return [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Titulo', width: 180 },
    { field: 'description', headerName: 'Descripcion', width: 330 },

    {
      field: 'status',
      headerName: 'Estado',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Badge style={{ padding: 8 }} bg={statusColors[params.value] || "secondary"}>
          {capitalizeFirstLetter(params.value)}
        </Badge>
      ),
    },

    {
      field: 'priority',
      headerName: 'Prioridad',
      width: 140,
      renderCell: (params: GridRenderCellParams) => (
        <Badge style={{ padding: 8 }} bg={priorityColors[params.value] || "secondary"}>
          {capitalizeFirstLetter(params.value)}
        </Badge>
      ),
    },

    {
      field: 'users',
      headerName: 'Usuarios',
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <div className="d-inline-flex p-2">
          <Button variant="primary" onClick={() => openUsersModal(params.row)}>
            <User />
          </Button>
        </div>
      ),
    },

    {
      field: 'created_at',
      headerName: 'Creado',
      width: 200,
      renderCell: (params: GridRenderCellParams) => new Date(params.value as string).toLocaleString(),
    },

    {
      field: 'updated_at',
      headerName: 'Última actualización',
      width: 200,
      renderCell: (params: GridRenderCellParams) => new Date(params.value as string).toLocaleString(),
    },

    {
      field: "actions",
      headerName: "Acciones",
      width: 280,
      renderCell: (params) => (
        <div className="d-flex p-3 gap-2">
          <Button variant="primary" onClick={() => openEditModal(params.row)}>
            <Edit />
          </Button>
          <Button variant="danger" onClick={() => openDeleteModal(params.row)}>
            <Trash />
          </Button>
        </div>
      ),
    }
  ];
};
