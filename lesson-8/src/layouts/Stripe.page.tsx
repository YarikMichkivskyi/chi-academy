import React from 'react';
import {getAllExhibits} from "../api/actions/exhibit.api";
import {Typography} from '@mui/material';
import {PostsList} from "../components/PostsList";
import PageFrame from "../components/PageFrame";

const StripePage = () => {
    return (
        <PageFrame>
            <Typography variant="h4" gutterBottom>All Posts</Typography>
            <PostsList fetchFunction={getAllExhibits}/>
        </PageFrame>
    );
};

export default StripePage;