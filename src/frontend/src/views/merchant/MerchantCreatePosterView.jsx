import {
    Box,
    Button,
    Container, FormControl, Grid, Input,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useContext, useState} from "react";
import {createPoster} from "../../shared/services/poster.service";
import NotificationContext from "../../shared/contexts/notification.context";

function MerchantCreatPosterView() {
    const [formIsValid, setFormIsValid] = useState(false);
    const {setNotification} = useContext(NotificationContext);
    const [data, updateData] = useState({
        title: '',
        description: '',
        date: null,
        price: '',
        images: []
    })

    const createPosterHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        try {
            console.log(formData)
            const response = await createPoster(formData);

            setNotification({
                active: true,
                message: 'Successfully created new poster!',
                severity: 'success',
            });

            updateData({
                title: '',
                description: '',
                date: null,
                price: '',
                images: []
            });
            event.target.reset();
        } catch (error) {
            console.error(error.response);
        }
    };

    const handleImageChange = (event) => {
        const selectedImages = event.target.files;
        updateData({...data, images: selectedImages});
        setFormIsValid(selectedImages.length > 0);
    };


    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Typography variant="h4" align="center" sx={{margin: '1.5rem'}}>
                Create your own poster
            </Typography>
            <Container maxWidth="xs">
                <form onSubmit={createPosterHandler}>
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <TextField
                            name='title'
                            value={data.title}
                            onChange={(event) => updateData({...data, title: event.target.value})}
                            label="Title" variant="outlined" required/>
                        <TextField
                            name='description'
                            value={data.description}
                            onChange={(event) => updateData({...data, description: event.target.value})}
                            label="Description" variant="outlined" multiline required/>
                        <TextField
                            value={data.price}
                            onChange={(event) => updateData({...data, price: event.target.value})}
                            label="Amount"
                            type="number"
                            name='amount'
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl fullWidth sx={{mb: 2}}>
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                name='price'
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">lv.</InputAdornment>}
                                label="Price"
                            />
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={data.date}
                            />
                        </LocalizationProvider>

                        <Grid container spacing={2}>
                            {data.images.length > 0 &&
                                Array.from(data.images).map((file, index) => (
                                    <Grid item key={index}>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={`Selected Image ${index + 1}`}
                                            style={{
                                                maxWidth: '100px',
                                                maxHeight: '100px',
                                            }}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                        <input
                            name="images[]"
                            type="file"
                            accept="image/*"
                            multiple
                            required={true}
                            onChange={handleImageChange}
                        />
                        <Button type='submit'
                                disabled={!formIsValid}
                                variant='contained'> Create</Button>
                    </Stack>
                </form>
            </Container>
        </Box>
    );
}

export default MerchantCreatPosterView;
