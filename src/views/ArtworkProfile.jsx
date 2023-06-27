import { Helmet } from "react-helmet-async";
import ProfileArtwork from "../components/ProfileArtwork";

export default function ArtworkProfile(){
    return(
        <>
        <Helmet title="Perfil Obra"></Helmet>
        <ProfileArtwork></ProfileArtwork>
        </>
    );
}