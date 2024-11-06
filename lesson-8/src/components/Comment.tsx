import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentT } from '../common/types/types';
import { deleteComment } from '../api/actions/comment.api'; // Припускаючи, що є API для видалення коментаря

type CommentProps = {
    exhibitId: number;
    comment: CommentT;
    refreshListFunction: () => void;
    isOwner: boolean;
};

const Comment: React.FC<CommentProps> = ({exhibitId, comment, refreshListFunction, isOwner }) => {
    const handleDelete = async () => {
        try {
            await deleteComment(exhibitId.toString(), comment.id);
            refreshListFunction();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <Box sx={{ mb: 2, p: 2, border: '1px solid #e0e0e0', borderRadius: 1, position: 'relative' }}>
            <Typography variant="body2" color="text.secondary">
                {comment.user.username} - {new Date(comment.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body1">{comment.text}</Typography>
            {isOwner && (
                <IconButton
                    aria-label="delete"
                    onClick={handleDelete}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <DeleteIcon color="error" />
                </IconButton>
            )}
        </Box>
    );
};

export default Comment;
