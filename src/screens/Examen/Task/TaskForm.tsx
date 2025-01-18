import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Save } from "lucide-react";
import { formatOptions } from "../../../utils/common";
import { Input, MuniSpinner, Select } from "../../../components";
import { schema, priority, status as _status } from "./schema";
import AsyncUserSelect from "./AsyncUserSelect";
import { Task } from "./Types/Task";

export interface HFState {
    prioridad: any | null;
}

type RFC = React.FC<{
    disabled?: boolean;
    onSubmit: (data: any) => Promise<boolean> | boolean | void;
    task?: Task;
}>;

const TaskForm: RFC = ({ disabled, onSubmit, task = {} }) => {
    const { register, handleSubmit, formState, setValue, watch } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            
            title: task?.title || "",
            description: task?.description || "",
             
            users: task?.users || [],
        },
    });

    const [loading, setLoading] = useState(false);

    const [selectedUsers, setSelectedUsers] = useState<{ value: number; label: string }[]>([]);

    const _onSubmit = async (form: any) => {
        setLoading(true);
        await onSubmit({ ...form, id: task?.id }); 
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit(_onSubmit)} className="d-flex flex-column gap-1 p-2">
           { task?.id && <input type="hidden" {...register("id")} /> }

            <Input
                className={{ label: "form-label m-0", input: "form-control form-control" }}
                invalidMsg={formState.errors.title?.message}
                label="Titulo"
                register={{ ...register("title", { disabled: loading }) }}
            />
            



            
            <Input
                className={{ label: "form-label m-0", input: "form-control form-control" }}
                invalidMsg={formState.errors.description?.message}
                label="Descripción"
                register={{ ...register("description", { disabled: loading }) }}
            />

            <Select
                className={{ select: "form-select form-select" }}
                options={formatOptions(_status)}
                label="Estado"
                invalidMsg={formState.errors.status?.message}
                register={{ ...register("status"), disabled: loading }}
            />

            <Select
                className={{ select: "form-select form-select" }}
                options={formatOptions(priority)}
                label="Prioridad"
                invalidMsg={formState.errors.priority?.message}
                register={{ ...register("priority"), disabled: loading }}
            />

            <AsyncUserSelect
                selectedUsers={selectedUsers}
                onChange={(selected) => {
                    setSelectedUsers(selected);
                    setValue("users", selected.map((s) => s.value));
                }}
            />
            <p className="text-danger">{formState.errors.users?.message}</p>

            <hr className="my-1" />

            {loading && <MuniSpinner file="bola.png" />}
            <button className="btn btn-primary btn-sm ms-auto text-center" disabled={disabled || loading} hidden={loading}>
                <Save className="me-1" width={15} />
                Guardar
            </button>
        </form>
    );
};

export default TaskForm;
