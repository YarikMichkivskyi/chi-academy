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
import { AllExhibit } from "../common/types/types";
import {connectToSocket} from "../api/socket/socket";
import {toast} from "react-toastify";
import {Socket} from "socket.io-client";

interface PostsListProps {
    fetchFunction: (page: number, limit: number) => Promise<AxiosResponse<MyExhibitResponse|AllExhibitResponse>>;
}

export const PostsList: React.FC<PostsListProps> = ({ fetchFunction }) => {
    const token = useAppSelector(state => state.userData.token);
    const [posts, setPosts] = useState<MyExhibit[]|AllExhibit[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [id, setId] = useState<number>(-1);

    const fetchPosts = async () => {
        try {
            const data: MyExhibitResponse = (await fetchFunction(page, 10)).data;
            setPosts(data.data);
            setTotalPages(data.lastPage);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const handleSocketConnection = (socket:Socket) => {
        socket.on('newPost', () => {
            if (page === 1) {
                fetchPosts();
            }
            toast("New post!");
        });
    };

    useEffect(() => {
        if (token) {
            userApi.getUserByToken().then((res) => {
                setId(res.data.id);
            });
        } else {
            setId(-1);
        }
    }, [token]);

    useEffect(() => {
        fetchPosts();
    }, [page]);

    useEffect(() => {
        if (window.location.href.endsWith('/')){
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