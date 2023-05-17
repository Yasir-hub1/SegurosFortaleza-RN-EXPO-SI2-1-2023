import AuthNavigation from './AuthNavigation';
import React,{useEffect} from 'react'
import { NavigationContainer,useNavigation } from '@react-navigation/native'
import TabBar from "../Navigations/Stacks/ClienteNavigation";


export default function Wrapper({userToken}){
  return (
    <NavigationContainer>
      <AppNavigation userToken={userToken}/>
    </NavigationContainer>
  );
}

const AppNavigation = ({userToken}) => {
   let user=false;

  return (
    <>
       {user==false ?  <AuthNavigation/> : <TabBar/>}
    </>
  )
}


