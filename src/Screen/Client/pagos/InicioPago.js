import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardListPagos from '../../../Components/CarListPagos'
import { listarPago } from '../../../Services/AuthService'


const InicioPago = ({navigation}) => {
  const [listPagas, setlistPagas] = useState([]);

  const data = [
    {
      id: '1',
      title: 'Tarjeta 1',
      field1: 'Campo 1',
      field2: 'Campo 2',
      field3: 'Campo 3',
      field4: 'Campo 4',
    },
    {
      id: '2',
      title: 'Tarjeta 2',
      field1: 'Campo 1',
      field2: 'Campo 2',
      field3: 'Campo 3',
      field4: 'Campo 4',
    },
    {
      id: '3',
      title: 'Tarjeta 2',
      field1: 'Campo 1',
      field2: 'Campo 2',
      field3: 'Campo 3',
      field4: 'Campo 4',
    },
    {
      id: '4',
      title: 'Tarjeta 2',
      field1: 'Campo 1',
      field2: 'Campo 2',
      field3: 'Campo 3',
      field4: 'Campo 4',
    },
  ]

   useEffect(() => {
    obtenerListPagos();
   }, [])
   
   async function obtenerListPagos(){
    try {
      let _obtenerPagos= await listarPago()
      setlistPagas(_obtenerPagos);
      console.log("state Pagos ",_obtenerPagos);
   } catch (error) {
    console.log(error);
   }
   }

  return (
    <View style={{flex:1}}>
    <CardListPagos data={listPagas} navigation={navigation} />
    </View>
  )
}

export default InicioPago