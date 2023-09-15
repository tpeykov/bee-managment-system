import {useEffect, useState} from "react";
import {retrieveAllPosters} from "../shared/services/poster.service";
import { MerchantSearchComponent } from '../components/merchant/MerchantSearchComponent';

function ManufactureSearchView() {
    const [posters, updatePosters] = useState([]);

    useEffect(() => {
        (async () => {
            const results = await retrieveAllPosters();
            updatePosters(results.data);
        })();
    }, []);

    return (
        <>
            <MerchantSearchComponent posters={posters}></MerchantSearchComponent>
        </>
    );
}

export default ManufactureSearchView;

