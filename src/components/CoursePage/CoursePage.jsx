import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// import introvdo from "../../assets/videos/im.mp4"

import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';

const CoursePage = ({ user }) => {
  const [lectureNumber, setlectureNumbr] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);
  const dispatch = useDispatch();

  //params se jo name dia h bahi name yha dekr uski id miti h,
  // watch now pr click krne se acces ho rha ,ab hm krdege subscriber ni h to access ni krpaye
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['3fr', '3fr 1fr']}>
      {/* ////yha hmn ki aki lecture to bo krna h agr ni ho to neeche bala dikha dn */}
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              autoPlay={false}
              width={'100%'}
              //ye sb bs vedio lene ke li kia h,and src bgerh de dia bs
              controls
              controlsList="nodownload  normotplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            >
              {/* //yha bs lectures nikale h jo susur m stet krdi h state abhi0 h to bha se a jygi,
                        //baki bahut vdo ho to neeche st ki h sari vdo bha se aygi */}
              {/* //jo isne dia h bs snse smjh lo vdo pr ctrl h bs */}
            </video>

            {/* // yh aye kia ki jo lectureno chlr ha hoga to ase =1 se increse hoga age bdhene pr,yha neeche sexy chiz ki sari property acces kr slte h */}
            <Heading
              m="4"
              children={`#${lectureNumber + 1}  ${
                lectures[lectureNumber].title
              }`}
            />
            <Heading m="4" children={lectures[lectureNumber].description} />
            <Text m="4">ahdhkajd</Text>

            {/* //grid  hmne 2 column bnaye phla neeche bala jo box n lia, ab ham bagal m vertical bale pr kr rhe */}
          </Box>

          {/* //vstack ke and r curly braces lge h kyunki hmne return ni krna kuchto avoid that*,ye confirm ni pr jo arrow function ke bad lgaye h paranthesis bo isi ko avoi krne ke lie h*/}

          <VStack>
            {lectures.map((element, index) => (
              <button
                onClick={() => setlectureNumbr(index)}
                //yha bhut sexy ciz kedi h ki click hote hi set ho number aur sblkcuh according to lecture
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: '0',
                  borderBottom: '1px solid rgba (0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading children="No Lectures" />
      )}
    </Grid>
  );
};

export default CoursePage;
