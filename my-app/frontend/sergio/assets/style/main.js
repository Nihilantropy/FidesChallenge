import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

const background={backgroundColor: 'rgba(85, 32, 15, 0.65)'};
const backgroundbody={backgroundColor: 'rgb(255, 240, 201)'};
const colortesti={color: 'white'};
const testiunder={textDecorationLine: 'underline',...colortesti};
const centro={justifyContent: 'center',alignItems: 'center',alignSelf: 'center'};
const bordbase={borderColor: 'white',borderWidth: 3};
const footerbase={padding: 10,width: '100%',borderTopWidth: 3,borderTopColor: 'white',justifyContent: 'center',...background};

let regole={
body: {justifyContent: 'space-between',flex: 1,width: '99.9%',overflowX: 'hidden',...backgroundbody},
navbar: {zIndex: 7,flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',position: 'absolute',top: 0,width: width,padding: 20,...background,...bordbase},
titoli: {fontWeight: 'bold',...colortesti},
footerweb: {marginTop: 25,...footerbase},
footerapp: {zIndex: 7,position: 'absolute',bottom: 0,...footerbase},
footerapp2: {flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'},
rowpuro: {flexDirection: 'row'},
tornaallahome: {margin: 20,textAlign: 'left',alignSelf: 'flex-start',...testiunder},
sinistra: {textAlign: 'left',alignSelf: 'flex-start'},
qrcode: {width: 200,height: 200},
cleseimg: {paddingRight: 10},
tendina: {flexDirection: 'row'},
testi: {...colortesti},
testidestra: {textAlign: 'rigth',alignSelf: 'flex-end',...colortesti},
link: {...testiunder},
box: {padding: 20,marginTop: 30,width: width/1.2,...background,...bordbase,...centro},
box2: {padding: 20,marginTop: 30,width: width/1.2,...background,...bordbase},
box3: {padding: 20,marginTop: 30,marginLeft: 20,...background,...bordbase},
centro: {...centro},
stacca: {width: '100%'},
row: {flexDirection: 'row',marginVertical: 10,},
row2: {flexDirection: 'row',marginVertical: 10,marginLeft: 60},
popup: {width: 'auto',position: 'absolute',padding: 15,...bordbase,...background},
fondonero: {zIndex: 40,backgroundColor: 'rgba(10, 10, 10, 0.7)',position: 'absolute',top: 0,left: 0,width: '100%',height: '100%'},
credenziali: {padding: 5,borderBottomWidth: 3,borderBottomColor: 'white',marginTop: 10,width: '100%',...colortesti},
textarea: {textAlignVertical: 'top',padding: 5,width: '100%',marginTop: 10,...bordbase,...colortesti},
bottoni: {borderWidth: 3,borderColor: 'white',marginTop: 10,padding: 10,...background},
foto: {},
foto2: {},
};

if(width > 600){
    /* ===== Grandi schermi ===== */
    regole.testi={...regole.testi,fontSize: 25};
    regole.link={...regole.link,fontSize: 25};
    regole.tornaallahome={...regole.tornaallahome,fontSize: 25};
    regole.credenziali={...regole.credenziali,fontSize: 25};
    regole.textarea={...regole.textarea,fontSize: 25};
    regole.titoli={...regole.titoli,fontSize: 30};
    regole.footerweb={...regole.footerweb,padding: 20};
    regole.popup={...regole.popup,top: '20%',left: '30%'};
    regole.foto={width: 45,height: 45};
    regole.foto2={width: 20,height: 20};
    regole.box3={...regole.box3,width: width/2.5};
}else{
    /* ===== Piccoli schermi ===== */
    regole.testi={...regole.testi,fontSize: 20};
    regole.link={...regole.link,fontSize: 20};
    regole.tornaallahome={...regole.tornaallahome,fontSize: 20};
    regole.credenziali={...regole.credenziali,fontSize: 20};
    regole.textarea={...regole.textarea,fontSize: 20};
    regole.titoli={...regole.titoli,fontSize: 25};
    regole.footerweb={...regole.footerweb,padding: 10};
    regole.popup={...regole.popup,top: '7%',left: 0};
    regole.foto={width: 35,height: 35};
    regole.foto2={width: 15,height: 15};
    regole.box={...regole.box,width: width-10};
    regole.box2={...regole.box2,width: width-10};
    regole.box3={...regole.box3,width: width-10};
}

if(Platform.OS === 'web'){
    /* ===== Web ===== */
    regole.stacca={...regole.stacca,marginTop: 90};
}else{
    /* ===== Telefono ===== */
    regole.stacca={...regole.stacca,marginTop: 0,paddingBottom: 80};
}
const styles=StyleSheet.create(regole);
export default styles;