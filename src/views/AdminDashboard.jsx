import AdminDashboardHeader from "../components/AdminDashboardHeader";
import styles from "./AdminDashboard.module.scss";
import logo from "../assets/LogoSartViews.svg";
import { Helmet } from "react-helmet-async";
import Divider from "../components/Divider";
import Button from "../components/Button";
import ToursGrid from "../components/ToursGrid";
import ArtworksGrid from "../components/ArtworksGrid";
import { useTours } from "../hooks/tours";
import { useArtworks } from "../hooks/artworks";
import { useUsers } from "../hooks/users";
import Loader from "../components/Loader";


export default function AdminDashboard() {
    const tours = useTours();
    const artworks = useArtworks();
    const users= useUsers();
    return (
        <>
        <AdminDashboardHeader></AdminDashboardHeader>
        <Helmet title="Perfil Admin"></Helmet>
        <section className={styles.data}>
            <div className={styles.logoContainer}>{<img src={logo} className={styles.logoSart}/>}</div>
            <div className={styles.dataPage}>
                <div className={styles.contentBox}>
                    <div className={styles.label}>Visitantes Totales</div>
                    {users.data ? (
                        <div className={styles.info}>{users.data.length}</div>
                    ) : (
                        <Loader />
                    )}
                </div>
                <div className={styles.contentTour}>
                    <div className={styles.label}>Tours Realizados</div>
                </div>
                <div className={styles.contentBox}>
                    <div className={styles.label}>Fondos Recaudados</div>
                </div>
            </div>
        </section>
        <section>
            <Divider>
                <div className={styles.titleLabel}>Próximos Eventos</div>
            </Divider>
            <div className={styles.nextTours}>
                <Button>Crear Evento</Button>
            </div>
        </section>
        <section>
            <div className={styles.dataAdmin}>
                <div className={styles.column1}>
                    <div className={styles.container}>
                        <div className={styles.titleLabel}>Tours Populares</div>
                        <Button>Agregar Tour</Button>
                    </div>
                    <div className={styles.tourContainer}>
                        <ToursGrid tours={tours.data} fallback="No hay tours visitados" />
                    </div>
                    
                </div>
                <div className={styles.column2}>
                    <div className={styles.container}>
                        <div className={styles.titleLabel}>Obras Destacadas</div>
                        <Button>Agregar Obra</Button>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
    }
