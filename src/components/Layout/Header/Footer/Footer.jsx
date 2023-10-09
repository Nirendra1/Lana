import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import{TiSocialYoutubeCircular,TiSocialInstagramCircular} from "react-icons/ti"
import {DiGithub} from "react-icons/di"
const Footer = () => {
  return (// basically hmne yha sare icons lie h chkra se fir normal css
   <Box padding={'4'} bg="blackAlpha.900" minH={'10vh'}>
<Stack direction={['column','row']}>
<VStack alignItems={["center","flex-start"]} width="full">
<Heading  children="All right Reserved"  color={'white'}/>
<Heading  fontFamily={"body"} size='sm' children="@AKashDinkar"  color={'yellow.400'}/>

</VStack>
<HStack spacing={["2","10"]} justifyContent="center" color={'white'} fontSize="50" >
    {/* //target blamk dia h ki koi click kre to nyi tab khule */}
    <a href="https://youtube.com//@dhruvrathee" target={'_blank'} >
        <TiSocialYoutubeCircular/>
    </a>
    <a href="https://instagram.com/__a___kash___" target={'_blank'}>
        <TiSocialInstagramCircular/>
    </a>
    <a href="https://github.com//meAkki" target={'_blank'}>
        <DiGithub/>
    </a>
    {/* //{'_blank'} ye krne se hr bari nyi tab open hoti h,agr {'blank'},ye de to usi tab m sb khulega jo khologe */}
</HStack>
</Stack>
   </Box>
  )
}

export default Footer
