
import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import ContactsList from '../components/ContactsList/ContactsList';
import CreateContact from '../components/CreateContact/CreateContact';

export default function HomePage() {
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(prev => !prev);
    };

    return (
        <Box 
            sx={{ 
                flexGrow: 1, 
                padding: 2, 
                maxWidth: 1280, 
                minWidth: 400, 
                margin: '0 auto' 
            }}
        >
            <Grid container spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems="stretch">
                <Grid item xs={12} md={4}>
                    <CreateContact onContactCreated={handleRefresh} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ContactsList refresh={refresh} />
                </Grid>
            </Grid>
        </Box>
    );
}