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
import {PosterCard} from "../PosterCard";
import {Link} from "react-router-dom";
import {USER_ROLES} from "../../domain/enums/user-roles.enum";
import {useContext} from "react";
import AuthContext from "../../shared/contexts/auth.context";

function MerchantSearchComponent({ posters }) {
    const {userAuth, updateUserAuth} = useContext(AuthContext);

    return (<Box
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
                                All public posters
                            </Typography>
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                            >
                            </Stack>
                        </Stack>
                        <div>
                            {userAuth.user.role === USER_ROLES.MERCHANT &&
                                <Link to='/create-poster'>
                                    <Button
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                            </SvgIcon>
                                        )}
                                        variant="contained"
                                    >
                                        Add
                                    </Button>
                                </Link>
                            }
                        </div>
                    </Stack>
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
    </Box>)

}

export default MerchantSearchComponent;
