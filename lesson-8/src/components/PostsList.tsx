import {Box} from "@mui/material";
import Post from "./Post";
import Pagination from "./Paginator";
import React, {useEffect, useState} from "react";
import {MyExhibit} from "../common/types/exhibit/myExhibit.type";
import {MyExhibitResponse} from "../common/types/exhibit/myExhibitResponse.type";
import userApi from "../api/actions/user.api";
import {useAppSelector} from "../hooks/hooks";
import {AxiosResponse} from "axios";
import {AllExhibitResponse} from "../common/types/exhibit/allExhibitResponse.type";
import { AllExhibit, RootState } from "../common/types/types";
import {connectToSocket} from "../api/socket/socket";
import {toast} from "react-toastify";
import {Socket} from "socket.io-client";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

interface PostsListProps {
    fetchFunction: (page: number, limit: number) => Promise<AxiosResponse<MyExhibitResponse|AllExhibitResponse>>;
}

export const PostsList: React.FC<PostsListProps> = ({ fetchFunction }) => {
    //solo useState
    const [posts, setPosts] = useState<MyExhibit[]|AllExhibit[]>([]);
    //search
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const id:number|null = useSelector((state:RootState) => state.userData.id);

    const location = useLocation();

    //useRequest
    const fetchPosts = async () => {
        try {
            const data: MyExhibitResponse = (await fetchFunction(page, 10)).data;
            setPosts(data.data);
            setTotalPages(data.lastPage);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    //hook
    const handleSocketConnection = (socket:Socket) => {
        socket.on('newPost', () => {
            if (page === 1) {
                fetchPosts();
            }
            toast("New post!");
        });
    };

    //userequest naverh
    useEffect(() => {
        fetchPosts();
    }, [page]);

    useEffect(() => {
        if (location.pathname==='/'){
            const socket = connectToSocket();
            handleSocketConnection(socket)

            return () => {
                socket.off('newPost');
            };
        }
    }, []);

    return (
        <>
            <Box>
                {posts.map((post) => (
                    <Post exhibit={post} refreshListFunction={fetchPosts} key={post.id} isOwner={post.user.id === id} />
                ))}
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
            </Box>
        </>
    );
};