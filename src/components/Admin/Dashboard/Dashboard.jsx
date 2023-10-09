import {
  Box,
  Grid,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { DoughnutChart, LineChart } from './Chart';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/Admin';
import Loader from '../../Layout/Loader/Loader';
const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <Box
    w={['full', '20%']}
    boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
    p="8"
    borderRadius={'lg'}
  >
    <Text children={title} />
    <HStack spacing={'6'}>
      <Text children={qty} fontSize={'2xl'} fontWeight="bold" />
      <HStack>
        {/* // phle sirf 1 hstack use ki to title aur percenteage upr neeche aye,hmne 1 lin m lana h tb hstak ke andr hstak lgaya aur bhi kuch kia */}
        <Text children={`${qtyPercentage}%`} />
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </HStack>
    </HStack>
    <Text children=" Since Last Month" opecity={0.6} />
  </Box>
);
const Bar = ({ title, value, profit }) => (
  <Box py={'4'} px={['0', '20']}>
    <Heading size={'sm'} children={title} mb="2" />
    <HStack w="full" alignItems={'center'}>
      {/* // hamne direct likha value ko tmplate string m ni rkha to ^ ka sign ni aya ab chnge ka */}
      <Text children={profit ? '0%' : `-${value}%`} />
      {/* //progress ye chakra ui se lia h */}
      <Progress w={'full'} value={profit ? value : 0} colorScheme="purple" />
      <Text children={` ${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);
const Dashboard = () => {
  const { stats,loading,usersCount, viewsCount,subscriptionCount, subscriptionPercentage,
    viewsPercentage,  userPercentage,subscriptionProfit, userProfit,viewsProfit} = useSelector(state => state.admin);

    
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);
  return (
  
 
    <Grid

      css={{
        //iska mtlb cursor jo hm dege bo y default
        cursor: `url(${cursor}),default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      {/* //yha ye states na ho lgana pda h kyunki loading ke bad khtm erro arhi */}
      {loading || !stats ? (
        <Loader color="purple.500" />
      ) : (
        <Box boxSizing="border-box" py="16" px={['4', '0']}>
          <Text
            textAlign={'center'}
            opecity={0.5}
            //hmne date lekr bahut kuch atat h hmne g pr split krdia,yha kb update kia bo date
            children={`Last Change was on ${String(new Date(stats[11].createdAt)).split('G')[0]}`}
          />
          
          <Heading
            children=" Dashboard"
            //margin left
            ml={['0', 16]}
            //margin bottom
            mb="16"
            textAlign={['center', 'left']}
          />
          <Stack
            direction={['column', 'row']}
            minH="24"
            justifyContent={'space-evenly'}
          >
            <Databox title="Views" qty={viewsCount} qtyPercentage={viewsPercentage} profit={viewsProfit} />
            <Databox title="Users" qty={usersCount} qtyPercentage={userPercentage} profit={userProfit} />
            <Databox
              title="Suscription"
              qty={subscriptionCount}
              qtyPercentage={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </Stack>
          <Box
            m={['0', '16']}
            borderRadius="lg"
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}
          >
        
            <Heading
              textAlign={['center', 'left']}
              size="md"
              children="View Graph"
              pt={['8', '0']}
              ml={['0', '16']}
            />
           
           
            <LineChart views={stats.map(item=>item.views)} />
            {/* Line graph yha layge */}
          </Box>
        
          <Grid templateColumns={['1fr', '2fr 1fr']}>
            <Box p="4">
              <Heading
                textAlign={['center', 'left']}
                size="md"
                children="Progress Bar "
                my="8"
                ml={['0', '16']}
              />
              <Box>
                <Bar profit={viewsProfit} title="Viws" value={viewsPercentage} />
                <Bar profit={userProfit} title="Users" value={userPercentage} />

                <Bar profit={subscriptionProfit} title="Subscriptions" value={subscriptionPercentage} />
              </Box>
            </Box>
            <Box p={['0', '16']} boxSizing="border-box" py="4">
              <Heading
                textAlign={'center'}
                size="md"
                mb={'4'}
                children="Users"  />

              < DoughnutChart users={[subscriptionCount,usersCount-subscriptionCount]}/>

                </Box>
          </Grid>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
