import { Helmet } from "react-helmet-async";
import ArtworkCard from "../components/ArtworkCard";
import SearchField from "../components/SearchField";
import Tag from "../components/Tag";
import TourCard from "../components/TourCard";
import styles from "./SearchPage.module.scss";

export default function SearchPage(){
    const artworks = [
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
        {
          title: "La Mona Lisa",
          author: "Leonardo Da Vinci",
          location: "Biblioteca Pedro Grases",
          id: "#",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG/492px-Mona_Lisa_%28copy%2C_Vernon_collection%29.JPG",
        },
    ];
    
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

    const tags=[
        {
            name: "Obras"
        },
        {
            name: "Tours"
        },
        {
            name: "Puntos de Interés"
        },
        {
            name: "Pinturas"
        },
        {
            name: "Esculturas"
        },
        {
            name: "Murales"
        },
    ];

    const mixedResults = [...tours, ...artworks]
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

    const mixedTours = mixedResults.filter((result) => result.image.includes("gandhi"));
    const mixedArtworks = mixedResults.filter((result) => !result.image.includes("gandhi"));

    const results = [];
    const maxLength = Math.max(mixedTours.length, mixedArtworks.length);
    for (let i = 0; i < maxLength; i++) {
      if (mixedTours[i]) {
        results.push(mixedTours[i]);
      }
      if (mixedArtworks[i]) {
        results.push(mixedArtworks[i]);
      }
    }
  
    return (
        <>
        <Helmet title="Buscador"></Helmet>
        <div className={styles.container}>
            <div className={styles.searchField}>
                <SearchField />
            </div>
            <div className={styles.tagsContainer}>
                <div className={styles.labelCategory}>Categorías:</div>
                <div className={styles.tagsIndividual}>
                    {tags.map((tag, index) => (
                    <Tag key={index} name={tag.name} />
                    ))}
                </div>
            </div>
            <div className={styles.content}>
            {results.map((result) => {
                if (result.image.includes("gandhi")) {
                return (
                    <TourCard
                    key={result.id}
                    id={result.id}
                    location={result.location}
                    title={result.title}
                    description={result.description}
                    image={result.image}
                    size="large"
                    />
                );
                } else {
                return (
                    <ArtworkCard
                    key={result.id}
                    id={result.id}
                    title={result.title}
                    author={result.author}
                    location={result.location}
                    image={result.image}
                    size="large"
                    />
                );
                }
            })}
            </div>
        </div>
        </>
    );
}