import { Box, Stack, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FeedPost from './FeedPost';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase'
import Post from '../Feed/Post';
function Feed() {
    const [post, setpost] = useState<any[]>()
    let map_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            (snapshot) => {
                setpost(snapshot.docs)

            }
        )
        return unsubscribe

    }, [db])
    // console.log(post, 'from feedpost')
    return <VStack marginTop={10} gap={5}>
        {/* {map_data.map((data) => {
            return <Box key={data}>
                <FeedPost id={data} />
            </Box>
        })} */}

        {post?.map((data) => {
            return <Box key={data.id}>
                <Post postdata={data} />

            </Box>
        })}



    </VStack>;
}

export default Feed;
