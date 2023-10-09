import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from '../CourseModal';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import { addLecture, deleteCourse, deleteLecture } from '../../../redux/actions/Admin';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {
  const { courses, lectures } = useSelector(state => state.course);
  const { loading, message, error } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  //views lecture bala h
  const courseDtailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };
  //isse course delete hoge
  const deleteButtonHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };

  //isse lecture delete hoge
  const deleteLectureButtonHandler = async( courseId ,lectureId) => {
 await dispatch(deleteLecture(courseId,lectureId))
 dispatch(getCourseLectures(courseId));
  };
  const addLectureHandler =  async (e, courseId, title, description, video) => {
  
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    console.log('akki12');
    //yha file lia h coz backend m multr ko us kia fil lgaya h bha name
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    //seedhi bat h turnt mesage dikhega turnt update bala courselist aygi kyunki dispatch krdia h messsssage ayga turnt courseupdat bale
    dispatch(getAllCourses());
  }, [dispatch, message, error,onClose]);
  // ye krdia bs ekdm dikhe add hine pr sare lecture dikhe usme
  return (
    <Grid
      css={{
        //iska mtlb cursor jo hm dege bo y default
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '8']} overflowX="auto">
        {/* //oveflowx auto kr rkha h n islie bo sliding bala arha h */}
        <Heading
          textTransform={'uppercase'}
          children=" All Users"
          my={'16'}
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption> All available courses in the database</TableCaption>
            <Thead>
              {/* //tr=.table row */}
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
                {/* //action act like it is numeric value */}
              </Tr>
            </Thead>
            <Tbody>
              {courses.map(item => (
                <Row
                  courseDtailsHandler={courseDtailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                 loading={loading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <CourseModal
          isOpen={isOpen}
          onClose={onClose}
          //yha pblm thi ki id kasa aye ,neexhe to map kia h to agyi thji id
          //islie yha ek function bnaye use upr set kue
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          lectures={lectures}
          loading={loading}
        />
      </Box>
      <Sidebar />
    </Grid>
  );
};

export default AdminCourses;
function Row({ item, courseDtailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td> #{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td> {item.title}</Td>

      <Td textTransform={'uppercase'}> {item.category}</Td>

      <Td> {item.createdBy}</Td>
      <Td isNumeric> {item.views}</Td>
      <Td isNumeric> {item.numOfVideos}</Td>

      {/* <Td> {item.subscription.status === 'active' ? "Active" : "Not Active"}</Td> */}

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDtailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            View Lectures
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
