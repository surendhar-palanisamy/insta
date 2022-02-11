import React from 'react';
import { getProviders, signIn as SignInProvider } from 'next-auth/react'
import Layout from '../../components/layout/Layout';
import { Box, Button, Stack, Text, VStack } from '@chakra-ui/react';
import Instagram from '../../public/instagram.png'
import Image from 'next/image';
import Head from 'next/head';
type provider_type = {
    providers: singular_type[]
}
type singular_type = {
    name: any;
    id: any;
}
function signin({ providers }: provider_type) {
    return <VStack pt={10} gap='5'>
        <Head>
            <title>Login</title>
            {/* <link rel="shortcut icon" href="/static/logo.png" /> */}
            <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        </Head>
        <Image src={Instagram} />
        <Text>Please Signin to have a better experience</Text>
        <Box p={'16'}>
            {Object.values(providers).map((provider) => (
                <Stack key={provider.name}>
                    <Button colorScheme={'blue'} onClick={() => SignInProvider(provider.id, { callbackUrl: '/' })}>
                        Sign in with {provider.name}
                    </Button>
                </Stack>
            ))}
        </Box>
    </VStack>;
}

export async function getServerSideProps() {

    const providers = await getProviders();
    return {
        props: {
            providers
        }
    }

}

export default signin;
