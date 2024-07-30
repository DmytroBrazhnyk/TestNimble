import { Card, Avatar, Typography, Chip, Stack,IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; 
import TagsList from './TagList';

export default function ContactCard({ avatar, tags, firstName, lastName, email, onDelete }) {
    return (
        <Card sx={{ padding: 2, display: 'flex', alignItems: 'center', position: 'relative' }}>
            <Avatar src={avatar} alt={`${firstName} ${lastName}`} sx={{ width: 56, height: 56, marginRight: 2 }} />
            <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">{`${firstName} ${lastName}`}</Typography>
                <Typography variant="body2" color="textSecondary">{email}</Typography>
                <TagsList tags={tags} />
            </Stack>
            <IconButton 
                sx={{ position: 'absolute', right: 16, top: 16 }} 
                onClick={() => onDelete()} 
                color="error"
            >
                <DeleteIcon />
            </IconButton>
        </Card>
    );
}