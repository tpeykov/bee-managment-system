import {useEffect, useState} from "react";
import {retrieveAllPosters} from "../shared/services/poster.service";
import MerchantSearchComponent from "../components/merchant/MerchantSearchComponent";
import {getUserDetails} from "../shared/services/auth.service";

function MerchantSearchView() {
    const [posters, updatePosters] = useState([]);

    useEffect(() => {
        const details = getUserDetails();
        console.log(details);

        (async () => {
            const results = await retrieveAllPosters();
            updatePosters(results.data);
        })();
    }, []);

    return (
        <>
            <MerchantSearchComponent posters={posters}/>
        </>
    );
}

export default MerchantSearchView;

