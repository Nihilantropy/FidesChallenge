import React, {  useState, useEffect } from 'react';
import { TextInput,View,Text,Pressable,ScrollView,Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const Content_web = ({ showPage,modifica_storia,setStory,story,gtitolo,settitolo  }) => {
  const [height, setHeight] = useState(300);
  const handleTextChange = (text) => {if (text.length <= 3000) {setStory(text);}};
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
          <Pressable onPress={modifica_storia}><Text style={styles.link}>Racconta</Text></Pressable>
        </View>
        <TextInput spellCheck={false} placeholder="Titolo" style={styles.credenziali} value={gtitolo()} onChangeText={(text) => settitolo(text)}/>
        <TextInput onContentSizeChange={handleContentSizeChange} multiline={true} spellCheck={false} style={[styles.textarea, { minHeight: 200, height: height }]} placeholder="Scrivi qui la tua storia..." value={story} onChangeText={handleTextChange} />
        <Text style={styles.testidestra}>{story.length}/3000</Text>
      </View>
    </ScrollView>
  );
};

const Content_app = ({ setStory,gtitolo,settitolo,story }) =>{
  const [height, setHeight] = useState(200);
  const handleTextChange = (text) => {if (text.length <= 3000) {setStory(text);}};
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

  const [author_visible, setauthor_visible] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const api_url = process.env.EXPO_PUBLIC_URL_STORIES + gid();
      fetch(api_url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+gJWTtoken()
        }
      })
      .then(response => {
        const status = response.status;
        if (status != 200) {
          showPage(7);
        } else {
          return response.json().then(data => {
            settitolo(data.title);
            setStory(data.content);
            setauthor_visible(data.author_visible);
          });
        }
      })
      .catch(error => {
        console.log(error);
        showPage(7);
      });
    }
    fetchData();
  }, []);

  const [abilitato, setabilitato] = useState(true);

  function modifica_storia() {
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
    const api_url = process.env.EXPO_PUBLIC_URL_STORIES + gid();
    fetch(api_url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+gJWTtoken()
      },
      body: JSON.stringify({
        title: titolo,
        content: story,
        author_visible: author_visible
      }),
    })
    .then(response => {
      const status = response.status;
      if (status !== 204) {
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
      { Platform.OS === 'web' && <Content_web gtitolo={gtitolo} settitolo={settitolo} story={story} showPage={showPage} modifica_storia={modifica_storia} setStory={setStory} getStory={getStory} /> }
      { Platform.OS !== 'web' && <Content_app gtitolo={gtitolo} settitolo={settitolo} story={story} setStory={setStory} /> }
    </View>
  );
};
export default ModStory;