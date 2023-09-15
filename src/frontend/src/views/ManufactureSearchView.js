import {
    Box,
    Button,
    Container,
    Pagination,
    Stack,
    SvgIcon,
    Typography,
    Unstable_Grid2 as Grid
} from '@mui/material';
import {CompaniesSearch} from "../components/CompaniesSearch";
import {PosterCard} from "../components/PosterCard";
import {useEffect, useState} from "react";
import {retrieveAllPosters} from "../shared/services/poster.service";

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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Companies
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                </Stack>
                            </Stack>
                            <div>
                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                        </SvgIcon>
                                    )}
                                    variant="contained"
                                    href={'/create-poster'}
                                >
                                    Add
                                </Button>
                            </div>
                        </Stack>
                        <CompaniesSearch />
                        <Grid
                            container
                            spacing={3}
                        >
                            {posters.map((poster) => (
                                <Grid
                                    xs={12}
                                    md={6}
                                    lg={4}
                                    key={poster.uuid}
                                >
                                    <PosterCard poster={poster} />
                                </Grid>
                            ))}
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Pagination
                                count={3}
                                size="small"
                            />
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}

export default ManufactureSearchView;

