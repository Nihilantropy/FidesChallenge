import React, {useState,useEffect} from 'react';
import { View, Text, Pressable, ScrollView, Image, Platform } from 'react-native';
import SuondCtl from './../../libreri/Suond/SuondCtl.js';
import styles from './../../assets/style/main.js';

const LeggiStoryU = ({ showPage,gid,sShowErr }) => {
    const [storia, setStoria] = useState('');

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

    useEffect(() => {
        get_story();
    }, [showPage, sShowErr]);

    return (
        <View style={styles.stacca}>
            <ScrollView>
                <View style={[styles.box]}>
                    <View style={[styles.rowpuro, {alignSelf: 'flex-start'}]}><Pressable onPress={() => showPage(2)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVR4nO2YsWsUURDGvxG5fXOJOVNooY2dIkiqBD13ZlEj5D8wlaRKbee/kNbS1ioQCEGwFEFFUAQrG7GxUVQsBLkiBjc8z7us62bvzmz2bWA++ODg7vbN7837ZvcOMI1WhOQckzzx9q9xFBVBrznSz0yaejvSb20kSzhCIge9yyQ7A4iMfzHJGoBjaLYWZhzJZgHAX3YkjzqIZ9FEtXF1jknej4LI+AND57PX4H0+WxuEg95m0t4EEAP3/HeHIJA7TLodAGQpciT3/gMgZ3kAXOb+piSxI/1YGwjj+lkmeXFwiOFUez0Y0dOITzHp40MHcYgTR/KpKojMEPgaQW/2V0mO+wnnJ13do7Uiy45fw6/V3zS5VTFD94Qj3Tg8gH+687CD5GSlCC0kF5j0bV0QvNedd1PQS5VAOMTLTPKjfggduBdBVg6AMAxbKIA0d9TuAxdbEyFM4crp7PhrkJ8zumfGgii6ITXJjvRLhPhGKUQbulr0iNA8y8/siM7mYZpJ18MXqJN2Z2sWi52940Ty6s+b30MXx+P7d62O9OUQxIfIkbxpoXu+AQWm49jX6p/PmORpYU5CF8hjeuTUCl0gG0hOoXearSM5hd5pto7kFHqnuQkdGXnxOtdiA1HrCNvRKpFlhCwjqWWkTJYRsoyklpEyWUbIMpJaRsrEJM+a/8NKiv9dNJlQuXYBEoQZ/yrwqFkAAAAASUVORK5CYII=' }} /></Pressable></View>
                    <Pressable><Text style={styles.titoli}>{storia.title}</Text></Pressable>
                    <Text>{"\n"}</Text>
                    <Text style={styles.testi}>{storia.content}</Text>
                    <Text>{"\n"}</Text>
                    <SuondCtl sShowErr={sShowErr} inventa={false} storie={false} testo={storia.content} id={storia.id} modificato={storia.updated_at} />
                </View>
            </ScrollView>
        </View>
    );
};
export default LeggiStoryU;