import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import {getComments} from '../api/actions/comment.api';
import Comment from './Comment';
import {CommentT} from '../common/types/types';
import userApi from "../api/actions/user.api";
import {useAppSelector} from "../hooks/use-app-selector/use-app-selector.hook";
import CreateCommentModal from "./CreateCommentModal";

const CommentList: React.FC<{ exhibitId: number }> = ({exhibitId}) => {
    const [comments, setComments] = useState<CommentT[]>([]);
    const token = useAppSelector(state => state.userData.token);
    const [id, setId] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => {
        setIsModalOpen(false);
        fetchComments();
    }
    const openModal = () => {
        setIsModalOpen(true);
    }

    const fetchComments = async () => {
        const response = await getComments(exhibitId.toString());
        setComments(response.data);
    };

    useEffect(() => {
        fetchComments();
    }, [exhibitId]);

    useEffect(() => {
        if (token) {
            userApi.getUserByToken().then((res) => {
                setId(res.data.id);
            }).then(() => {
                fetchComments()
            });
        } else {
            setId(-1);
        }
    }, [token]);

    return (
        <>
            <Box>
                {comments.map((comment) => (
                    <Comment key={comment.user.id} comment={comment} refreshListFunction={fetchComments} exhibitId={id}
                             isOwner={comment.user.id === id}/>
                ))}
            </Box>
            <Button variant="contained" color="primary" onClick={openModal}>
                Add Comment
            </Button>
            {
                isModalOpen &&
                <CreateCommentModal exhibitId={exhibitId} closeModal={closeModal}/>
            }
        </>

    );
};

export default CommentList;