import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
body: {width: width,height: height,backgroundColor: 'rgb(255, 240, 201)'},
navbar: {flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',position: 'absolute',top: 0,width: width,height: 80,backgroundColor: 'rgba(85, 32, 15, 0.65)',borderBottomWidth: 3,borderBottomColor: 'white',padding: 20},
footer: {position: 'absolute',bottom: 0,width: width,height: 80,backgroundColor: 'rgba(85, 32, 15, 0.65)',borderTopWidth: 3,borderTopColor: 'white',paddingLeft: 10,justifyContent: 'center'},
titoli: {fontSize: 28,color: 'white',fontWeight: 'bold'},
testi: {fontSize: 23,color: 'white'},
fototendina: {width: 50,height: 50},
tendina: {flexDirection: 'row'},
link: {fontSize: 25,textDecorationLine: 'underline',color: 'white'},
box: {flex: 1,justifyContent: 'center',alignItems: 'center',alignSelf: 'center',backgroundColor: 'rgba(85, 32, 15, 0.65)',borderColor: 'white',borderWidth: 3,padding: 20,marginTop: 30,width: width/1.5},
stacca: {marginTop: 70,width: width},
row: {flexDirection: 'row',marginVertical: 10,},
popup: {position: 'absolute',top: '20%',left: '25%',width: '50%',backgroundColor: 'rgba(85, 32, 15, 0.9)',popupborderWidth: 3,borderColor: 'white',padding: 20},
fondonero: {backgroundColor: 'rgba(10, 10, 10, 0.7)',position: 'absolute',top: 0,left: 0,width: '100%',height: '100%'},
credenziali: {fontSize: 25,padding: 5,color: 'white',borderBottomWidth: 3,borderBottomColor: 'white',marginTop: 10},
bottoni: {backgroundColor: 'rgba(85, 32, 15, 0.65)',borderWidth: 3,borderColor: 'white',marginTop: 10,padding: 10},
});
export default styles;