import { Box, HStack, Text, VStack, Image } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

import React from 'react';
import Storyuserdata from './Storyuserdata';




function Stories() {
    //let map_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    let map_data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    //let map_data = [1, 2]
    const { data: session } = useSession()
    return <HStack
        borderColor={'gray.300'}
        borderWidth='1px'
        px={'4'}
        py='2'
        rounded={'md'}
        overflowX='auto'
    >
        {session &&


            <VStack>
                <Box

                    h={'14'}
                    w={'14'}

                    overflow='hidden'
                    borderWidth='2px'
                    borderTopColor={'red.400'}
                    borderLeftColor={'pink.400'}
                    borderRightColor={'pink.400'}
                    borderBottomColor={'red.400'}

                    rounded='full'>
                    <Image
                        src={`${session?.user?.image}`}
                        overflow='hidden'
                        height={'14'}
                        width={'14'}

                    />


                </Box>
                <Text noOfLines={1}>{session?.user?.name}</Text>
            </VStack>}
        {map_data.map((data) => {
            return <Box key={data}>
                <Storyuserdata id={data} />
            </Box>
        })}
    </HStack>
        ;
}

export default Stories;
