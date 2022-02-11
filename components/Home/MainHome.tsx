import { Box } from '@chakra-ui/react';
import React from 'react';
import Feed from './Feed';
import Stories from './Stories';
import Suggestions from './Suggestions';
import { Grid, GridItem } from '@chakra-ui/react'
function MainHome() {
    return <Box
        px={['2', '2', '2', '200']}
        mt={8}>

        <Grid
            templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
            gap={4}
        >
            <GridItem colSpan={2}  >
                <Box >
                    <Stories />
                    <Feed />
                </Box>
            </GridItem>
            <GridItem colSpan={1}  >
                <Box display={['none', 'none', 'none', 'flex']} >
                    <Suggestions />
                </Box>
            </GridItem>

        </Grid>
    </Box>;
}

export default MainHome;
