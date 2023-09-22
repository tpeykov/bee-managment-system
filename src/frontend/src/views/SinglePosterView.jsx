import {
    Box, Button,
    CircularProgress, FormControl,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    TextField,
    Typography, Unstable_Grid2 as Grid
} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import '../css/single-hotel-page.css'
import {generateRandomString} from "../shared/utils/utils";
import Avatar from "@mui/material/Avatar";
import {getPoster} from "../shared/services/poster.service";
import {useParams} from "react-router-dom";
import {createOffer} from "../shared/services/offer.service";
import AuthContext from "../shared/contexts/auth.context";
import {USER_ROLES} from "../domain/enums/user-roles.enum";
import {PosterCard} from "../components/PosterCard";
import OfferCard from "../components/OfferCard";
import NotificationContext from "../shared/contexts/notification.context";


function SinglePosterView() {
    const {uuid} = useParams();

    const {userAuth} = useContext(AuthContext);
    const {setNotification} = useContext(NotificationContext);

    const [isLoading, setIsLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        console.log(userAuth.user.uuid)
        getPoster(uuid).then(response => {
            console.log(response.data)
            setData(response.data);

            setIsLoading(false);
        }).catch((error) => {
            console.log(error)
            setIsLoading(false);
        })

    }, [])


    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
        setIsModalOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const offerData = {
            posterUuid: data.uuid,
            price: formData.get('price'),
            description: formData.get('description'),
            amount: formData.get('amount')
        }

        createOffer(offerData)
            .then((response) => {
                setNotification({ message: 'Offer created', active: true, severity: 'success' });
                setData({ ...data, offers: [ ...data.offers, response.data ]});
            }).catch((error) => {
            console.log(error)
        })

        event.target.refresh();
    }

    return (
        <>
            {isLoading &&
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </div>
            }
            {!isLoading &&
                <div className='single-hotel-view-content-wrapper'>
                    <div className="single-hotel-view-content-container">
                        <div className='single-hotel-view-content'>
                            <div className="single-hotel-pictures-container">
                                <div className='single-hotel-left-container'>
                                    <div className="single-hotel-main-picture-swiper">
                                        <Swiper
                                            modules={[Autoplay, Pagination]}
                                            style={{height: '100%'}}
                                            effect="cards"
                                            speed={2500}
                                            pagination={true}
                                            loop={true}
                                            // autoplay={{delay: 1000, disableOnInteraction: true}}
                                            onSlideChange={() => console.log('slide change')}
                                            onSwiper={(swiper) => console.log(swiper)}
                                            breakpoints={{
                                                768: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 50,
                                                },
                                            }}
                                        >
                                            {[1, 2, 3, 4, 5].map((photo, index) => (
                                                <SwiperSlide style={{height: '100%', cursor: 'pointer'}}
                                                             key={generateRandomString(10)}
                                                             onClick={() => handlePhotoClick(photo)}>
                                                    <img src='https://picsum.photos/200/300'
                                                         style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                         alt='poster photo'/>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <Modal
                                            open={isModalOpen}
                                            onClose={handleCloseModal}
                                            aria-labelledby="photo-modal-title"
                                            aria-describedby="photo-modal-description"
                                        >
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%'
                                            }}>
                                                {selectedPhoto && (
                                                    <img
                                                        src='https://picsum.photos/200/300'
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            objectFit: 'contain',
                                                            maxHeight: '80vh',
                                                        }}
                                                        alt={`Hotel Photo ${selectedPhoto.index}`}
                                                    />
                                                )}
                                                <IconButton
                                                    style={{
                                                        position: 'absolute',
                                                        top: 10,
                                                        right: 10,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                    }}
                                                    onClick={handleCloseModal}
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                            </div>
                                        </Modal>
                                    </div>
                                    <div className="single-hotel-secondary-pictures-container">
                                        {
                                            [1, 2, 3, 4].filter((_, index) => (index >= 1 && index < 5))
                                                .map((photo, index) => (
                                                    <div className="single-hotel-secondary-picture"
                                                         key={generateRandomString(10)}>
                                                        <img style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                             src='https://picsum.photos/200/300'/>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                                <div className='single-hotel-right-container'>
                                    <Box style={{display: 'flex', alignItems: 'center', gap: '.8rem'}}>
                                        <Avatar
                                            alt="Author"
                                            src="/path-to-author-image.jpg"
                                        />
                                        <div>
                                            <Typography variant="h6">{data.author.username}</Typography>
                                            <Typography variant="body2"> Фирма с 15 годишен опит </Typography>
                                        </div>
                                    </Box>
                                    <Box style={{display: 'flex', alignItems: 'center', gap: '.8rem'}}>
                                        <h5> Price: {data.price} <span>лв/кг.</span></h5>
                                    </Box>
                                    <Box>
                                        <div className="single-hotel-description-container">
                                            <p className="single-hotel-description">
                                                {data.description}
                                            </p>
                                        </div>
                                        { userAuth.user.role === USER_ROLES.MANUFACTURER &&
                                            <div className={'mt-5'} style={{display: 'flex', justifyContent: 'center'}}>
                                                <form onSubmit={(event) => handleSubmit(event)}
                                                      className={'mb-5'}
                                                      style={{display: 'flex', flexDirection: 'column', width: 'min(100%, 22rem)'}}>
                                                    <h3 style={{textAlign: 'center', marginBottom: '3rem'}}> Create offer for the
                                                        poster </h3>

                                                    <FormControl fullWidth sx={{mb: 2}}>
                                                        <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            name='price'
                                                            startAdornment={<InputAdornment position="start">lv.</InputAdornment>}
                                                            label="Price"
                                                        />
                                                    </FormControl>

                                                    <FormControl fullWidth sx={{mb: 2}}>
                                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            startAdornment={<InputAdornment position="start">kg.</InputAdornment>}
                                                            label="Amount"
                                                            name='amount'
                                                        />
                                                    </FormControl>

                                                    <FormControl fullWidth sx={{mb: 2}}>
                                                        <TextField label="Description"
                                                                   name='description'
                                                                   id='description'
                                                                   variant="outlined" multiline required/>
                                                    </FormControl>
                                                    <Button type={"submit"} color='success' variant="contained"> Submit </Button>
                                                </form>
                                            </div>
                                        }
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className={'offers-section'}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {data.offers
                                .filter(offer => offer.author.uuid === userAuth.user.uuid)
                                .map((offer) => (
                                    <Grid
                                        xs={12}
                                        key={offer.uuid}
                                    >
                                        <OfferCard offer={offer}></OfferCard>
                                    </Grid>
                                ))}
                        </Grid>
                    </section>
                </div>
            }
        </>
    )
}

export default SinglePosterView;
