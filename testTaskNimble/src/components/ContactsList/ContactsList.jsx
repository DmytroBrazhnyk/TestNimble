import { useState, useEffect } from 'react';
import { useGetContactsQuery } from "../../features/api/apiSlice";
import { useDeleteContactMutation } from '../../features/api/apiSlice';
import { CircularProgress, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import ContactCard from '../ContactCard/ContactCard';

export default function ContactsList(){
    const { data, error, isLoading } = useGetContactsQuery();
    const [deleteContact] = useDeleteContactMutation();
    const [contacts, setContacts] = useState([]);
    const handleDelete = (contactId) => {

        deleteContact(contactId)
            .unwrap()
            .then(() => {
                setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
            })
            .catch(error => {
                console.error('Failed to delete contact:', error);
            });
    };

    useEffect(() => {
        if (data) {
            const formattedContacts = data.resources
                .filter(contact => contact.record_type === 'person')
                .map(contact => {
                return {
                    id: contact.id,
                    avatar: contact.avatar_url,
                    tags: contact.tags,
                    firstName: contact.fields["first name"][0].value,
                    lastName: contact.fields['last name'][0].value,
                    email: contact.fields['email'] ? (contact.fields['email'][0]?.value || '') : ''
                };
                });
            setContacts(formattedContacts);
        }
    }, [data]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;

    return(
        <Container>
            <Typography variant="h4" gutterBottom>Contacts List</Typography>
            <Grid container spacing={2} direction="column">
                {contacts.map(contact => (
                <Grid item xs={12} sm={6} md={4} key={contact.id}>
                        <ContactCard
                        avatar={contact.avatar}
                        tags={contact.tags}
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        email={contact.email}
                        onDelete={() => handleDelete(contact.id)}
                        id={contact.id}
                        />
                </Grid>
                ))}
            </Grid>
        </Container>
    )

}