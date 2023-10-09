
import React from 'react'
import {  Button, Container, Heading,  VStack } from '@chakra-ui/react'


import { Link } from "react-router-dom";
import { RiErrorWarningFill } from 'react-icons/ri';
const PaymentFail= () => {
  return (<Container h={'90vh'} >
       <VStack justifyContent={'center'} h='full' spacing={'4'}>
        <RiErrorWarningFill size={'5rem'}/>
    <Heading > 
    Payment Failed
    </Heading>
 
      <Link to="/subscribe">
        <Button variant={'ghost'}>
    Try Again
        </Button>
      </Link>
      <Heading size={'xs'} > Reference:something </Heading>
    </VStack>
  </Container>
  )
  
  
}
export default PaymentFail
