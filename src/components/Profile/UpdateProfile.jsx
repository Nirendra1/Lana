import React, { useState } from 'react'
import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

//user lia aur yha bhej dia
const UpdateProfile = ({user}) => {

  //profile chnge krne ke bad ham jb drawer se andr ja rhe tb message aya,ham chahiye kibahi pr redirect krde
//to messege bahi dikhe so use nvigator,useeffct se bhi kr skt the


  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate=useNavigate();
  const dispatch=useDispatch();
  //dtaa profile ka save ni hua hmne tb async bnaya andawait lggakr loaduser dispatch kia
  const submitHandler= async(e)=>{
    e.preventDefault();
  
   await dispatch(updateProfile(name,email));
    dispatch(loadUser());
    navigate('/profile')
   }

   const {loading}=useSelector(state=>state.profile)
  return (
    <Container py={'16'} minH={'90vh'}>

      <form onSubmit={submitHandler}>
        <Heading children="Update Profile"
          my={'16'}
          textTransform={'uppercase'}
          textAlign={['center', 'left']}
        />
        <VStack spacing={'8'}>
          {/* //agr ham rquired dete mtlb hmn bo dono id aur balue chahie hi chahiye */}
          <Input value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            focusBorderColor="yellow.500" />
          <Input value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            focusBorderColor="yellow.500" />
          <Button isLoading={loading} w='full' colorScheme={'yellow'} type="submit">
            Update
          </Button>
        </VStack>
      </form>
    </Container>
  )
}

export default UpdateProfile
