import React, {  useState, useEffect } from 'react';
import { TextInput,View,Text,Pressable,ScrollView,Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const Content_web = ({ showPage,crea_storia,setStory,getStory,gtitolo,settitolo  }) => {
  const [story, setStoryText] = useState(getStory());
  const [height, setHeight] = useState(300);
  const handleTextChange = (text) => {
    if (text.length <= 3000) {
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
          <Pressable onPress={crea_storia}><Text style={styles.link}>Racconta</Text></Pressable>
        </View>
        <TextInput spellCheck={false} placeholder="Titolo" style={styles.credenziali} value={gtitolo()} onChangeText={(text) => settitolo(text)}/>
        <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 200, height: height }]} placeholder="Scrivi qui la tua storia..." value={story} onChangeText={handleTextChange} />
        <Text style={styles.testidestra}>{story.length}/3000</Text>
      </View>
    </ScrollView>
  );
};

const Content_app = ({ getStory,setStory,gtitolo,settitolo }) =>{
  const [story, setStoryText] = useState(getStory());
  const [height, setHeight] = useState(200);
  const handleTextChange = (text) => {
    if (text.length <= 3000) {
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
        <Text style={styles.testidestra}>{story.length}/3000</Text>
      </View>
    </ScrollView>
  )
};

const NewStory = ({ showPage,gJWTtoken,sShowPopupFB,setInviaFunction,sShowErr }) => {
  useEffect(() => {
    if (gJWTtoken() == ''){
      showPage(2);
      sShowPopupFB(true);
    }
  }, [gJWTtoken, showPage, sShowPopupFB]);

  useEffect(() => {
    setInviaFunction(crea_storia);
  }, [crea_storia]);

  const [story, setStory] = useState('');
  const getStory = (page) => { return story; };

  const [titolo, settitolo] = useState('');
  const gtitolo = (page) => { return titolo; };
  
  const [abilitato, setabilitato] = useState(true);

  function crea_storia() {
    if(abilitato==false)
      return;
    setabilitato(false);

    /* ====== Basic Check ====== */
    if (story === '' || titolo === '') {
      sShowErr("Completa tutti i campi prima di proseguire");
      return;
    }

    if (story.length > 3000) {
      sShowErr("La storia non puo avere piu di 3000 caratteri");
      return;
    }
    if (titolo.length > 60) {
      sShowErr("Il titolo non puo avere piu di 60 caratteri");
      return;
    }


    /* ====== Send post ====== */
    const api_url = process.env.EXPO_PUBLIC_URL_STORIES;
    fetch(api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + gJWTtoken()
      },
      body: JSON.stringify({
        title: titolo,
        content: story,
        author_visible: 'true'
      }),
    })
    .then(response => {
      const status = response.status;
      if (status !== 201) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return response.json().then(data => {
            sShowErr(data.message);
          });
        } else {
          return response.text().then(message => {
            sShowErr(message || "Errore sconosciuto");
          });
        }
      } else {
        showPage(7);
      }
   })
   .catch(error => {
      console.log(error);
      sShowErr("Errore interno");
   });
   
  }
  return (
    <View style={styles.stacca}>
      { Platform.OS === 'web' && <Content_web gtitolo={gtitolo} settitolo={settitolo} showPage={showPage} crea_storia={crea_storia} setStory={setStory} getStory={getStory} /> }
      { Platform.OS !== 'web' && <Content_app gtitolo={gtitolo} settitolo={settitolo} getStory={getStory} setStory={setStory} /> }
    </View>
  );
};
export default NewStory;