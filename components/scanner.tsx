import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { BarCodeScanner} from 'expo-barcode-scanner';
import FontAwesome5 from '@expo/vector-icons/build/FontAwesome5';

interface Props{
  scannedItems: (scanOne: string, scanTwo: string, scanThree: string) => void;
}

function Scanner(props:Props ){
 
const [hasPermission, setHasPermission] = useState<boolean | null>(null);
const [scanned, setScanned] = useState(false);
const [text, setText] = useState('Skanna första koden');
const [newCodes, setNewCodes] = useState<string[]> ([]);

let buttonTitle;
let icon;

switch(newCodes.length){
  case 0:
    buttonTitle ='Skanna din första kod';
    break;
    case 1:
      buttonTitle='Skanna andra koden';
      icon="laugh-beam";
      break;
      case 2:
        buttonTitle='Skanna sista koden';
        icon='grin-stars';
        break;
        case 3:
          buttonTitle='Bra jobbat! Nu fixar vi bilden :)';
          icon='image';
          break;
          default:
            buttonTitle= 'Vad händer?! :)'
            icon='poo';
}

  const grantedCameraPermission = () => {
    (async () => {
    const {status} = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status == 'granted')
  })()
  }
  const deniedCameraPermission = () => {
    (async () => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'denied')
      
    })()
  }
 
  const handleBarCodeScanned = ({type, data}: { type: string, data: string }) => {
    setText(data);
    newCodes.push(data);
    setNewCodes((prevCodes) => [...prevCodes, data]);
    
    const [scanOne, scanTwo, scanThree] = newCodes;
    props.scannedItems(scanOne, scanTwo, scanThree);
   
    setScanned(true);
    setNewCodes(newCodes);
    console.log('Type: ' + type + '\nData: ' + data + '\nscanOne: ' + scanOne+ '\nscanTwo: '+scanTwo+ '\nscanThree: ' + scanThree);
    
  }
  //check permissions and return the screens
  if(hasPermission === null) {
    return(
      <View style={styles.container}>
      <Text>Do you allow us to use the camera?</Text>
      <Button title='Yes' onPress={grantedCameraPermission} />
      <Button title='No' onPress={deniedCameraPermission} />
    </View>
    )
  }
  if(hasPermission === false) {
    return(
      <View style={styles.container}>
      <Text style={{margin:10}}>No access to camera</Text>
      <Button title={'Allow camera'} onPress={() => grantedCameraPermission()}/>
    </View>
    )
  }
 

return(
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned }
        style = {{height:400, width: 400}}/>
      </View>
      <Text style={styles.maintext}>{text}</Text>
      {scanned && <Button title={buttonTitle} onPress={() => setScanned(false)} color='tomato'></Button> }
      <Text><FontAwesome5 name={icon} size={100} color="black" /></Text>
    </View>  
)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    maintext: {
      fontSize: 16,
      margin: 20,
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato'
    },
    viewStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
    image: {
    width: 200, // Anpassa storleken efter ditt behov
    height: 200,
    }
  });
  
export default Scanner;