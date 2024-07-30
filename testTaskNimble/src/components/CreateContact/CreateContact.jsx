import { useCreateContactMutation } from "../../features/api/apiSlice"
import { useState } from 'react';
import { TextField, Button, Card, Container, Stack, Typography } from '@mui/material';

export default function CreateContact(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [createContact] = useCreateContactMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName && !lastName) {
            alert('Either first name or last name must be provided');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const contact = {
            record_type: 'person',
            privacy: {
                edit: null,
                read: null,
            },
            owner_id: null,
            fields: {
                'first name': [{ value: firstName, modifier: '', label: 'first name' }],
                'last name': [{ value: lastName, modifier: '', label: 'last name' }],
                email: [{ value: email, modifier: '', label: 'email' }]
            }
        };

        await createContact(contact);
        setFirstName('');
        setLastName('');
        setEmail('');
    };
    return (
        <Container sx={{ position: 'sticky', top: 0 }}>
            <Card sx={{ padding: 2 }}>
                <Typography variant="h6" gutterBottom>Create New Contact</Typography>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Create Contact
                        </Button>
                    </Stack>
                </form>
            </Card>
        </Container>
    );
}