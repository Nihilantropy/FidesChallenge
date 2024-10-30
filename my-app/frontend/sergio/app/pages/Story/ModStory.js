import React, {  useState, useEffect } from 'react';
import { TextInput, View, Text, Pressable, ScrollView, Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const Content_web = ({ showPage, modifica, setStory, getStory }) => {
  const [story, setStoryText] = useState(getStory());
  const [height, setHeight] = useState(300);
  const handleTextChange = (text) => {
    if (text.length <= 1000) {
      setStory(text);
      setStoryText(text);
    }
  };
  const handleContentSizeChange = (e) => {
    const newHeight = e.nativeEvent.contentSize.height;
    if (story.length > 0 && newHeight > 300) {
      setHeight(newHeight);
    } else if (story.length === 0) {
      setHeight(300);
    }
  };
  return (
    <ScrollView>
      <View style={styles.box}>
        <View style={{alignSelf: 'flex-start'}}><Text style={styles.titoli}>Modifica Storia</Text></View>
        <View style={[styles.rowpuro, {alignSelf: 'flex-end'}]}>
          <Pressable onPress={() => showPage(7)}><Text style={styles.link}>Annulla</Text></Pressable>
          <Text style={styles.testi}> | </Text>
          <Pressable onPress={modifica}><Text style={styles.link}>Modifica</Text></Pressable>
        </View>
        <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 200, height: height }]} placeholder="Scrivi qui la tua storia..." value={story} onChangeText={handleTextChange} />
        <Text style={styles.testidestra}>{story.length}/1000</Text>
      </View>
    </ScrollView>
  );
};

const Content_app = ({ getStory, setStory }) =>{
  const [story, setStoryText] = useState(getStory());
  const [height, setHeight] = useState(200);
  const handleTextChange = (text) => {
    if (text.length <= 1000) {
      setStory(text);
      setStoryText(text);
    }
  };
  const handleContentSizeChange = (e) => {
    const newHeight = e.nativeEvent.contentSize.height;
    if (newHeight > 200) {
      setHeight(newHeight);
    }
  };
  return (
    <ScrollView>
      <View style={styles.box}>
        <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 200, height: height }]} placeholder="Scrivi qui la tua storia..." value={story} onChangeText={handleTextChange} />
        <Text style={styles.testidestra}>{story.length}/1000</Text>
      </View>
    </ScrollView>
  )
};

const validator = require('validator');
const ModStory = ({ showPage, gWVTtoken, sShowPopupFB, setModificaFunction, setShowErr, gid }) => {
  // useEffect(() => {
  //   if (gWVTtoken() == ''){
  //     showPage(2);
  //     sShowPopupFB(true);
  //   }
  // }, [gWVTtoken, showPage, sShowPopupFB]);

  useEffect(() => {
    setModificaFunction(modifica);
  }, [modifica]);

  const [story, setStory] = useState('');
  const getStory = (page) => { return story; };
  function modifica() {
    /* ====== Basic Check ====== */
    if (story === '') {
      setShowErr("Completa tutti i campi prima di proseguire");
      return;
    }

    if (story.length > 1000) {
      setShowErr("Raggionto il limite di caratteri");
      return;
    }

    /* ====== Sanitized ====== */
    const sanitizedStory = validator.escape(story);
    
    /* ====== Send post ====== */
    console.log("invio fetch = Story:"+sanitizedStory);
    fetch("http://localhost:3000/story/mod_story", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storia: sanitizedStory,
            jwt: gWVTtoken(),
            id: gid()
        }),
    })
    .then(result => {
        if (!result) return;
        const { status, body } = result;
        if (status != 200) {
          setShowErr(body.message);
        }else{
          showPage(7);
        }
    })
    .catch(error => {
      setShowErr("Errore interno");
    });
  }
  return (
    <View style={styles.stacca}>
      { Platform.OS === 'web' && <Content_web showPage={showPage} modifica={modifica} setStory={setStory} getStory={getStory} /> }
      { Platform.OS !== 'web' && <Content_app getStory={getStory} setStory={setStory} /> }
    </View>
  );
};
export default ModStory;