import {
    Box,
    Button,
    Container, FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useState} from "react";
import {createPoster} from "../../shared/services/poster.service";

function MerchantCreatPosterView() {

    const [ data, updateData ] = useState({
        title: '',
        description: '',
        date: null,
        price: ''
    })

    const createPosterHandler = async (event) => {
        event.stopPropagation();

        await createPoster(data)
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.error(error.response)
            });
    }


    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Typography variant="h4" align="center" sx={{ margin: '1.5rem'}}  >
                Create your own poster
            </Typography>
            <Container maxWidth="xs">
                <form>
                    <Stack
                        direction="column"
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <TextField
                            value={data.title}
                            onChange={(event) => updateData({...data, title: event.target.value })}
                            label="Title" variant="outlined" required />
                        <TextField
                            value={data.description}
                            onChange={(event) => updateData({...data, description: event.target.value })}
                            label="Description" variant="outlined" multiline required />
                        <TextField
                            value={data.price}
                            onChange={(event) => updateData({...data, price: event.target.value })}
                            label="Amount"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
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

                        <Button onClick={(event) => createPosterHandler(event)} variant="contained">Create</Button>
                    </Stack>
                </form>
            </Container>

        </Box>
    );
}

export default MerchantCreatPosterView;
