import PropTypes from 'prop-types';
import { Avatar, Box, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';

export const PosterCard = (props) => {
    const { poster } = props;

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <CardContent>
                <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                >
                    {poster.title}
                </Typography>
                <Typography
                    align="center"
                    variant="body1"
                >
                    {poster.description}
                </Typography>
            </CardContent>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={2}
                sx={{ p: 2 }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                >
                    <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                    </SvgIcon>
                    <Typography
                        color="text.secondary"
                        display="inline"
                        variant="body2"
                    >
                        Updated 2hr ago
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
};

PosterCard.propTypes = {
    poster: PropTypes.object.isRequired
};