import { Spinner, VStack } from '@chakra-ui/react'
// import { transform } from 'framer-motion'
import React from 'react'

//loader ka sign ghumta h bo bna h
// ye loader bnatya kyunki load krne pr bar bar redirect ho rha tha profile pe ,while opening dashboard
const Loader = ({color='yellow.500'}) => {
  return (
    <VStack h="100vh" justifyContent={'center'}>
<div  style={{transform:'scale(4)'}}>
<Spinner thickness='2px' speed='0.65s' emptyColor='transparent'
color={color} size='xl'
/> 

</div>

    </VStack>
  )
}

export default Loader
