import { Avatar, Button, Container, Heading, HStack, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, VStack } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from "react-icons/ri"
//ye delete bala buttun h
import React, { useEffect, useState } from 'react'
import { fileUploadCss } from '../Auth/Register'
import { Link } from 'react-router-dom'
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile'
import { useDispatch, useSelector } from 'react-redux'
import { cancelSubscription, loadUser } from '../../redux/actions/user'
import { toast } from 'react-hot-toast'
const Profile = ({user}) => {
  const dispatch=useDispatch()
const {loading,message,error}=useSelector(state=>state.profile);

//same name ni le skte islie ye kia loading kuch aur boldia
const {loading:subscriptionLoading,
  message:subscriptionMessage,
  error:subscriptionError}=useSelector(state=>state.subscription);

  // console.log(subscriptionMessage);

  const removeFromPlaylistHandler = async id => {
   await dispatch(removeFromPlaylist(id))
   dispatch(loadUser())
  } 

  const ChangImageSubmitHandler = async(e, image) => {
  //ye krdia,mtlb jb chnge pr kruga n to submit ni hoga form
  e.preventDefault();

  const myForm=new FormData();
  myForm.append('file',image)
  //yha file lia h coz backend m multr ko us kia fil lgaya h bha name
  await  dispatch(updateProfilePicture(myForm))
  dispatch(loadUser())
  }



  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch({type:'clearError'})
    }
    if(message){
      toast.success(message);
      dispatch({type:'clearMessage'})
    }
    if(subscriptionError){
      toast.error(subscriptionError);
      dispatch({type:'clearError'})
    }
    if(subscriptionMessage){
      toast.success(subscriptionMessage);
      dispatch({type:'clearMessage'})
      dispatch(loadUser())
    }
   },[dispatch,error,message,subscriptionError,subscriptionMessage])

  const { isOpen, onClose, onOpen } = useDisclosure()

const cancelsubscriptionHandler =()=>{

  dispatch(cancelSubscription())

}

  return (
    <Container minH={'95vh'} maxW="container.lg" py="8" >
      <Heading children="Profile" m='8' textTransform={'uppercase'} />
      <Stack

        justifyContent={'flex-start'}
        direction={['column', 'row']}
        spacing={['8', '16']}
        alignItems='center'
        padding='8'

      >

        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button  onClick={onOpen}
            //basicslly jo neecghe chngeimage box m dia h ,sb yha se hndle hoga
            variant={'ghost'} colorScheme='yellow'>
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name} />

          </HStack>
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email} />
          </HStack>

          <HStack>
            <Text children="CreatedAt" fontWeight={'bold'} />
            <Text children={user.createdAt.split("T")[0]} />
            {/* //coz bha t ke bad ka tim tha dusri index uski to date chahiye to 0th index pr split kia */}
          </HStack>


          {//meansjb user ka rool admin ka brabr ni tb ye bale stack dikhga
            user.role !== 'admin' && <HStack>

              <Text children="Subscription" fontWeight={'bold'} />
               { user.subscription&& user.subscription.status === 'active' ? (
                <Button  isLoading={subscriptionLoading}
                onClick={cancelsubscriptionHandler}
                  color={'yellow.500'}
                  variant='unstyled'
                > Cancel Subscription</Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={'yellow'}> Subscribe</Button>
                </Link>
              )}
            </HStack>

          }
          <Stack
            direction={['column', 'row']}
            alignItems='center'
          >
            <Link to="/updateprofile">
              <Button> Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button> Change Password</Button>
            </Link>

          </Stack>

        </VStack>
      </Stack>

      <Heading children="Playlist" size={'md'} />

      {

        user.playlist.length > 0 && (
          <Stack
            direction={['column', 'row']}
            alignItems='center'
            flexWrap={'wrap'}
            padding='4'
          >{
              user.playlist.map((Element) => (
                //yha curly braces ni die mtlb khud se hi retrun kra dug,return likhne ki zrrt n h
                <VStack width={"48"} m='2' key={Element.course} >
                  <Image boxSize={'full'} objectFit="contain" src={Element.poster} />
                  {/* //chakra se lia h image tag */}
                  <HStack>
                    {/* // link atach hua course fir uski id pr */}
                    <Link to={`/course/${Element.course}`}>
                      <Button variant={'ghost'} colorScheme='yellow'>
                        Watch Now
                      </Button>
                    </Link>
                    <Button  isLoading={loading} onClick={() => removeFromPlaylistHandler(Element.course)} >
                      <RiDeleteBin7Fill />
                    </Button>
                  </HStack>

                </VStack>

              ))
            }
          </Stack>
        )

      }
      {/* //alg se component bn a rhe */}
      <ChangePhotoBox
        ChangImageSubmitHandler={ChangImageSubmitHandler}
        isOPen={isOpen} onClose={onClose} 
        loading={loading}/>

    </Container>
  )
}

export default Profile

function ChangePhotoBox({ isOPen, onClose, ChangImageSubmitHandler ,loading}) {
  const [imagePrev, setImagePrev] = useState('')
  const [image, setImage] = useState('')

  const ChangeImage = (e) => {
    const file = e.target.files[0]//1 file hogi bs
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // yha file ki datat url mesns bahi urk mil JAYGI
    reader.onloadend = () => {//mtlb yha hua ki imgage ki url puri hone ke bad,reader ko value read kra do
      setImagePrev(reader.result);
      setImage(file);//ye direct file jygi jb hm submit krege
    }

  }

  const closeHandler = () => {
    onClose();
    setImagePrev('')
    setImage('')
  }
  //ye modal ham chkra se lie h pop up krte hu chnge hogi photo


  return (
    <Modal isOpen={isOPen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={'blur(10px)'} />

      <ModalContent>

        <ModalHeader> Change Photo</ModalHeader>

        <ModalCloseButton />
        <ModalBody>

          <Container>

            <form onSubmit={(e) => ChangImageSubmitHandler(e, image)}>
              {/* //submit ho pr page refresh n ho jaye islie hmne upr define bhi kr dia */}
              <VStack spacing={'8'}>

                {// condition lga di mne agr Image prev h tb hi dikhega avatar m
                  imagePrev && <Avatar src={imagePrev} boxSize={'48'} />
                }

                <Input type={'file'} css={{ "&::file-selector-button": fileUploadCss }}

                  onChange={ChangeImage}
                />
                <Button  isLoading={loading} w={'full'} colorScheme='yellow' type='submit'> Change</Button>
              </VStack>

            </form>


          </Container>


        </ModalBody>
        <ModalFooter>

          <Button mr='3' onClick={closeHandler} > Cancel</Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}