import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
body: {width: '99.9%',backgroundColor: 'rgb(255, 240, 201)',overflowX: 'hidden'},
navbar: {zIndex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',position: 'absolute',top: 0,width: width,backgroundColor: 'rgba(85, 32, 15, 0.65)',borderBottomWidth: 3,borderBottomColor: 'white',padding: 20},
footer: {marginTop: 50,width: '100%',backgroundColor: 'rgba(85, 32, 15, 0.65)',borderTopWidth: 3,borderTopColor: 'white',padding: 10,justifyContent: 'center'},
titoli: {fontSize: width > 600 ? 30 : 20,color: 'white',fontWeight: 'bold'},
testi: {fontSize: width > 600 ? 25 : 20,color: 'white'},
fototendina: {width: 50,height: 50},
tendina: {flexDirection: 'row'},
link: {fontSize: width > 600 ? 25 : 20,textDecorationLine: 'underline',color: 'white'},
box: {justifyContent: 'center',alignItems: 'center',alignSelf: 'center',backgroundColor: 'rgba(85, 32, 15, 0.65)',borderColor: 'white',borderWidth: 3,padding: 20,marginTop: 30,width: width/1.2},
stacca: {justifyContent: 'space-between',marginTop: 90,width: '100%'},
row: {flexDirection: 'row',marginVertical: 10,},
popup: {right: width > 600 ? '15%' : '0', position: 'absolute',top: width > 600 ? '5%' : '20%',width: width > 600 ? width/2 : width-10,backgroundColor: 'rgba(85, 32, 15, 0.9)',popupborderWidth: 3,borderColor: 'white',padding: 15},
fondonero: {backgroundColor: 'rgba(10, 10, 10, 0.7)',position: 'absolute',top: 0,left: 0,width: '100%',height: '100%'},
credenziali: {fontSize: width > 600 ? 25 : 20,padding: 5,color: 'white',borderBottomWidth: 3,borderBottomColor: 'white',marginTop: 10, width: '100%'},
bottoni: {backgroundColor: 'rgba(85, 32, 15, 0.65)',borderWidth: 3,borderColor: 'white',marginTop: 10,padding: 10},
});
export default styles;