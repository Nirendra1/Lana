// import { ColorModeScript } from '@chakra-ui/react'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack,  useDisclosure, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"
//agr default export ni hota to ham us curly  braces m rkhkr import krlete h
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri'
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';


const LinkButton = ({ url = "/", title = "Home", onClose }) => (

  <Link onClick={onClose} to={url}>
    <Button variant={"ghost"}> {title}</Button>
  </Link>
)

const Header = ({isAuthenticated=false,user}) => {
  // //ye hamn lia h disclosure ka usek rke chkram se
  const { isOpen, onOpen, onClose } = useDisclosure()
 
const dispatch=useDispatch();

  const logoutHandler = () => {

    onClose();
    dispatch(logout())
  };
  return (
    <>
      <ColorModeSwitcher />
      {/* basically here used for theme change */},
      {/* yha basicaly hamn lga dia inclick mtlb jb ham buttun pr click krege,to isopen call hoga  */}
      <Button onClick={onOpen} 
      zIndex={'overlay'}//ye krne se hua ye ki phle jb coursepage m vdo dali thi to bo uske upr click krne pr drawer ni khul rha tha means deactivet tha,now working
      colorScheme={'yellow'}
       width='12' 
       height={'12'}
        rounded="full"
         position={"fixed"}
          top="6" left="6" >
        {/* usi button pr css h */}
        <RiMenu5Fill />
        {/* jo theme ke bgl m dikh rha bahi icon */}
      </Button >

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        {/* hamne isopen tru kr rkha h,to hme sb content dihega khula hua uske andr buutun k andr  */}
        <DrawerOverlay backdropFilter={'blur(3px)'}>
          <DrawerContent>
            <DrawerHeader borderBottomWidth={'1px'}> My Self akii </DrawerHeader>
            <DrawerBody>
              <VStack spacing={"4"} alignItems="flex-start  ">
                {/* onClose={onClose},ye bhja h ki click krte hi bnd ho jaye drwer.ase hi hmn hr link ke age lgaya h */}
                <LinkButton onClose={onClose} url="/" title="Home" />
                <LinkButton onClose={onClose} url="/courses" title="Browse All Courses" />
                <LinkButton onClose={onClose} url="/request" title="Request A Course" />
                {/* <LinkButton onClose={onClose} url="/" title="Home" /> */}
                <LinkButton onClose={onClose} url="/Contact" title="Contact Us" />
                <LinkButton onClose={onClose} url="/About" title="About" />
                {/* actually kuch ni kia bs iska alg function bna dia bhasad n hoo bs */}
                <HStack justifyContent={"space-around"} position="absolute" bottom={"2rem"} width="80%">
                  {isAuthenticated ? (<>
                    <VStack>
                      <HStack>
                      
                      <Link onClick={onClose} to="/profile" >
                      <Button variant={"ghost"} colorScheme={'yellow'} >
                          Profile</Button>
                      </Link>
                        
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          {/* Logout pr j icon arha uske lie h ye  */}
                          LogOut</Button>
                      </HStack>
                      {
                        user && user.role ==="admin" && (<Link onClick={onClose} to="admin/dashboard">
                          <Button colorScheme={'purple'} variant="ghost">
                            <RiDashboardFill style={{ margin: "4px" }} />
                            Dashboard
                          </Button>
                        </Link>)}
                    </VStack>
                  </>) : (<>
                    <Link  onClick={onClose} to="/login">
                      <Button colorScheme={'yellow'}>Login</Button>

                    </Link>
                    <p>OR</p>
                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={'yellow'}>Signup</Button>

                    </Link>
                  </>)}

                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>

        </DrawerOverlay>
        {/* drawer lia hmne ab usi buttun pr click krk kuch dikhana ho ya kuch uske lie,sarari file import hogi */}
      </Drawer>
    </>
  )
}

export default Header



