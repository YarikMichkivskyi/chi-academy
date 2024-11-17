import {axiosInstance} from "../axiosInstance";

const getComments = async (exhibitId: string) => {
    return await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
};

const addComment = async (exhibitId: string, commentData: { text: string }) => {
    return await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, commentData)
};

const deleteComment = async (exhibitId: string, commentId: string) => {
    return await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
};

export {getComments, addComment, deleteComment};