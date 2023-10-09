import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import  from 'react'
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

// is trh se ccs dete h and hi deni ho to neeche define kia h mn
//exportki h kyumki iska use aur trh sebhi krna h
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
  // CSSSS ki vdo iske yha se dekhna
};

const fileUploadStyle = {
  '&:: file-selector-button': fileUploadCss,
};

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0]; //1 file hogi bs
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // yha file ki datat url mesns bahi urk mil JAYGI
    reader.onloadend = () => {
      //mtlb yha hua ki imgage ki url puri hone ke bad,reader ko value read kra do
      setImagePrev(reader.result);
      setImage(file); //ye direct file jygi jb hm submit krege
    };
  };

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);
    //yha file lia h coz backend m multr ko us kia fil lgaya h bha name

    dispatch(register(myForm));
  };

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'-2.5'}>
        <Heading textTransform={'uppercase'} children={'Registration'} />
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <Box my="4" display={'flex'} justifyContent={'center'}>
            <Avatar src={imagePrev} size="2xl" />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="Name" />
            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ab"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel htmlFor="email" children="Email Address" />
            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
          </Box>
          {/* </form> */}
          {/* <form style={{ width: '100%' }}> */}
          <Box my={'4'}>
            <FormLabel htmlFor="password" children="Password" />
            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>
          <Box my={'4'}>
            {/* //chooseavatarr krne se bo photo lgane ki jgh ayi */}
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              required
              id="chosseAvatar"
              accept="image/*"
              //mtlb koi bhi imag accept krega ye ase krne se"
              type={'file'}
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>

          <Button my="4" colorScheme={'yellow'} type="submit">
            Sign Up
          </Button>
          <Box my="4">
            Allready Signed UP?
            <Link to="/login">
              <Button colorScheme={'yellow'} variant="link">
                {' '}
                Sign Up
                {/* //{''} ye dia kyuki signup ke bad gape chahie the fir heere */}
              </Button>{' '}
              {''}
              here
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Register;
