import React, { useEffect } from 'react'
import { Container, Grid, Heading, VStack, Input, Select,Image, Button } from '@chakra-ui/react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { useState } from 'react'
import { fileUploadCss } from '../../Auth/Register'
import { createCourse } from '../../../redux/actions/Admin'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'


const CreateCourse = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');


  const dispatch=useDispatch();

  const {loading,error,message}=useSelector(state=>state.admin)

  const categories = [
    "Web development", "Artificial INtelligence",
    " Data Strucutr & Algorithm",
    "App development",
    "Data science"
  ]


  const changeImageHandler = (e) => {
    const file = e.target.files[0]//1 file hogi bs
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // yha file ki datat url mesns bahi urk mil JAYGI
    reader.onloadend = () => {//mtlb yha hua ki imgage ki url puri hone ke bad,reader ko value read kra do
      setImagePrev(reader.result);
      setImage(file);//ye direct file jygi jb hm submit krege
    }

  }


const submithandler= (e)=>{
 // category,createdBy,file
  e.preventDefault();
  const myForm=new FormData();
  myForm.append('description',description);
  myForm.append('title',title);
  myForm.append('category',category)
  myForm.append('createdBy',createdBy)
  myForm.append('file',image)
  //yha file lia h coz backend m multr ko us kia fil lgaya h bha name

  dispatch(createCourse(myForm))
}
useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch({ type: 'clearError' });
  }
  if (message) {
    toast.success(message);
    dispatch({ type: 'clearMessage' });
  }
}, [dispatch, error, message]);
//inme chnge hoga again useefeft call hoha

  return (
    <Grid
      css={{
        //iska mtlb cursor jo hm dege bo y default
        cursor: `url(${cursor}),default`
      }}

      minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>

      <Container py='16' >

        <form onSubmit={submithandler}> 
          <Heading textTransform={'uppercase'} children=" Create Course" my={'16'} textAlign={['center', 'left']} />
          <VStack m='auto' spacing={'8'}>

            <Input value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="purple.300" />{''}

            <Input value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300" />

            <Input value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="purple.300" />


            <Select focusBorderColor='purple.300' value={category}
              onChange={e => setCategory(e.target.value)}

            >
              {/* //chakra ui se lia h,select tag */}

              <option value="">Category</option>
              {categories.map(item => (
                //key index bhi de skte h pr categroy hi alg h item uniqu h
                <option key={item}
                  value={item}>{item}</option>

              ))}


            </Select>

            <Input required
              accept='image/*'
              //mtlb koi bhi imag accept krega ye ase krne se"
          
              type={'file'}

              focusBorderColor="purple.300"

              css={{
                "&:: file-selector-button": {
                  //yha spread operor lgakr sara material udhr se import krrlia
                  ...fileUploadCss,
                  color: 'purple'
                },
              }
              }
              onChange={changeImageHandler}
            />
            {/* //mtlb h ki agr imageprev h to jo imag eusme d rkha h bahi dalo src m */}
            {imagePrev && (
              <Image src={imagePrev} boxSize='64' objectFit={'contain'} />

            )
            }
            <Button isLoading={loading} w='full' colorScheme={'purple'} type='submit'> Create</Button>



          </VStack>

        </form>


      </Container>
      <Sidebar />

    </Grid>
  )
}

export default CreateCourse
