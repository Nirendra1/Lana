import { Text, Box, Grid, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Button, VStack, Input, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { fileUploadCss } from '../Auth/Register'

const CourseModal = ({ isOpen, onClose,
    id,
    courseTitle,
    deleteButtonHandler, 
    addLectureHandler,
    lectures = [],
    // take this array empty in starting
loading
}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState('')
    const [videoPrev, setVideoPrev] = useState('')
    const changeVideoHandler = (e) => {
        const file = e.target.files[0]//1 file hogi bs
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // yha file ki datat url mesns bahi urk mil JAYGI
        reader.onloadend = () => {//mtlb yha hua ki imgage ki url puri hone ke bad,reader ko value read kra do
            setVideoPrev(reader.result);
            setVideo(file);//ye direct file jygi jb hm submit krege
        }

    }
    const handleClose = () => {
        setTitle('')
        setDescription('')
        setVideo('')
        setVideoPrev('')
        onClose();
    }
    return (
        //,hamne upload kie kuch aur bnd krke fire khola to bo data n mile isk lie,yhi onclose pr lga dia handler aur sbko nill kedia us fn m,reactcourse m jakr jo scroll kr parhe ho bo scroll behavior outside se h
        <Modal isOpen={isOpen} size='full' onClose={handleClose} scrollBehavior="outside">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{courseTitle}</ModalHeader>
                {/* //jo cancel ka sign arha yji h */}
                <ModalCloseButton />
                <ModalBody p='16'>
                    <Grid templateColumns={["1fr", "3fr 1fr"]}>
                        <Box px={['0', '16']}>
                            <Box my='5'>
                                <Heading children={courseTitle} />
                                <Heading children={`#${id}`} size="sm" opacity={0.4} />
                            </Box>
                            <Heading children={"Lectures"} size="lg" />
                            {/* 
                            <VideoCard
                                title="React Intro"
                                description="This is into vdo where u will be going to wath vdoat free of cost"
                                num={1}
                                lectureId="aksjsjjsj Lecture"
                                CourseId={id}
                                deleteButtonHandler={deleteButtonHandler}

                            />
 */}
{/* //sare lecture print kradie */}
                            {
                                lectures.map((item, index) => (
                                    <VideoCard
                                        key={index}
                                        title={item.title}
                                        description={item.description}
                                        num={1 + index}
                                        lectureId={item._id }
                                        CourseId={id}
                                        deleteButtonHandler={deleteButtonHandler}
                                         loading={loading}
                                    />
                                ))
                            }
                        </Box>
                        <Box>
                            <form onSubmit={e => addLectureHandler(e, id, title, description, video)}>
                                <VStack spacing={'4'}>
                                    <Heading children="Add Lecture" size={'md'}
                                        textTransform={"uppercase"} />
                                    <Input focusBorderColor='purple.300'
                                        placeholder='Title'
                                        value={title}
                                        onChange={e => setTitle(e.target.value)} />
                                    <Input focusBorderColor='purple.300'
                                        placeholder="Description"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)} />
                                    <Input
                                        accept='video/mp4'
                                        required   //mtlb koi bhi imag accept krega ye ase krne se"
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
                                        onChange={changeVideoHandler}
                                    />
                                    {
                                        videoPrev && (
                                            <video controlsList='nodownload' controls src={videoPrev}></video>
                                        )
                                    }
                                    <Button   isLoading={loading}
                                     w={'full'} colorScheme="purple" type='submit'>Add Lecture</Button>
                                </VStack>
                            </form>
                        </Box>
                    </Grid>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CourseModal
function VideoCard({ title, description, num, lectureId, CourseId, deleteButtonHandler ,loading}) {
    return (<Stack direction={['column', 'row']} my='8' borderRadius={'lg'}
        boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
        justifyContent={['flex-start', 'space-between']}
        p={['4', '8']}
    >
        <Box>
            <Heading size={'sm'} children={`#${num} ${title}`} />
            <Text children={description} />
        </Box>
        <Button  isLoading={loading}
        color={'purple.600'}
            onClick={() => deleteButtonHandler(CourseId, lectureId)}   >
            <RiDeleteBin7Fill />
        </Button>
    </Stack>
    )

}