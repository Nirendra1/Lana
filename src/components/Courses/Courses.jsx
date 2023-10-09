import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllCourses } from '../../redux/actions/course';

import { addToPlaylist } from '../../redux/actions/profile';

import { loadUser } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';
// const addToPlaylistHandler = () => {
//   console.log("add to list")
// }
//yha loading playlis ko ek achi trh se di gyi h

const Course = ({
  views,
  title,
  imagesrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lecturecount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imagesrc} boxSize="60" objectFit={'contain'} />
      {/* //image lgane ke li box aya yah s */}
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        size={'sm'} //title ka size chhota kia h
        noOfLines={3}
        children={title}
      />
      {/* //nooflines means 2 line se jyada line hui to dot dot likhkr ayga bs */}
      <Text noOfLines={2} children={description} />
      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform="uppercase"
          children={'Created BY'}
        />
        <Text
          fontFamily={'body'}
          textTransform="uppercase"
          children={creator}
        />
      </HStack>
      <Heading
        textTransform="uppercase"
        textAlign={'center'}
        size={'xs'}
        children={`Lectures-${lecturecount}`}
      />
      <Heading
        textTransform="uppercase"
        size={'xs'}
        children={`Views-${views}`}
      />

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}> Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={'ghost'}
          colorScheme={'yellow'}
          onClick={() => addToPlaylistHandler(id)}
        >
          {' '}
          Add To Playlist
        </Button>
      </Stack>
    </VStack>
  );
};
//keyword dia h sarch krne pr ata rhe
const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setcategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async id => {
    await dispatch(addToPlaylist(id));
    dispatch(loadUser());
  };

  const categories = [
    'Web development',
    'Artificial INtelligence',
    ' Data Strucutr & Algorithm',
    'App development',
    'Data science',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a Course..."
        type={'text'}
        //ye ham chkra se lie h sarch box ko bnan ke lie
        focusBorderColor="yellow.500"
      />
      {/* //overflow  ye jo courses ko slide krke dkh rhe bo h ,css ke bad bala lgane se bina slider ke bs arroew idhr udhr krn se dlide ho rha*/}
      <HStack
        overflow={'auto'}
        paddingY="8"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setcategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['centre', 'flex-start']}
      >
        {
          //seedhi bat h course h uspe map lgakr sare ajayge
          courses.length > 0 ? (
            courses.map(item => (
              <Course
                key={item._id}
                title={item.title}
                description={item.description}
                views={item.views}
                imagesrc={item.poster.url}
                id={item._id}
                creator={item.createdBy}
                lecturecount={item.numOfVideos}
                addToPlaylistHandler={addToPlaylistHandler}
                loading={loading}
              />
            ))
          ) : (
            <Heading opacity={0.5} mt="4" children=" Course not found" />
          )
        }
      </Stack>
    </Container>
  );
};

export default Courses;
