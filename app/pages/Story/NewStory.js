import React, {  useState, useEffect } from 'react';
import { TextInput, View, Text, Pressable, ScrollView, Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const Content_web = ({ showPage, invia, setStory, getStory }) => {
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
        <View style={{alignSelf: 'flex-start'}}><Text style={styles.titoli}>Nuova Storia</Text></View>
        <View style={[styles.rowpuro, {alignSelf: 'flex-end'}]}>
          <Pressable onPress={() => showPage(2)}><Text style={styles.link}>Annulla</Text></Pressable>
          <Text style={styles.testi}> | </Text>
          <Pressable onPress={invia}><Text style={styles.link}>Racconta</Text></Pressable>
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
const NewStory = ({ showPage, gWVTtoken, sShowPopupFB, setInviaFunction, setShowErr }) => {
  // useEffect(() => {
  //   if (gWVTtoken() == ''){
  //     showPage(2);
  //     sShowPopupFB(true);
  //   }
  // }, [gWVTtoken, showPage, sShowPopupFB]);

  useEffect(() => {
    setInviaFunction(invia);
  }, [invia]);

  const [story, setStory] = useState('');
  const getStory = (page) => { return story; };
  function invia() {
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
    fetch("http://localhost/story/new_story", {
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
          setShowErr(body.message);
        }else{
          showPage(2);
        }
    })
    .catch(error => {
      setShowErr("Errore interno");
    });
  }
  return (
    <View style={styles.stacca}>
      { Platform.OS === 'web' && <Content_web showPage={showPage} invia={invia} setStory={setStory} getStory={getStory} /> }
      { Platform.OS !== 'web' && <Content_app getStory={getStory} setStory={setStory} /> }
    </View>
  );
};
export default NewStory;