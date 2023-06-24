import { Helmet } from "react-helmet-async";
import TourCard from "../components/TourCard";
import styles from "./ToursPage.module.scss";
import bannerImage from "../assets/home-banner.png";
import Divider from "../components/Divider";

export default function ToursPage(){
    const tours = [
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
        {
          title: "Tour Gandhi",
          description: "Tour que inicia en la estatua de Gandhi",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://www.unimet.edu.ve/wp-content/uploads/2020/10/gandhi-1-1030x773.jpg",
        },
    ];
    return(
        <>
        <Helmet title="Obras"></Helmet>
        <header
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerImage})` }}>
            <div className={styles.contentTitle}>
                <h1>Conoce los tours de las obras de arte de la Universidad Metropolitana</h1>
                <div className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</div>
            </div> 
        </header>
        <section>
            <Divider>
                <h2>Próximos Tours</h2>
            </Divider>
            <div className={styles.tours}>
                {tours.map((data, index) => (
                    <TourCard key={index} size="medium" {...data} />
                ))}
            </div>
        </section>
        <section>
            <Divider>
                <h2>Tour Populares</h2>
            </Divider>
            <div className={styles.tours}>
                {tours.map((data, index) => (
                    <TourCard key={index} size="medium" {...data} />
                ))}
            </div>
        </section>
        <section>
            <Divider>
                <h2>Tour Nuevos</h2>
            </Divider>
            <div className={styles.tours}>
                {tours.map((data, index) => (
                    <TourCard key={index} size="medium" {...data} />
                ))}
            </div>
        </section>
        </>
    );
}