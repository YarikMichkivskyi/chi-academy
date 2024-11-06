import React, {useState} from 'react';
import {Box, Typography, Card, CardContent, CardMedia, Button} from '@mui/material';
import {MyExhibit} from "../common/types/exhibit/myExhibit.type";
import {deleteExhibit} from "../api/actions/exhibit.api";
import CreateCommentModal from "./CreateCommentModal";
import CommentList from "./CommentList";

type PostProps = {
    exhibit: MyExhibit;
    isOwner: boolean;
    refreshListFunction: () => {}
};

const Post: React.FC<PostProps> = ({exhibit, isOwner, refreshListFunction}) => {
    const [showComments, setShowComments] = useState(false);


    const handleDelete = async () => {
        try {
            await deleteExhibit(exhibit.id.toString());
            refreshListFunction();
        } catch (error) {
            console.error("Error deleting exhibit:", error);
        }
    };

    return (
        <Card variant="outlined" sx={{mb: 2, pb: 2, pt:4, px:6, width: 1000, maxWidth: 800}}>
            <Typography variant="body1"  sx={{mb:3}}>
                {exhibit.user.username} - {new Date(exhibit.createdAt).toLocaleString()}
            </Typography>
            <CardMedia
                component="img"
                height="500"
                image={'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com' + exhibit.imageUrl}
                alt={exhibit.description}
                sx={{objectFit: "contain"}}
            />
            <CardContent>
                <Typography variant="body1" gutterBottom>{exhibit.description}</Typography>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="primary" onClick={() => setShowComments(!showComments)}>
                        Comments
                    </Button>
                    {isOwner && <Button variant="outlined" color="secondary" onClick={handleDelete}>Delete</Button>}
                </Box>
            </CardContent>
            {showComments && (
                <Box mt={2}>
                    <CommentList exhibitId={exhibit.id}/>
                </Box>
            )}
        </Card>
    );
};

export default Post;