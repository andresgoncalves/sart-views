import { Helmet } from "react-helmet-async";
import ProfileTour from "../components/ProfileTour";

export default function TourProfile(){
    return(
        <>
            <Helmet title="ProfileTour" />
            <ProfileTour></ProfileTour>
        </>
    );
}