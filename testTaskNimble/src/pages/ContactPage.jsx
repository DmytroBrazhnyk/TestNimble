import { useParams } from 'react-router-dom';
import { useGetContactByIdQuery, useAddTagsToContactMutation } from '../features/api/apiSlice';
import { CircularProgress, Typography, Card, Avatar, Stack, Container, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import AddTags from '../components/AddTags/AddTags';
import TagsList from '../components/ContactCard/TagList';

const formatContact = (contactData) => {
    const contact = contactData.resources[0];
    return {
        avatar: contact.avatar_url,
        tags: contact.tags,
        firstName: contact.fields["first name"][0].value,
        lastName: contact.fields['last name'][0].value,
        email: contact.fields['email'] ? (contact.fields['email'][0]?.value || '') : ''
    };
};

export default function ContactPage() {
    const { id } = useParams();
    const { data, error, isLoading, refetch } = useGetContactByIdQuery(id);
    const [addTagsToContact] = useAddTagsToContactMutation();
    const [contact, setContact] = useState(null);

    const handleTagsSubmit = (newTags) => {
        addTagsToContact({ id, tags: newTags })
            .unwrap()
            .then(() => {
                refetch(); // Refetch the contact data after adding tags
            })
            .catch((error) => {
                console.error('Failed to add tags:', error);
            });
    };

    useEffect(() => {
        if (data) {
            setContact(formatContact(data));
        }
    }, [data]);

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Error: {error.message}</Typography>;
    if (!contact) return <Typography>No data found</Typography>;

    return (
        <Container sx={{ mt: 2, maxWidth: 1280, minWidth: 400 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ padding: 2, display: 'flex', alignItems: 'center' }}>
                        <Avatar src={contact.avatar} alt={`${contact.firstName} ${contact.lastName}`} sx={{ width: 56, height: 56, marginRight: 2 }} />
                        <Stack spacing={1}>
                            <Typography variant="h6" component="div">{`${contact.firstName} ${contact.lastName}`}</Typography>
                            <Typography variant="body2" color="textSecondary">{contact.email}</Typography>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ padding: 2 }}>
                        <TagsList tags={contact.tags} />
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ padding: 2 }}>
                        <AddTags onTagsSubmit={handleTagsSubmit} tagsData={contact.tags} />
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}
