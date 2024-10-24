import React, {  useState, useEffect } from 'react';
import { TextInput, View, Text, Pressable, ScrollView, Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const Content_web = ({ showPage, invia, setStory, getStory }) =>{
  return (
    <ScrollView>
      <View style={styles.box}>
        <View style={styles.footerapp2}>
          <Pressable onPress={() => showPage(2)}><Text style={styles.link}>Annulla</Text></Pressable>
          <Text style={styles.testi}> | </Text>
          <Pressable onPress={invia}><Text style={styles.link}>Racconta</Text></Pressable>
        </View>
        <TextInput multiline={true} numberOfLines={10} spellCheck={false} style={styles.textarea} placeholder="Scrivi qui la tua storia..." value={getStory()} onChangeText={(text) => setStory(text)} />
      </View>
    </ScrollView>
  )
};

const Content_app = ({ getStory, setStory }) =>{
  return (
    <ScrollView>
      <View style={styles.box}>
        <TextInput multiline={true} numberOfLines={10} spellCheck={false} style={styles.textarea} placeholder="Scrivi qui la tua storia..." value={getStory()} onChangeText={(text) => setStory(text)} />
      </View>
    </ScrollView>
  )
};

const validator = require('validator');
const NewStory = ({ showPage, gWVTtoken, sShowPopupFB, setInviaFunction }) => {
  // useEffect(() => {
  //   if (gWVTtoken() == ''){
  //     showPage(2);
  //     sShowPopupFB(true);
  //   }
  // }, [gWVTtoken, showPage, sShowPopupFB]);

  useEffect(() => {
    setInviaFunction(invia);
  }, [invia]);

  const [errorText, setErrorText] = useState('');
  const [story, setStory] = useState('');
  const getStory = (page) => { return story; };
  function invia() {
    setErrorText("");
    /* ====== Basic Check ====== */
    if (story === '') {
        setErrorText("Completa tutti i campi prima di proseguire");
        return;
    }

    /* ====== Sanitized ====== */
    const sanitizedStory = validator.escape(story);
    
    /* ====== Send post ====== */
    console.log("invio fetch = Story:"+sanitizedStory);
    try {
        fetch("http://localhost:3000/new_story", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                storia: sanitizedStory,
                jwt: gWVTtoken()
            }),
        })
        .then(result => {
            if (!result) return;
            const { status, body } = result;
            if (status != 200) {
                setErrorText(body.message);
            }else{
              showPage(2);
            }
        })
        .catch(error => {
              setErrorText("Errore interno");
        });            
    }catch (error) {
        setErrorText("Errore interno");
        return ;
    }
  }
  return (
    <View style={styles.stacca}>
      { Platform.OS === 'web' && <Content_web showPage={showPage} invia={invia} setStory={setStory} getStory={getStory} /> }
      { Platform.OS !== 'web' && <Content_app getStory={getStory} setStory={setStory} /> }
    </View>
  );
};
export default NewStory;