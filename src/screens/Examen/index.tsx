import { useNavigate } from "react-router-dom";
import { NavigateBeforeOutlined, Task } from "@mui/icons-material"
import ContainerSecundario from "../../components/Containers/ContainerSecundario"
import { useContext } from "react";
import { UserContext } from "../../context/UserWrapper";
import AdminContainer from "./Admin/AdminContainer";
import UserContainer from "./User/UserContainer";
import { Card, Stack,Switch, FormControlLabel, } from "@mui/material";
import { useState } from "react";
import LoginRequired from "./Task/LoginRequired";




const Examen = () => {
    const nav = useNavigate();
    const [viewAsAdmin, setViewAsAdmin] = useState(true);

    const { actions,loading } = useContext(UserContext);

    const usr = actions.user();

    return (
        <ContainerSecundario
            titulo="Examen Sec. de Modernización - ReactJS - Pamich Gabriel - App Gestión de tareas"
            className="custom-section"
            containerClass="container_custom p-4 rounded-lg "
            headerClass="bg-light  d-flex flex-column gap-3 p-4 rounded-lg shadow"
            tituloClass="col-12 text-center text-primary "
            actions={
                <div className="d-flex">
                    <button
                        onClick={() => nav("/")}
                        className="btn btn-secondary btn-sm d-flex align-items-center"
                    >
                        <NavigateBeforeOutlined /> Volver al Home
                    </button>
                </div>
            }
        >


           


          <div>
          { !usr && (loading?<></>:<LoginRequired />)}


            {usr && (
                <Card className="p-3">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Task sx={{ fontSize: "5vh", color: "#1134c9" }} />
                        <Stack>
                            <h3 className="m-0">Sistema gestión de tareas</h3>
                            <p className="m-0">Estás visualizando la aplicación como: {usr?.name} {usr?.last_name}</p>
                        </Stack>
                    </Stack>
                </Card>
            )}

  
            {usr?.roles.includes("admin"  as any) && (
                <div className="m-3">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={viewAsAdmin}
                                onChange={() => setViewAsAdmin(!viewAsAdmin)}
                            />
                        }
                        label={viewAsAdmin ? "Modo Administrador" : "Modo Usuario"}
                    />
                </div>
            )}

           
            {usr?.roles.includes("admin" as any) && viewAsAdmin && <AdminContainer />}
            {usr?.roles.includes("admin" as any) && !viewAsAdmin && <UserContainer isAdmin/>}
            {usr?.roles.includes("user" as any) && !usr.roles.includes("admin"  as any) && <UserContainer isAdmin={false} />}
        </div>
            

        </ContainerSecundario>
    )
}

export default Examen;