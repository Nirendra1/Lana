import React from 'react'
import { Box, Button, Grid, Heading, HStack, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import cursor from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux"
import { deleteUser, getAllUsers, updateUserRole } from '../../../redux/actions/Admin'
import toast from 'react-hot-toast';
// import Loader from "../../Layout/Loader/Loader"


const Users = () => {

  
  const { users, loading,message,error } = useSelector(state => state.admin);


 
  const dispatch=useDispatch()

  const updateHandler=(userId)=>{
 dispatch(updateUserRole(userId))
  }

 const deleteButtonHandler=(userId)=>{
 dispatch(deleteUser(userId))
 }

useEffect(()=>{
 if (error) {
    toast.error(error);
   dispatch({ type: 'clearError' });
  }

  if (message) {
    toast.success(message);
    dispatch({ type: 'clearMessage' });
   }

  dispatch(getAllUsers())
},[dispatch,message,error])
//useeffect m agr ye baad bala ni lgaya to infinite loop ayga


  return (
    <Grid
      css={{
        //iska mtlb cursor jo hm dege bo y default
        cursor: `url(${cursor}),default`
      }}

      minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>


    <Box p={['0', '16']} overflowX="auto">

    <Heading textTransform={'uppercase'}
      children=" All Users"
      my={'16'}
      textAlign={['center', 'left']} />

    <TableContainer w={["100vw", "full"]}>

      <Table variant={'simple'} size='lg'>

        <TableCaption>  All available users in the database</TableCaption>

        <Thead>
          {/* //tr=.table row */}
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Subscription</Th>
            <Th isNumeric>Action</Th>
            {/* //action act like it is numeric value */}
          </Tr>

        </Thead>
        <Tbody>

          {
           users&& users.map(item => (
              <Row loading={loading}  updateHandler={updateHandler} deleteButtonHandler={deleteButtonHandler} key={item._id} item={item} />
            ))
          }
        </Tbody>

      </Table>

    </TableContainer>

  </Box>
  
   
      <Sidebar />

    </Grid>
  )
}

export default Users

function Row({ item,updateHandler,deleteButtonHandler,loading }) {
  return (
    <Tr>

      <Td> #{item._id}</Td>
      <Td> {item.name}</Td>

      <Td> {item.email}</Td>

      <Td> {item.role}</Td>

{/* //item .subscritpion ni kia to unactive */}
      <Td> { item.subscription&& item.subscription.status === 'active' ? "Active" : "Not Active"}</Td>

      <Td isNumeric>

        <HStack justifyContent={'flex-end'}>

          <Button isLoading={loading} onClick={()=>updateHandler(item._id)} variant={'outline'} color="purple.500">Change Role</Button>

          <Button
           onClick={()=>deleteButtonHandler(item._id)}
          color={"purple.600"}>

            <RiDeleteBin7Fill />

          </Button>

        </HStack>

      </Td>




    </Tr>

  )


}