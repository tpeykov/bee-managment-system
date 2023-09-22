import Avatar from "@mui/material/Avatar";
import {Button, Typography} from "@mui/material";
import '../css/offer-card.css';
import {useContext} from "react";
import AuthContext from "../shared/contexts/auth.context";
import {OFFER_STATUS, USER_ROLES} from "../domain/enums/user-roles.enum";
import {changeOffer } from "../shared/services/offer.service";
import NotificationContext from "../shared/contexts/notification.context";

export default function OfferCard({offer, data, setData, showAction = true }) {
    const {userAuth} = useContext(AuthContext);
    const {setNotification} = useContext(NotificationContext);

    const handleApproveOffer = () => {
        changeOffer(offer.uuid, OFFER_STATUS.APPROVED)
            .then((response) => {
                const offers = data.offers.filter(record => record.uuid !== offer.uuid);
                setData({ ...data, offers: [...offers, response.data]});
                setNotification({message: 'Offer Approved', active: true, severity: 'success'});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDeclineOffer = () => {
        changeOffer(offer.uuid, OFFER_STATUS.DECLINED)
            .then((response) => {
                const offers = data.offers.filter(record => record.uuid !== offer.uuid);
                setData({ ...data, offers: [...offers, response.data]});
                setNotification({message: 'Offer Declined', active: true, severity: 'success'});
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className={`offer-wrapper ${offer.status.toLowerCase()}`}>
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
                <p style={{margin: 0}}> {offer.description} </p>
            </div>

            <div className="offer-price-container">
                <span> {offer.price} лв. </span>
            </div>

            {(userAuth.user.role === USER_ROLES.MERCHANT && offer.status === OFFER_STATUS.INITIAL) &&
                <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem', marginLeft: 'auto'}}>
                    <Button variant="contained"
                            color="success"
                            onClick={() => handleApproveOffer()}> Approve </Button>
                    <Button variant="outlined"
                            color="error"
                            onClick={() => handleDeclineOffer()}> Decline </Button>
                </div>
            }

            <div className={`offer-status ${offer.status.toLowerCase()}`}>
                { offer.status.toLowerCase() }
            </div>

        </div>
    )
}