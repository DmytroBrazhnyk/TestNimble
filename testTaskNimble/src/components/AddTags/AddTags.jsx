import { useState } from 'react';
import { TextField, Button, Chip, Stack, Box } from '@mui/material';

export default function AddTags({ onTagsSubmit }) {
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    const handleInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleAddTags = () => {
        if (tagInput.trim() !== '') {
            const newTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '' && !tags.includes(tag));
            if (newTags.length > 0) {
                setTags([...tags, ...newTags]);
                setTagInput('');
            }
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    const handleSubmit = () => {
        if (tags.length > 0) {
            onTagsSubmit(tags);
            setTags([]);
        }
    };

    return (
        <Box>
            <TextField
                variant="outlined"
                fullWidth
                label="Введіть теги через кому"
                value={tagInput}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTags();
                    }
                }}
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddTags} 
                sx={{ mt: 2 }}
                disabled={tagInput.trim() === ''}
            >
                Додати Теги
            </Button>
            <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                {tags.map((tag, index) => (
                    <Chip
                        key={index}
                        label={tag}
                        onDelete={() => handleDeleteTag(tag)}
                    />
                ))}
            </Stack>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleSubmit} 
                sx={{ mt: 2 }}
                disabled={tags.length === 0}
            >
                Зберегти Теги
            </Button>
        </Box>
    );
}