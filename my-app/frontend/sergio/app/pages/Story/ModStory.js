import React, {  useState, useEffect } from 'react';
import { TextInput,View,Text,Pressable,ScrollView,Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const Content_web = ({ showPage,modifica_storia,setStory,getStory,gtitolo,settitolo  }) => {
  const [story, setStoryText] = useState(getStory());
  const [height, setHeight] = useState(300);
  const handleTextChange = (text) => {
    if (text.length <= 1500) {
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
          <Pressable onPress={modifica_storia}><Text style={styles.link}>Racconta</Text></Pressable>
        </View>
        <TextInput spellCheck={false} placeholder="Titolo" style={styles.credenziali} value={gtitolo()} onChangeText={(text) => settitolo(text)}/>
        <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 200, height: height }]} placeholder="Scrivi qui la tua storia..." value={story} onChangeText={handleTextChange} />
        <Text style={styles.testidestra}>{story.length}/1500</Text>
      </View>
    </ScrollView>
  );
};

const Content_app = ({ getStory,setStory,gtitolo,settitolo }) =>{
  const [story, setStoryText] = useState(getStory());
  const [height, setHeight] = useState(200);
  const handleTextChange = (text) => {
    if (text.length <= 1500) {
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
        <TextInput spellCheck={false} placeholder="Titolo" style={styles.credenziali} value={gtitolo()} onChangeText={(text) => settitolo(text)}/>
        <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 200, height: height }]} placeholder="Scrivi qui la tua storia..." value={story} onChangeText={handleTextChange} />
        <Text style={styles.testidestra}>{story.length}/1500</Text>
      </View>
    </ScrollView>
  )
};

const validator = require('validator');
const ModStory = ({ gid,showPage,gJWTtoken,sShowPopupFB,setInviaFunction,sShowErr }) => {
  if (gJWTtoken() == ''){
    showPage(1);
    sShowPopupFB(true);
    return;
  }

  useEffect(() => {
    setInviaFunction(modifica_storia);
  }, [modifica_storia]);

  const [story, setStory] = useState('');
  const getStory = (page) => { return story; };

  const [titolo, settitolo] = useState('');
  const gtitolo = (page) => { return titolo; };

  fetch("http://localhost:8000/stories/"+gid(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+gJWTtoken()
    }
  })
  .then(response => {
    const status = response.status;
    return response.json().then(data => ({ status, data }));
  })
  .then(({ status, data }) => {
    if (status !== 200) {
      showPage(7);
    } else {
      settitolo(data.title);
      setStory(data.content);
    }
  })
  .catch(error => {
    showPage(7);
  });

  function modifica_storia() {
    /* ====== Basic Check ====== */
    if (story === '' || titolo === '') {
      sShowErr("Completa tutti i campi prima di proseguire");
      return;
    }

    if (story.length > 1500) {
      sShowErr("La storia non puo avere piu di 1500 caratteri");
      return;
    }
    if (titolo.length > 60) {
      sShowErr("Il titolo non puo avere piu di 60 caratteri");
      return;
    }

    /* ====== Sanitized ====== */
    const sanitizedStory = validator.escape(story);
    const sanitizedTitle = validator.escape(titolo);
    
    /* ====== Send post ====== */
    fetch("http://localhost:8000/stories/edit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+gJWTtoken()
      },
      body: JSON.stringify({
        title: sanitizedTitle,
        content: sanitizedStory,
        author_visible: true
      }),
    })
    .then(response => {
      const status = response.status;
      return response.json().then(data => ({ status, data }));
    })
    .then(({ status, data }) => {
      if (status != 201 ) {
        sShowErr(data.message);
      }else showPage(7);
    })
    .catch(error => {
      sShowErr("Errore interno");
    });
  }
  return (
    <View style={styles.stacca}>
      { Platform.OS === 'web' && <Content_web gtitolo={gtitolo} settitolo={settitolo} showPage={showPage} modifica_storia={modifica_storia} setStory={setStory} getStory={getStory} /> }
      { Platform.OS !== 'web' && <Content_app gtitolo={gtitolo} settitolo={settitolo} getStory={getStory} setStory={setStory} /> }
    </View>
  );
};
export default ModStory;