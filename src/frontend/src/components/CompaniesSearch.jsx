import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const CompaniesSearch = () => (
    <Card sx={{ p: 2 }}>
        <OutlinedInput
            defaultValue=""
            fullWidth
            placeholder="Search company"
            startAdornment={(
                <InputAdornment position="start">
                    <SvgIcon
                        color="action"
                        fontSize="small"
                    >
                    </SvgIcon>
                </InputAdornment>
            )}
            sx={{ maxWidth: 500 }}
        />
    </Card>
);