import styles from "./ProfileTour.module.scss";
import bannerImage from "../assets/home-banner.png";
import Divider from "./Divider";
import ArtworkCard from "./ArtworkCard";
import Button from "./Button";
import InterestPoint from "./InterestPoint";
import StarRating from "./StarRating";

export default function ProfileTour(){
    // const [tour, setTour]=useState(null);

    //useEffect??

    const data =[
        {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG", number: 1, name:"hola"},
        {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG", number: 2, name:"hola"},
        {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG", number: 3, name: "hola"},
        {image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG", number: 4, name: "hola"},
    ];

    const artworks = [
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          href: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
      ];
    return(
        <>
            <header 
            className={styles.banner}
            style={{backgroundImage: `url(${bannerImage})`}}>
                <div className={styles.titleContainer}>
                    <h1>TOUR NAME</h1>
                </div>
            </header>
            <section>
                <div className={styles.frame}>
                    <StarRating initialRating={3} readOnly={true}></StarRating>
                    <Button>Reservar</Button>
                </div>
                <div className={styles.text}>
                    <div className={styles.columna}>
                        <div className={styles.lugar}>Lugar: Biblioteca</div>
                        <div className={styles.fechas}>Próximas fechas:</div>
                    </div>
                    <div className={styles.columna1}>
                        Descripción: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua
                    </div>
                </div>
            </section>
            <section>
                <Divider>
                    <h2>PUNTOS DE INTERÉS</h2>
                </Divider>
                <div className={styles.pointsContainer}>
                    {data.map((item, index) => (
                        <InterestPoint
                        key={index}
                        image={item.image}
                        number={item.number}
                        name={item.name}
                        />
                    ))}
                </div>
            </section>
            <section>
                <Divider>
                    <h2>OBRAS INTEGRADAS EN EL TOUR</h2>
                </Divider>
                
                <div className={styles.artworks}>
                    {artworks.map((data, index) => (
                        <ArtworkCard key={index} size="medium" {...data} />
                    ))}
                </div>
            </section>
        
        </>
    );
}