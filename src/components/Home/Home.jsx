import React from 'react'
import { Box, Button, Heading, HStack, Image, Stack, Text, VStack } from '@chakra-ui/react'
import "./home.css"
import { Link } from 'react-router-dom'
 import vd from "../../assets/images/student.png"// vd hmne vector graphicas bnaya chakra lia images bala neche use kia h,,
import { CgGoogle, CgYoutube } from "react-icons/cg"
import { SiCoursera, SiUdemy } from "react-icons/si"
import { DiAws } from "react-icons/di"
//actually we import hre logoo from dfrrent sites and use them in <Hstack/>
import introvdo from "../../assets/videos/im.mp4"





const Home = () => {
  return (

    <section className="home">
       <Heading marginLeft="50px" marginTop="40px"  color="blue.500" children="Lana Education"  fontSize="4xl" mt={8} textShadow="2px 2px #718096" />
      <div className="container" >
     
        <Stack
          direction={['column', 'row']}// actually hre perform css,agr phone hoga to phla item ni to dusra item,objectfit,contain sb bs image ko sahi kia h
          height="100%"
          justifyContent={['center', 'space-evenly']}
          alignItems='center'
          spacing={['16', '56']}//<vstack>==.basically use for direction of vertical,isme by dfault dirction vertical rhti h

        >
         
          <VStack width={"full"} alignItems={['center', 'flex-end']} spacing='8'>

         

            <Heading children="LEARN FROM THE EXPERTS" size={'2xl'} />
            <Text
              fontSize={'2xl'}
              fontFamily="cursive"
              textAlign={['center', 'left']}
              children="Find Valueable Content At Reasonable Price" />
            <Link to="/courses">
              <Button size={'lg'} colorScheme="yellow">
                explore now
              </Button>
            </Link>
          </VStack>
          {/* //md */}
  
          <Image className="vector-graphic"
            boxSize= '400px' src={vd} objectFit="contain"  borderRadius="3px" />
          
          {/* tha image scope with budha */}
        </Stack>


      </div>
      <Box padding={"8"} bg="blackAlpha.800">
        {/* this is using for giving blach background to alpha bet our brand */}
        <Heading textAlign={"center"} fontFamily="body" color={"yellow"} children="OURS BRANDS" />
        <HStack className="brandsbanner" justifyContent="space-evenly" marginTop={"4"}>
          {/* justifycontent s sare logo dur hogy,and margin se neeche  */}
          <CgGoogle />
          <CgYoutube />
          <SiCoursera />
          <SiUdemy />
          <DiAws />
        </HStack>
      </Box>
      <div className="container2">
        <video autoPlay={false}
          //ye sb bs vedio lene ke li kia h,and src bgerh de dia bs
          controls controlsList='nodownload nofullscreen normotplayback' disablePictureInPicture disableRemotePlayback src={introvdo}
        //jo isne dia h bs snse smjh lo vdo pr ctrl h bs
        >


        </video>
      </div>
    </section>

  )
}

export default Home
