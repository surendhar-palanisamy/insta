import { Box, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MainHome from '../components/Home/MainHome'
import Layout from '../components/layout/Layout'
import styles from '../styles/Home.module.css'
import Instagram from '../public/instagram.png'
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Instagram</title>
        {/* <link rel="shortcut icon" href="/static/logo.png" /> */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
      </Head>
      <MainHome />
    </div>
  )
}

export default Home
