import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import ArtworkCard from "../components/ArtworkCard";
import SearchField from "../components/SearchField";
import Tag from "../components/Tag";
import TourCard from "../components/TourCard";
import { useArtworks } from "../hooks/artworks";
import { useTours } from "../hooks/tours";
import styles from "./SearchPage.module.scss";

// Función para eliminar acentos de una cadena de texto
const removeAccents = (text) => {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function SearchPage() {
  const artworks = useArtworks();
  const tours = useTours();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    {
      name: "Obras",
    },
    {
      name: "Tours",
    },
    {
      name: "Fotografías",
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

  const results = useMemo(() => {
    if (!tours.data || !artworks.data) return [];

    let filteredResults = [];

    if (selectedTags.includes("Obras")) {
      const filteredArtworks = artworks.data.filter((data) =>
        removeAccents(data.name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
      );
      filteredResults = [
        ...filteredResults,
        ...filteredArtworks.map((data) => ({
          type: "artwork",
          data,
        })),
      ];
    }

    if (selectedTags.includes("Tours")) {
      const filteredTours = tours.data.filter((data) =>
        removeAccents(data.name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
      );
      filteredResults = [
        ...filteredResults,
        ...filteredTours.map((data) => ({
          type: "tour",
          data,
        })),
      ];
    }

    if (selectedTags.includes("Pinturas")) {
      const filteredArtworks = artworks.data.filter(
        (data) =>
          data.category === "Pintura" &&
          removeAccents(data.name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
      );
      filteredResults = [
        ...filteredResults,
        ...filteredArtworks.map((data) => ({
          type: "artwork",
          data,
        })),
      ];
    }

    if (selectedTags.includes("Esculturas")) {
      const filteredArtworks = artworks.data.filter(
        (data) =>
          data.category === "Escultura" &&
          removeAccents(data.name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
      );
      filteredResults = [
        ...filteredResults,
        ...filteredArtworks.map((data) => ({
          type: "artwork",
          data,
        })),
      ];
    }

    if (selectedTags.includes("Fotografías")) {
      const filteredArtworks = artworks.data.filter(
        (data) =>
          data.category === "Fotografía" &&
          removeAccents(data.name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
      );
      filteredResults = [
        ...filteredResults,
        ...filteredArtworks.map((data) => ({
          type: "artwork",
          data,
        })),
      ];
    }

    if (
      searchQuery !== "" &&
      selectedTags.length === 0 &&
      filteredResults.length === 0
    ) {
      const searchedArtworks = artworks.data.filter((data) =>
        removeAccents(data.name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
      );
      const searchedTours = tours.data.filter((data) =>
        removeAccents(data.name.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
      );
      filteredResults = [
        ...searchedArtworks.map((data) => ({
          type: "artwork",
          data,
        })),
        ...searchedTours.map((data) => ({
          type: "tour",
          data,
        })),
      ];
    }

    if (filteredResults.length === 0 && selectedTags.length === 0) {
      const allArtworks = artworks.data;
      const allTours = tours.data;
      filteredResults = [
        ...allArtworks.map((data) => ({
          type: "artwork",
          data,
        })),
        ...allTours.map((data) => ({
          type: "tour",
          data,
        })),
      ];
    }

    return filteredResults.sort(() => Math.random() - 0.5).slice(0, 8);
  }, [artworks.data, tours.data, searchQuery, selectedTags]);

  const toggleTagSelection = (tagName) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagName)) {
        return prevSelectedTags.filter((tag) => tag !== tagName);
      } else {
        return [...prevSelectedTags, tagName];
      }
    });
  };

  return (
    <>
      <Helmet title="Buscador" />
      <div className={styles.container}>
        <div className={styles.searchField}>
          <SearchField action={setSearchQuery} />
        </div>
        <div className={styles.tagsContainer}>
          <div className={styles.labelCategory}>Categorías:</div>
          <div className={styles.tagsIndividual}>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                name={tag.name}
                selected={selectedTags.includes(tag.name)}
                toggleSelection={toggleTagSelection}
              />
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









