import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import ArtworkCard from "../components/ArtworkCard";
import SearchField from "../components/SearchField";
import Tag from "../components/Tag";
import TourCard from "../components/TourCard";
import { useArtworks } from "../hooks/artworks";
import { useTours } from "../hooks/tours";
import styles from "./SearchPage.module.scss";

export default function SearchPage() {
  const artworks = useArtworks();
  const tours = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const tags = [
    {
      name: "Obras",
    },
    {
      name: "Tours",
    },
    {
      name: "Puntos de Interés",
    },
    {
      name: "Pinturas",
    },
    {
      name: "Esculturas",
    },
    {
      name: "Murales",
    },
  ];

  const results = useMemo(
    () => {
      if (!tours.data || !artworks.data) return [];
  
      const filteredTours = tours.data.filter((data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredArtworks = artworks.data.filter((data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      return [
        ...filteredTours.map((data) => ({
          /** @type {"tour"} */
          type: "tour",
          data,
        })),
        ...filteredArtworks.map((data) => ({
          /** @type {"artwork"} */
          type: "artwork",
          data,
        })),
      ]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);
    },
    [artworks.data, tours.data, searchQuery]
  );
  

  return (
    <>
      <Helmet title="Buscador"></Helmet>
      <div className={styles.container}>
        <div className={styles.searchField}>
          <SearchField action={setSearchQuery} />
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
          {results.map(({ type, data }, key) =>
            type === "tour" ? (
              <TourCard key={key} data={data} size="large" />
            ) : (
              <ArtworkCard key={key} data={data} size="large" />
            )
          )}
        </div>
      </div>
    </>
  );
}
