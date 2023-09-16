import {
    Box, Button,
    CircularProgress, FormControl,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import '../css/single-hotel-page.css'
import {generateRandomString} from "../shared/utils/utils";
import Avatar from "@mui/material/Avatar";


function SinglePosterView() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [poster, setPoster] = useState({ name: "Търся 100кг. акциев мед", description: 'Обявата за търсене на 100 килограма акциев мед представлява запитване от страна на потенциален купувач, който е в търсене на големи количества акциев мед. Този вид мед обикновено се предлага на специални цени или с отстъпки, което го прави изключително привлекателен за търговци и фермери. Купувачът може да бъде фирма, които използва мед в производството си, или физическо лице, което се интересува от закупуване на по-големи количества мед за домашна употреба или за продажба.\n' +
            '\n' +
            'Този вид обява обикновено съдържа следните ключови точки:\n' +
            '\n' +
            '    Количество: 100 килограма мед.\n' +
            '    Тип на меда: Акциев мед, който може да има специфични характеристики или произход.\n' });

    const handlePhotoClick = (photo) => {
        setSelectedPhoto(photo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPhoto(null);
        setIsModalOpen(false);
    };

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
                        <div className='single-hotel-view-header'>
                            <div>
                                <h2 className='hotel-view-name'> { poster.name } </h2>
                            </div>
                        </div>
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
                                                <SwiperSlide style={{height: '100%', cursor: 'pointer'}} key={generateRandomString(10)}
                                                             onClick={() => handlePhotoClick(photo)}>
                                                    <img src='https://picsum.photos/200/300'
                                                         style={{width: '100%', height: '100%', objectFit: 'cover'}} alt='poster photo'/>
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
                                                    <div className="single-hotel-secondary-picture" key={generateRandomString(10)}>
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
                                            <Typography variant="h6">Траян Пейков</Typography>
                                            <Typography variant="body2"> Фирма с 15 годишен опит </Typography>
                                        </div>
                                    </Box>
                                    <Box style={{display: 'flex', alignItems: 'center', gap: '.8rem'}}>
                                        <h5> 40 <span>лв/кг.</span> </h5>
                                    </Box>
                                    <Box>
                                        <div className="single-hotel-description-container">
                                            <p className="single-hotel-description">
                                                {poster.description}
                                            </p>
                                        </div>
                                    </Box>
                                </div>
                            </div>


                            <div className={'mt-5'} style={{display: 'flex', justifyContent: 'center'}}>
                                <form className={'mb-5'} style={{display: 'flex', flexDirection: 'column', width: 'min(100%, 22rem)'}}>
                                    <h3 style={{textAlign: 'center', marginBottom: '3rem'}}> Create offer for the poster </h3>

                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">lv.</InputAdornment>}
                                            label="Price"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">kg.</InputAdornment>}
                                            label="Amount"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <TextField label="Description" variant="outlined" multiline required />
                                    </FormControl>


                                    <Button color='success' variant="contained"> Submit </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SinglePosterView;
