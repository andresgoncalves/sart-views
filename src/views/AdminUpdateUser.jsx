import { useParams } from "react-router-dom";
import UserProfileEditor from "../components/UserProfileEditor";
import styles from "./AdminUpdateUser.module.scss";
import { useUser } from "../hooks/users";

export default function AdminUpdateUser(){
    const {id} =useParams();
    const user=useUser(id);
    return(
        <>
        <div className={styles.title}>Datos del Usuario</div>
        <div className={styles.containerInfo}>
            <UserProfileEditor userParam={user}></UserProfileEditor>
        </div>
        </>
    );
}