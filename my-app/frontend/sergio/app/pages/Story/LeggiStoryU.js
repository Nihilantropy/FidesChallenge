import React, {useState,useEffect} from 'react';
import { View, Text, Pressable, ScrollView, Image, Platform } from 'react-native';
import styles from './../../assets/style/main.js';

const LeggiStoryU = ({ showPage,gid,sShowErr }) => {
    const [storia, setStoria] = useState('');
    useEffect(() => {
        async function get_story(){
            const api_url = process.env.EXPO_PUBLIC_URL_STORIES+gid();
            fetch(api_url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                const status = response.status;
                return response.json().then(data => ({ status, data }));
            })
            .then(({ status, data }) => {
                if (status !== 200) {
                    showPage(2);
                    sShowErr("Scusami sono stanco 🥱");
                } else {
                    setStoria(data);
                }
            })
            .catch(error => {
                showPage(2);
                sShowErr("Scusami sono stanco 🥱");
            });
        }
        get_story();
    }, [showPage, sShowErr]);

    // Funzioni per audio
    const { setupPlayer, playAudio, pauseAudio, setPlaybackRate } = Platform.OS === 'web' ? require('./../../libreri/Suond/Web') : require('./../../libreri/Suond/Mobile');
    const [statorip, setStato] = useState('unset');
    async function speakText(text,id,mod) {
        try {
            const api_url = process.env.EXPO_PUBLIC_URL_TTS + "speak";
            const response = await fetch(api_url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                text: text,
                modify: mod,
                language: 'it',
                id: id
                })
            });
            if (!response.ok){throw new Error(response.statusText);}
            await setupPlayer(await response.blob(), setStato);
            setStato('play');
            playAudio();
        } catch (error) {
            console.log(error);
            sShowErr("Errore nella lettura");
            setStato('unset');
        }
    }
    const [Velocita, setVelocita] = useState('x1');

    return (
        <View style={styles.stacca}>
            <ScrollView>
                <View style={[styles.box]}>
                    <View style={[styles.rowpuro, {alignSelf: 'flex-start'}]}><Pressable onPress={() => showPage(2)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVR4nO2YsWsUURDGvxG5fXOJOVNooY2dIkiqBD13ZlEj5D8wlaRKbee/kNbS1ioQCEGwFEFFUAQrG7GxUVQsBLkiBjc8z7us62bvzmz2bWA++ODg7vbN7837ZvcOMI1WhOQckzzx9q9xFBVBrznSz0yaejvSb20kSzhCIge9yyQ7A4iMfzHJGoBjaLYWZhzJZgHAX3YkjzqIZ9FEtXF1jknej4LI+AND57PX4H0+WxuEg95m0t4EEAP3/HeHIJA7TLodAGQpciT3/gMgZ3kAXOb+piSxI/1YGwjj+lkmeXFwiOFUez0Y0dOITzHp40MHcYgTR/KpKojMEPgaQW/2V0mO+wnnJ13do7Uiy45fw6/V3zS5VTFD94Qj3Tg8gH+687CD5GSlCC0kF5j0bV0QvNedd1PQS5VAOMTLTPKjfggduBdBVg6AMAxbKIA0d9TuAxdbEyFM4crp7PhrkJ8zumfGgii6ITXJjvRLhPhGKUQbulr0iNA8y8/siM7mYZpJ18MXqJN2Z2sWi52940Ty6s+b30MXx+P7d62O9OUQxIfIkbxpoXu+AQWm49jX6p/PmORpYU5CF8hjeuTUCl0gG0hOoXearSM5hd5pto7kFHqnuQkdGXnxOtdiA1HrCNvRKpFlhCwjqWWkTJYRsoyklpEyWUbIMpJaRsrEJM+a/8NKiv9dNJlQuXYBEoQZ/yrwqFkAAAAASUVORK5CYII=' }} /></Pressable></View>
                    <Pressable><Text style={styles.titoli}>{storia.title}</Text></Pressable>
                    <Text>{"\n"}</Text>
                    <Text style={styles.testi}>{storia.content}</Text>
                    <Text>{"\n"}{"\n"}</Text>
                    <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
                        {statorip == 'unset' && (<Pressable style={styles.testi} onPress={() => speakText(storia.content,storia.id,storia.updated_at)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
                        {statorip == 'play' && (
                            <View style={[styles.rowpuro, {justifyContent: 'space-between',alignSelf: 'flex-start'}]}>
                                <Pressable style={styles.testi} onPress={() => {pauseAudio(),setStato('pause')}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nO3SoRHAMAwEQRmmqfTflUO+AIN30O6MoIBGNwMAP3rWu0/m1n6NQ8JH2qQV0mqTVkirTVohrTZphbTapBXSapNWSKtNWiGtNmmFtNqkFdJqk1ZICwDmng90pWTGMlhjngAAAABJRU5ErkJggg==' }} /></Pressable>
                                {Velocita == 'x1' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(1.5),setVelocita('x1.5')}}><Text style={styles.testi}>x1</Text></Pressable>)}
                                {Velocita == 'x1.5' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(2),setVelocita('x2')}}><Text style={styles.testi}>x1.5</Text></Pressable>)}
                                {Velocita == 'x2' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(0.5),setVelocita('x0.5')}}><Text style={styles.testi}>x2</Text></Pressable>)}
                                {Velocita == 'x0.5' && (<Pressable style={styles.testi} onPress={() => {setPlaybackRate(1),setVelocita('x1')}}><Text style={styles.testi}>x0.5</Text></Pressable>)}
                            </View>
                        )}
                        {statorip == 'pause' && (<Pressable style={styles.testi} onPress={() => {playAudio(),setStato('play')}}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZoU4EQQyG/4bAtXA4LAaJwOBg27MEj+UVEPAAvAISi8TyAvcC8ABoLA6zIdyQsEcODTOz26VfUrvJl91O/+kCQRAEP2HoFbC/Ae8IWRLS503YKfyL2Fcx2cMEzR68i0hXLZPeAEfbcC6SurejLww7B0DwLCKrmm+hOcAIRJKQfQjp3RSzHTgXScvD4FVgF8DZGjyLyKp/nhjNMbyLSFcLIb1n6C6ci6TlMH0T6DVwMnEuYmkQ6UCyifScDiSzSG/pQMqI1E8HUlCkajqQOiJJSN+Z9LZYOqgnYmXTQW0RKZUO+hKR3OkgROjPvfLo+tNi/82uozh+564H4hgiStuFxtm0uMA3BZrZe4xX7xcrdX/VXbhfPnDuqZyDf7ag07JTuZKI7yU2j+C3Qlt9KudgEFM5B4OYyjlg2CVwuJ7lYUEQBPglnzPzXbO9BvL7AAAAAElFTkSuQmCC' }} /></Pressable>)}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
export default LeggiStoryU;