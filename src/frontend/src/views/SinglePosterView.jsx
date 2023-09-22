import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    TextField,
    Typography,
    Unstable_Grid2 as Grid
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
import OfferCard from "../components/OfferCard";
import NotificationContext from "../shared/contexts/notification.context";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SinglePosterView() {
    const {uuid} = useParams();

    const {userAuth} = useContext(AuthContext);
    const {setNotification} = useContext(NotificationContext);

    const [isLoading, setIsLoading] = useState(true);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        getPoster(uuid).then(response => {
            setData(response.data);

            setIsLoading(false);
        }).catch((error) => {
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
            amount: formData.get('amount'),
            document: formData.get('document')
        }

        createOffer(offerData)
            .then((response) => {
                setNotification({message: 'Offer created', active: true, severity: 'success'});
                setData({...data, offers: [...data.offers, response.data]});
            }).catch((error) => {
            console.log(error)
        })

        event.target.reset();
    }

    const filterOffersByPermission = (offer) => {
        if (userAuth.user.role === USER_ROLES.MERCHANT || userAuth.user.role === USER_ROLES.ADMIN) return true;
        return offer.author.uuid === userAuth.user.uuid;
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
                                        >
                                            {data.images.map((photo, index) => (
                                                <SwiperSlide style={{height: '100%', cursor: 'pointer'}}
                                                             key={index}
                                                             onClick={() => handlePhotoClick(photo)}>
                                                    <img src={photo.url}
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
                                                        src={selectedPhoto.url}
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
                                            data.images.slice(0, 4).map((photo, index) => (
                                                <div className="single-hotel-secondary-picture"
                                                     key={generateRandomString(10)}>
                                                    <img style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                         src={photo.url}/>
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
                                        {userAuth.user.role === USER_ROLES.MANUFACTURER &&
                                            <div className={'mt-5'} style={{display: 'flex', justifyContent: 'center'}}>
                                                <form onSubmit={(event) => handleSubmit(event)}
                                                      className={'mb-5'}
                                                      style={{
                                                          display: 'flex',
                                                          flexDirection: 'column',
                                                          width: 'min(100%, 22rem)'
                                                      }}>
                                                    <h3 style={{textAlign: 'center', marginBottom: '1rem'}}> Create
                                                        offer for the
                                                        poster </h3>

                                                    <FormControl fullWidth sx={{mb: 2}}>
                                                        <InputLabel
                                                            htmlFor="outlined-adornment-amount">Price</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            name='price'
                                                            startAdornment={<InputAdornment
                                                                position="start">lv.</InputAdornment>}
                                                            label="Price"
                                                        />
                                                    </FormControl>

                                                    <FormControl fullWidth sx={{mb: 2}}>
                                                        <InputLabel
                                                            htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            startAdornment={<InputAdornment
                                                                position="start">kg.</InputAdornment>}
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
                                                    <input
                                                        className='mb-2'
                                                        name="document"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        required={true}
                                                    />
                                                    <Button type={"submit"} color='success'
                                                            variant="contained"> Submit </Button>
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
                            <Typography variant="h5" align="center" sx={{ margin: '1.2rem'}}>
                                {userAuth.user.role === USER_ROLES.MANUFACTURER ? 'All offers created by you:' : 'All offers to the poster:'}
                            </Typography>
                            {data.offers
                                .filter(filterOffersByPermission)
                                .map((offer) => (
                                    <Grid
                                        xs={12}
                                        key={offer.uuid}
                                    >
                                        <OfferCard offer={offer} data={data} setData={setData}></OfferCard>
                                    </Grid>
                                ))}

                            { data.offers.length === 0 &&
                                (<Typography variant="p" align="center" sx={{ margin: '1.2rem'}}>
                                    {userAuth.user.role === USER_ROLES.MANUFACTURER ? "You haven't created a offer yet!" : 'No offers to the poster!'}
                                </Typography>)
                            }

                        </Grid>
                    </section>
                </div>
            }
        </>
    )
}

export default SinglePosterView;
