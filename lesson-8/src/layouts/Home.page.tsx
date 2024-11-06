import React from 'react';
import {getMyExhibits} from "../api/actions/exhibit.api";
import {Typography} from '@mui/material';
import {PostsList} from "../components/PostsList";
import PageFrame from "../components/PageFrame";

const StripePage = () => {
    return (
        <PageFrame>
            <Typography variant="h4" gutterBottom>My Posts</Typography>
            <PostsList fetchFunction={getMyExhibits}/>
        </PageFrame>
    );
};

export default StripePage;