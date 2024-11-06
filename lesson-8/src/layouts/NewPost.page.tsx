import React, { useState } from 'react';
import {TextField, Button, Box, Typography} from '@mui/material';
import { createExhibit } from '../api/actions/exhibit.api'
import {useNavigate} from "react-router-dom";
import PageFrame from "../components/PageFrame";

const NewPost = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!description || !image) {
            setError('Please provide both an image and a description.');
            return;
        }

        try {
            await createExhibit({ description, image });
            navigate('/home');
        } catch (err) {
            setError('Failed to create post. Please try again.');
        }
    };


    return (
        <PageFrame>
            <Typography variant="h4" gutterBottom>Create New Post</Typography>

            {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

            <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={description}
                onChange={handleDescriptionChange}
                sx={{ mb: 3 }}
            />

            <Button variant="contained" component="label" sx={{ mb: 3 }}>
                Upload Image
                <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </Button>

            <Box sx={{ mb: 2 }}>
                {image && <Typography variant="body2">Selected file: {image.name}</Typography>}
            </Box>

            <Button variant="contained" sx={{width:200}}  color="primary" fullWidth onClick={handleSubmit}>
                Submit Post
            </Button>
        </PageFrame>
    );
};

export default NewPost;