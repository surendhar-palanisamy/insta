import { Avatar, Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Image, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text, VStack } from '@chakra-ui/react';
// import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsBookmark, BsChat, BsThreeDots } from "react-icons/bs";
import { useQuery } from 'react-query';
import useSWR from 'swr';
import { IconButton } from '@chakra-ui/react'
import { FiSend } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSession } from 'next-auth/react';
import { Field, FieldProps, Form, Formik } from 'formik';

;
import * as Yup from "yup";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Moment from 'react-moment';
function Post({ postdata }: any) {
    const { data: session } = useSession()
    const [comments, setcomments] = useState<any[]>([])
    const [likes, setlikes] = useState<any[]>([])
    const [hasliked, sethasliked] = useState<any>(false)

    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', postdata.id, 'comment'), orderBy('timestamp', 'desc')), snapshot => {
            setcomments(snapshot.docs)
        })
        // console.log(comments, 'comments')

    }, [db, postdata.id])
    useEffect(() => {
        onSnapshot(query(collection(db, 'posts', postdata.id, 'likes')), snapshot => {
            setlikes(snapshot.docs)

        })


    }, [db, postdata.id])
    console.log(likes, 'printing likes')
    const likepost = async () => {
        const email: any = session?.user?.email
        if (hasliked) {
            console.log('inside unlike  post')

            sethasliked(false)
            await deleteDoc(doc(db, 'posts', postdata.id, 'likes', email)).then(() => { })

        }
        else {
            console.log('inside like post', hasliked)

            await setDoc(doc(db, 'posts', postdata.id, 'likes', email), {
                username: session?.user?.name
            })
        }
    }
    useEffect(() => {
        // console.log('like effect')
        // sethasliked(
        //     likes?.findIndex(like => {
        //         console.log(like.id, 'liked id')
        //         like.id === session?.user?.email
        //     }) !== -1)

        likes?.map(like => {
            console.log(like.id, 'like id')
            if (like.id === session?.user?.email) {
                sethasliked(true)
            }
            else {
                sethasliked(false)
            }
        })
    }



        , [db, likes]
    )
    return (
        <div>
            {/* {postdata.data().username} */}
            {console.log(postdata.data().username)}
            <Stack borderWidth='1px' mb={6}  >
                <HStack p={3} justify={'space-between'}>
                    <HStack>
                        <Avatar name='Dan Abrahmov' src={postdata.data().profileimg} />
                        <Text fontWeight={'semibold'} >{postdata.data().username}</Text></HStack>
                    <BsThreeDots />
                </HStack>
                {postdata && <Image objectFit={'contain'} src={postdata && postdata.data().image} height={['300', '300', '500', '500']} width={700} />}
                {session ? <Stack px={'2'} py='2' >
                    <HStack justify={'space-between'}>
                        <HStack>
                            {hasliked ? <Box

                                as={'button'}>

                                <AiFillHeart
                                    style={{ fill: 'red' }}
                                    onClick={likepost}
                                    size={'23'}
                                />


                            </Box> : <Box as={'button'}> <AiOutlineHeart onClick={likepost} size={'23'} /></Box>}
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
                    <HStack>  {likes?.length > 0 ? <Text fontSize={'xs'} fontWeight='bold'> {likes?.length} likes</Text> : <Text fontSize={'xs'} fontWeight='bold'> 0 likes</Text>}</HStack>
                    <HStack fontSize={'sm'}>
                        {<Text noOfLines={1} fontWeight={'semibold'}>{postdata.data().username}</Text>}
                        <Text noOfLines={1}>{postdata.data().caption}</Text>

                    </HStack>

                    {comments?.length > 0 &&
                        <Stack fontSize={'sm'} h={'24'} overflow='auto'>
                            {comments?.map(comment => {
                                return <Box key={comment.id}>
                                    <HStack justify={'space-between'} px={['0', '0', '4', '4']}>
                                        <HStack >
                                            <HStack >
                                                <Avatar size={'xs'} src={comment.data().profileimg} />
                                                <Text fontWeight={'bold'} size='xs'>{comment.data().username}</Text>
                                            </HStack>
                                            <Text wordBreak={'break-all'} >{comment.data().comment}</Text>
                                        </HStack>
                                        <Box fontSize={'xs'} fontWeight='bold'>
                                            <Moment fromNow >
                                                {comment.data().timestamp?.toDate()}

                                            </Moment>
                                        </Box>

                                    </HStack>
                                </Box>
                            })}
                        </Stack>
                    }

                    <Box borderTop={'1px'} borderTopColor={'gray.100'}>



                        <Formik
                            initialValues={{ comment: '' }}
                            onSubmit={async (values, actions) => {
                                // actions.setSubmitting(true)
                                console.log(values)
                                const send = await addDoc(collection(db, 'posts', postdata.id, 'comment'), {
                                    comment: values.comment,
                                    username: session.user?.name,
                                    profileimg: session.user?.image,
                                    timestamp: serverTimestamp(),
                                })
                                actions.resetForm()
                                actions.setSubmitting(false)
                                console.log(send, 'send')

                            }}
                            validationSchema={Yup.object().shape({
                                comment: Yup.string().required(''),
                            })}
                        >
                            {(props) => (
                                <Form>
                                    <Field name='comment' >
                                        {({ field, form }: FieldProps) => (
                                            <FormControl isInvalid={(form.errors.comment && form.touched.comment) ? true : false}>
                                                {/* <FormLabel htmlFor='comment'>First comment</FormLabel> */}

                                                <InputGroup size='md'>
                                                    <InputLeftElement
                                                    ><FaRegSmile /></InputLeftElement>
                                                    <Input
                                                        {...field}
                                                        autoComplete="off"
                                                        variant={'ghost'}
                                                        pr='4.5rem'
                                                        type={'text'}
                                                        placeholder='Add a comment...'
                                                    />
                                                    <InputRightElement width='4.5rem'>
                                                        {props.isSubmitting ? <Button
                                                            type='submit'
                                                            h='1.75rem'
                                                            size='sm'
                                                            variant={'ghost'}
                                                            isLoading={props.isSubmitting}
                                                        >
                                                            Post
                                                        </Button> : <Button
                                                            type='submit'
                                                            h='1.75rem'
                                                            size='sm'
                                                            variant={'ghost'}

                                                        >
                                                            Post
                                                        </Button>}
                                                    </InputRightElement>
                                                </InputGroup>
                                                <FormErrorMessage>{form.errors.comment}</FormErrorMessage>
                                            </FormControl>


                                        )}
                                    </Field>
                                    {/* <Button
                                        mt={4}
                                        colorScheme='teal'
                                       
                                        type='submit'
                                    >
                                        Submit
                                    </Button> */}
                                </Form>
                            )}
                        </Formik>

                    </Box>
                </Stack> : <VStack> <Text py='2'>Log in to like and comment</Text></VStack>}
            </Stack>
        </div>
    )
}
// px={['16', '16',
// '48', '48']}
export default Post