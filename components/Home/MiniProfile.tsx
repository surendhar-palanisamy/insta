import { Avatar, Box, Heading, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { signIn, signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react';
function MiniProfile() {
    const { data: session } = useSession()
    return <div>
        {session ? <HStack justify={'space-between'} pl='3' pr='2' py='2' gap={'12'} position='fixed'>
            <HStack gap={2}>
                <Avatar
                    name={`${session?.user?.name}`}
                    size='lg'
                    alt='profile pic'
                    src={`${session?.user?.image}`} />
                <Box
                    gap={0}
                    p={0}
                    align={'flex-start'}>
                    <Heading fontSize={'xs'} as='h2'>{session.user?.email}</Heading>
                    <Text textColor={'blackAlpha.600'} fontFamily={'serif'} fontSize={'md'}>{session.user?.name}</Text>
                </Box>
            </HStack>

            <Text as='button' onClick={() => signOut()} fontSize={'sm'} fontWeight='semibold' textColor={'#55B6F6'}>SignOut</Text>

        </HStack> :
            <HStack justify={'space-between'} pl='3' pr='2' py='2' gap={'12'} position='fixed'>
                <Text as='button' onClick={() => signIn()} fontSize={'sm'} fontWeight='semibold' textColor={'#55B6F6'}>signIn</Text>
            </HStack>
        }
    </div >;
}

export default MiniProfile;
