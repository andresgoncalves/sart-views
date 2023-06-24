import styles from "./CalendarPage.module.scss";
import CalendarImage from "../assets/CalendarImage.jpeg";
import Calendario from "../components/Calendar";
import TourCard from "../components/TourCard";


export default function CalendarPage(){
    const tours = [
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
    ];
    return(
        <>
        <header 
            className={styles.banner}
            style={{ backgroundImage: `url(${CalendarImage})`}}>
                <div className={styles.textContainer}>
                    <div className={styles.title}>Mantente al tanto de los próximos eventos</div>
                    <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
                </div>
        </header>
        <section className={styles.content}>
            <div className={styles.column1}>
                <div className={styles.label}>Seleccionar fecha:</div>
                <Calendario></Calendario>
            </div>
            <div className={styles.column2}>
                <div className={styles.label}>Tours recomendados</div>
                <div className={styles.tours}>
                    {tours.map((data, index) => (
                        <TourCard key={index} size="medium" {...data} />
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}