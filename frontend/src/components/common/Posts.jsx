import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import PostSkeleton from "../skeletons/PostSkeleton";
import Post from "./Post";

const Posts = ({ feedType, username, userId }) => {
    const getPostEndpoint = () => {
        switch (feedType) {
            case "forYou":
                return "/api/posts/getPosts";
            case "following":
                return "/api/posts/following";
            case "posts":
                return `/api/posts/user/${username}`;
            case "likes":
                return `/api/posts/likes/${userId}`;
            default:
                return "/api/posts/getPosts";
        }
    };

    const POST_ENDPOINT = getPostEndpoint();

    const {
        data: postsData,
        isLoading,
        refetch,
        isRefetching,
    } = useQuery({
        queryKey: ["posts", feedType, username, userId],
        queryFn: async () => {
            try {
                const res = await fetch(POST_ENDPOINT);
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }

                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    useEffect(() => {
        refetch();
    }, [feedType, refetch, username]);

    const posts = postsData?.feedPosts || postsData;

    return (
        <>
            {(isLoading || isRefetching) && (
                <div className='flex flex-col justify-center'>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && !isRefetching && posts?.length === 0 && (
                <p className='text-center my-4'>No posts in this tab. Switch 👻</p>
            )}
            {!isLoading && !isRefetching && posts && Array.isArray(posts) && (
                <div>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            )}
        </>
    );
};
export default Posts;
