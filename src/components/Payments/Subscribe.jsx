import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

//DHYAN RHE TUMH KHUD DKHNA H KONSA BOX KHA LIA THA ISKE BHAR VSTACK THA YA ANDR KYUNKI BAHI H YH

import { useDispatch, useSelector } from 'react-redux';
import { buySubscription } from '../../redux/actions/user';
import { server } from '../../redux/store';

import toast from 'react-hot-toast';

import logo from '../../assets/images/logo.png';

const Subscribe = ({ user }) => {
  //   const [subscriptionId, setSubsciptionId] = useState('');
  //   const dispatch = useDispatch();
  //  const [error, setError] = useState('')
  //  const [loading, setLoading] = useState('')

  //  const [error:Error2, setError] = useState('')

  //   async function  useGetSubscriptionID () {
  //     const {error,loading,subscriptionId} = await useSelector(
  //     state => state.subscription)
  //     const {error:Error2} = await useSelector(
  //       state => state.subscription
  //       )

  //     setLoading(loading)
  //     setError(error)
  //     setSubsciptionId(subscriptionId)

  const dispatch = useDispatch();
  // const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);
  //ye nikali error show krad i

  const [key, setKey] = useState('');
  //yha bahi le skte h jo stor  m kia h
  //const {subscriptionId}=useSelector(state=>state.user.subscription_id)
  //console.log(state);
  const subscribeHandler = async () => {
    //jha dkh key bgerh lia h kyumko backemd se milega hame
    const { data } = await axios.get(`${server}/razorpaykey`);
    //   console.log(data)
    setKey(data.key);

    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        //index.js m razorpay kiscript filadd ki h
        const options = {
          key,
          name: 'Coursebundler',
          description: 'Get access to all premium content ',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Lana Education',
          },
          theme: {
            color: '#FFc800',
          },
        };

        const razor = new window.Razorpay(options);

        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    user.name,
    user.email,
    key,
    subscriptionId,
    courseError,
  ]);

  return (
    <Container h="90vh" p="16">
      <Heading children="Welcome" my="8" textAlign={'center'} />
      <VStack
        boxShadow={'lg'}
        alignItems="stretch"
        borderRadius={'lg'}
        spacing="0"
      >
        {/* bg mtlb background color,yha css alg se di h ath ath pixel donoterf se,top left top right se baki botmo up and bottom zero */}
        <Box bg="yellow.400" p={'4'} css={{ borderRadius: '8px 8px 0 0' }}>
          <Text color={'black'} children={'pro pack - ₹1.00'} />
        </Box>
        <Box p="4">
          {/* //px hmne horrizonlt padding di h */}
          <VStack textAlign={'center'} px="8" spacing={'8'}>
            <Text
              color={'black'}
              children={'join pro pack and get access to all content'}
            />
            <Heading size={'md'} children={'₹1.00 Only'} />
          </VStack>
          <Button
            my="8"
            w="full"
            colorScheme={'yellow'}
            onClick={subscribeHandler}
            isLoading={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box
          bg={'blackAlpha.600'}
          p="4"
          css={{ borderRadius: '0 0  8px 8px ' }}
        >
          <Heading
            size="sm"
            color={'white'}
            textTransform="uppercase"
            children={'100%refund at cancellation'}
          />
          <Text
            fontSize={'xs'}
            color="white"
            children=" Temrs &Conditions Apply"
          />
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
