import { Button, VStack } from '@chakra-ui/react'
import React from 'react'
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
const Sidebar = () => {

const location=useLocation();
//iski help s find kr ksta hu kya location h

    return (
        <VStack spacing={'8'} padding='16'
            boxShadow={"-2px 0 10px rgba(107,70,193,0.5)"}>
 <LinkButton Icon={RiDashboardFill} text="Dashboard" url={'dashboard'} active={location.pathname==='/admin/dashboard'}/>
 <LinkButton Icon={RiAddCircleFill} text="Create Course" url={'createcourse'}
 //ham kie h agr path us location ke barabr kre to bo purpl ho jaye aur condition di h bo lg jaye
 active={location.pathname==='/admin/createcourse'}
 />
 
 <LinkButton Icon={RiEyeFill} text="Courses" url={'courses'}
 
 active={location.pathname==='/admin/courses'}
 />
 
 <LinkButton Icon={RiUser3Fill} text="Users" url={'users'}
 
 active={location.pathname==='/admin/users'}
 />
    
 

        </VStack>
    )
}

export default Sidebar


function LinkButton({url,Icon,text,active}) {
    return (

        <Link to={`/admin/${url}`}>
{/* //iska mtlb agr active h to purple anytha kuch ni */}
            <Button colorScheme={active?"purple":""} variant="ghost" fontSize={'larger'}>
                <Icon style={{ margin: '4px' }} />
          {text}
            </Button>
        </Link>



    )
}