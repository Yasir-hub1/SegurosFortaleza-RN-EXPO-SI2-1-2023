import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { detallePago } from '../../../Services/AuthService';
import { Button } from 'react-native-elements';
import CustomSelect from '../../../Components/CustomSelect';

const DetallePago = ({route,navigation}) => {
  console.log("route ",route.params);
  const {id_pago,nro_poliza}=route.params;
  
  const [obtenerDetallePagos, setObtenerDetallePago] = useState([]);
  const [SelectPago, setSelectPago] = useState("");

  const {monto,tipo_pago,fecha_limite_pago,id}=obtenerDetallePagos;

  const redirecPago=()=>{
    navigation.navigate("realizarPago",{id_pago:id});
  }


  useEffect(() => {
    (async()=>{
      try {
        let resp=await detallePago(id_pago);
        setObtenerDetallePago(resp)
        console.log(resp);
  
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  

  console.log("obtenerDetallePagos ",obtenerDetallePagos,SelectPago );

  const Data=[
    {
      key:"Qr",
      value:"Qr"
    },
    {
      key:"Targ",
      value:"Tarjeta de Credito"
    },
    {
      key:"Traf",
      value:"Transferencia Bancaria"
    }
    
  ]

  
  return (
    <>
    {obtenerDetallePagos  ? (
    <View style={styles.container}>
      <Text style={styles.title}>Realizar Pago</Text>

      <View style={styles.row}>

         <Text>Código Poliza</Text>
       
        <Text style={{marginLeft:65}}>Fecha Limite</Text>
     
      </View>

      <View style={styles.row}>

      <TextInput style={styles.input} placeholder={`${nro_poliza}`}  editable={false} />

      <TextInput style={styles.input} placeholder={`${fecha_limite_pago}`} editable={false} />


      </View>

      <View style={styles.row}>
      <Text>Tipo de Pago</Text>
        <Text style={{marginLeft:65}}>Monto</Text>

      </View>

      <View style={styles.row}>

      <TextInput style={styles.input} placeholder={`${tipo_pago}`} editable={false} />

      <TextInput style={styles.input} placeholder={`${monto}`}  editable={false} />

     
      </View>
      <CustomSelect
      data={Data}
      setSelected={val => setSelectPago(val)}
      placeholder="Eliga un pago"
      search={true}
      searchPlaceholder={"Buscar"}
      save={"key"}
      notFoundText={"No existe"}
      dropdownStyles={styles.dropdownStyles}
      maxHeight={80}
      />
      <Text>{" "}</Text>
      <Button title="Enviar" onPress={redirecPago} />
    </View>

    ) :null}
    </>
  )
}

export default DetallePago

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
})