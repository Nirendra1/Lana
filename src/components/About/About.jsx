import { Avatar, Button, Container, Heading, Stack, Text, VStack,Box, HStack} from '@chakra-ui/react'
import React from 'react'
import { RiSecurePaymentFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import introvdo from "../../assets/videos/im.mp4"
import Termsandcondition from "../../assets/docs/Termsandcondition"
import { useDispatch } from 'react-redux'
import vd from "../../assets/images/Boy.jpg.jpg"
const Founder=()=>(

<Stack 
direction={['column','row']}
spacing={['4','16']}
padding={'8'}
>

<VStack>

<Avatar  src={vd}
boxSize={['40','48']} />
<Text children="Co-Founder" opecity={0.7}/>
</VStack>
<VStack justifyContent={'center'} alignItems={['center','flex-start']}>
<Heading children="Nirendra Pratap singh" size={['md','xl']}/>
<Text children={'Hi, I am Software Engineer with 2 year of experience specializing in react.js, javascript, ES6, and css, tailwind, proficient in crafting responsible web applications and user interfaces with clean, efficient code.solving complex problems with innovative solutions. dedicated to delivering high quality software product that exceeds client expectations..'}/>

</VStack>


</Stack>


)

const VideoPlayer=()=>(
<Box>
<video 
    autoPlay={true}
     muted
     loop
          //ye sb bs vedio lene ke li kia h,and src bgerh de dia bs
          controls controlsList='nodownload 
          nofullscreen 
          normotplayback'
           disablePictureInPicture 
           disableRemotePlayback 
           src={introvdo}
        //jo isne dia h bs snse smjh lo vdo pr ctrl h bs
        >


        </video>

</Box>
)

const Tandc =({termAndCondition})=>(
<Box>

<Heading size={'md'} children="Terms & Condition"
textAlign={['center','left']} my ='4'/>
{/* //overflowy krne se jo cdition pr scrol aya bo agya brna data overfolw horha tha */}
<Box h='sm' p='4' overflowY={'scroll'}>
{termAndCondition}
<Text textAlign={['center','left']} 
letterSpacing={'widest'}
fontFamily={"heading"}
>{'termAndCondition'} </Text>
<Heading my='4' size={'xs'} children=" Refund only aplicable for cancllation within 7 days"/>
</Box>
</Box>


)




const About = () => {
  const dispath = useDispatch()
  return (
    <Container maxW={"container.lg"} padding="16" boxShadow={'lg'}>
<Heading children="About Us" textAlign={['center','left']}/>


<Founder/>
<Stack m='8' direction={['column','row']} alignItems="center">
<Text fontFamily={'cursive'} m='8' textAlign={['center','left']}>
We are a Video streaming plateform with some premimum courses available
only for premium users.

</Text>
<Link to="/subscribe">
<Button
onClick={()=>{
  dispath({
    type : 'testTrueRequest'
  })
}}
variant={'ghost'} colorScheme='yellow'>
Checkout Our Plan
</Button>

</Link>
</Stack>
<VideoPlayer/>


<Tandc termAndCondition={Termsandcondition}/>


<HStack my="4" p={"4"}>
<RiSecurePaymentFill/>
<Heading  size = {'xs'} fontFamily="sans-serif" textTransform={'uppercase'} children ={"Payment is secured by Rezorpay"}/>
</HStack>
    </Container>
  )
}

export default About
