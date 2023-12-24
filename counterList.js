// CounterList.js

import React, {useRef} from 'react';
import { View,  FlatList, Image, StyleSheet,TextInput, Alert} from 'react-native';
import { Appbar,Card,Button,Avatar,Text } from 'react-native-paper';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCounter, decrementCounter, inputVoucher, applyVoucher } from './counterAction';


const CounterList = () => {
  
  // const counter = useSelector((state) => state.counter);
  const itemList = useSelector((state) => state.itemList);
  const subTotal = useSelector((state) => state.subTotal);
  const discount = useSelector((state) => state.discount);
  const total = useSelector((state) => state.total);
  const [visible, setVisible] = React.useState(false);
  const createAlert = (alertTitle,alertContent) =>{
    Alert.alert(alertTitle, alertContent);
    };

  
  const dispatch = useDispatch();
  const textVal = useRef();
  function sendTextValueHandler(newText){
       
        dispatch(inputVoucher(newText));
  } 
  const styles = StyleSheet.create({
    app_bar: {
      theme: 'theme.colors.surface'
    },
    container: {
      flex: 1,
    },
    text: {
      fontSize: 25,
      fontWeight: '500',
    },
    cardContent: {
      display: "flex",
      flexDirection: "row",
      justifyContent:'space-between'
    },
    cardContentButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: 'center',
      alignItems:'center'
    },
    itemCard:{
      marginStart:30
    },
    input: {
      // width:120,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      alignItems: 'stretch'
    },
    bottom: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
  
  const formatNumber = (q) => {
    return q.toLocaleString('en-ENG', {
        style: 'currency',
        currency: 'IDR'
    });
   } ;
   
  //  const { bottomInsets } = useSafeAreaInsets();
  const renderItem = ({ item, index }) => (
    <><Card>
      <Card.Content style={styles.cardContent}>
        
        <View style={styles.cardContent}>
          <Image  source={{width:30,height:30,uri:`${item.imageUrl}`}} />
          <View style={styles.itemCard}>
            <Text variant="bodyMedium">{item.item}</Text>
            <Text variant="bodySmall">{formatNumber(item.price).slice(0,-3).replace('IDR','Rp.').replace(',','.')}</Text>
          </View>
        </View>
        <View style={styles.cardContentButton}>
          <Button  mode="contained" onPress={() => dispatch(decrementCounter(index))}>-</Button>
          <Text style={{marginStart:12,marginEnd:12}}>{item.counter}</Text>
          <Button  mode="contained" onPress={() => dispatch(incrementCounter(index))}>+</Button>
        </View>
      </Card.Content>
      
    </Card>
    
   
      </>
  );
  
  return (
    <><SafeAreaProvider >
      <Appbar.Header >
      <Appbar.Content title="Testing RN Redux" />
      
    </Appbar.Header>
    
    
    <FlatList style={{flexGrow: 0}}
      data={itemList}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
    <Card>
      <Card.Content style={{display: "flex",
      flexDirection: "row",
      justifyContent:'flex-start'}}>
        
        
          <TextInput style={{height: 40,borderWidth:1, padding:10}}
        placeholder="Enter Voucher Code" onChangeText={newText => sendTextValueHandler(newText)}/>
          <Button mode="contained" style={{marginStart:12}} onPress={() => dispatch(applyVoucher())}>Apply</Button>
        
        
      </Card.Content>
      
      
    </Card>
    
    </SafeAreaProvider> 
    <Card>
      <Card.Content style={styles.bottom} >
        
        
          
          <Text variant="bodyLarge">Sub Total : {formatNumber(subTotal).slice(0,-3).replace('IDR','Rp.').replace(',','.')}</Text>
          <Text variant="bodyLarge">Dicsount : {formatNumber(discount).slice(0,-3).replace('IDR','Rp.').replace(',','.')}</Text>
          <Text variant="bodyLarge">Total : {formatNumber(total).slice(0,-3).replace('IDR','Rp.').replace(',','.')}</Text>
            
         
          <Button style={{marginTop:12,elevated:0}} mode="contained" onPress={() => subTotal>0 ? createAlert('Info','Pembayaran Berhasil') : createAlert('Info','Silahkan menambahkan item')}>Payment</Button>
        
        
      </Card.Content>
      
      
    </Card>
    
    </>
  );
 
};

export default CounterList;
