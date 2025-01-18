import { useNavigate } from "react-router-dom";
import { NavigateBeforeOutlined, Task } from "@mui/icons-material"
import ContainerSecundario from "../../components/Containers/ContainerSecundario"
import { useContext } from "react";
import { UserContext } from "../../context/UserWrapper";
import AdminContainer from "./Admin/AdminContainer";
import UserContainer from "./User/UserContainer";
import { Card, Stack } from "@mui/material";




const Examen = () => {
    const nav = useNavigate();

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


            {loading && !usr &&  <div className="alert alert-danger">Es necesario iniciar sesión para visualizar correctamente esta sección.</div>}


            {usr && <Card className="p-3">
                <Stack direction="row" spacing={2} alignItems="center">
                    <Task sx={{ fontSize: "5vh", color: "#1134c9" }} />
                    <Stack>
                        <h3 className="m-0">Sistema gestión de tareas</h3>
                        <p className="m-0">Estas visualizando la aplicación como : {usr?.name} {usr?.last_name}</p>
                    </Stack>
                </Stack>
            </Card>}

            {usr && usr.roles.includes("admin" as any) && <div> 
                <AdminContainer />
            </div>}

            {usr && usr.roles.includes("user" as any) && <div>     
                <UserContainer />
            </div>
            }

        </ContainerSecundario>
    )
}

export default Examen;