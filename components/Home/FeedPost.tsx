
import { Avatar, Box, Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsBookmark, BsChat, BsThreeDots } from "react-icons/bs";
import { useQuery } from 'react-query';
import useSWR from 'swr';
import { IconButton } from '@chakra-ui/react'
import { FiSend } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { } from "react-icons/bs";
const fetchuser = async () => {
    const data = await fetch('https://randomuser.me/api/')
    const json_data = await data.json()
    console.log(json_data, 'from feed post')
    return json_data
}
type storyusertype = {
    id: number
}
import { AiOutlineHeart } from "react-icons/ai";
;

function FeedPost(props: storyusertype) {

    let name = 'random_data' + props.id
    const { data } = useSWR(name, fetchuser, {
        revalidateOnFocus: true, dedupingInterval: 600000, revalidateOnMount: true
    })

    return <div>
        <Stack borderWidth='1px'>
            <HStack p={3} justify={'space-between'}>
                <HStack>
                    <Avatar name='Dan Abrahmov' src={data && data.results[0]['picture'].thumbnail} />
                    <Text fontWeight={'semibold'} >{data && data.results[0]['name'].first}</Text></HStack>
                <BsThreeDots />
            </HStack>
            {data && <Image height={500} width={700} src={data && data.results[0]['picture'].large} />}
            <Stack px={'2'} py='2' >
                <HStack justify={'space-between'}>
                    <HStack>
                        <Box as={'button'}> <AiOutlineHeart size={'23'} /></Box>
                        <Box transform={''} as={'button'} >
                            {/* <BsChat />  */} <RiChat1Line size={'23'} />
                        </Box>
                        <Box transform={''} as={'button'} >
                            <FiSend size={'20'} />
                        </Box>
                    </HStack>
                    <Box transform={''} as={'button'} >
                        <BsBookmark size={'18'} />
                    </Box>
                </HStack>
                <HStack fontSize={'sm'}>
                    {data && <Text noOfLines={1} fontWeight={'semibold'}>{`${data.results[0]['name'].first} ${data.results[0]['name'].last}`}</Text>}
                    <Text noOfLines={1}>Hits too close to home 😭 Thanks  for solving this problem</Text>
                </HStack>
                <Box borderTop={'1px'} borderTopColor={'gray.100'}>
                    <InputGroup size='md'>
                        <InputLeftElement
                        ><FaRegSmile /></InputLeftElement>
                        <Input
                            variant={'ghost'}
                            pr='4.5rem'
                            type={'text'}
                            placeholder='Add a comment...'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' variant={'ghost'} >
                                Post
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Box>
            </Stack>
        </Stack>

    </div >;
}

export default FeedPost;
