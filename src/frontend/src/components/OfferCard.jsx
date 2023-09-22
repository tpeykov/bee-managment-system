import Avatar from "@mui/material/Avatar";
import {Button, Typography} from "@mui/material";
import '../css/offer-card.css';
import {useContext} from "react";
import AuthContext from "../shared/contexts/auth.context";
import {OFFER_STATUS, USER_ROLES} from "../domain/enums/user-roles.enum";
import {changeOffer, declineOffer} from "../shared/services/offer.service";

export default function OfferCard({offer}) {
    const {userAuth} = useContext(AuthContext);

    const handleApproveOffer = () => {
        changeOffer(offer.uuid, OFFER_STATUS.APPROVED)
            .then(() => {

            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDeclineOffer = () => {
        changeOffer(offer.uuid, OFFER_STATUS.DECLINED)
            .then(() => {

            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <div className='offer-wrapper'>
            <div className="author-container">
                <Avatar
                    alt="author-icon"
                    src="/path-to-author-image.jpg"
                />
                <div>
                    <Typography variant="h5"> {offer.author.username} </Typography>
                    <Typography variant="body2">{offer.author.uic}</Typography>
                </div>
            </div>

            <div className="offer-description-container">
                <p> {offer.description} </p>
            </div>

            <div className="offer-price-container">
                <span> {offer.price} лв. </span>
            </div>

            {/*{userAuth.user.role === USER_ROLES.MERCHANT &&*/}
                <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem', marginLeft: 'auto'}}>
                    <Button variant="contained"
                            color="success"
                            onClick={() => handleApproveOffer()}> Approve </Button>
                    <Button variant="outlined"
                            color="error"
                            onClick={() => handleDeclineOffer()}> Decline </Button>
                </div>
            {/*}*/}
        </div>
    )
}