
import { Chip, Stack } from '@mui/material';

export default function TagsList({ tags }) {
    if (tags.length === 0) return null;

    return (
        <Stack direction="row" spacing={1}>
            {tags.map(tag => (
                <Chip key={tag.id} label={tag.tag} />
            ))}
        </Stack>
    );
}