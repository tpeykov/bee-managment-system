import {Box, CircularProgress, Modal, Typography} from "@mui/material";
import {useState} from "react";
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import '../css/single-hotel-page.css'


function SinglePosterView() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [poster, setPoster] = useState({ name: 'offer', description: 'offer description' });

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
                                <h2 className='hotel-view-name'> {poster.name} </h2>
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
                                            autoplay={{delay: 1000, disableOnInteraction: true}}
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
                                                <SwiperSlide style={{height: '100%', cursor: 'pointer'}} id={photo + '' + index}
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
                                                    <div className="single-hotel-secondary-picture">
                                                        <img key={index}
                                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                             src='https://picsum.photos/200/300'/>
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                                <div className='single-hotel-right-container'>
                                </div>
                            </div>
                            <div className="single-hotel-description-container">
                                <p className="single-hotel-description">
                                    {poster.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SinglePosterView;
