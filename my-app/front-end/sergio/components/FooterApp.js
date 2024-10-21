import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import styles from './../assets/style/main.js';

const Footer1 = ({ showPage }) =>{
  return (
    <View style={styles.footerapp2}>
      <Pressable onPress={() => showPage(1)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVR4nO2YsWsUURDGvxG5fXOJOVNooY2dIkiqBD13ZlEj5D8wlaRKbee/kNbS1ioQCEGwFEFFUAQrG7GxUVQsBLkiBjc8z7us62bvzmz2bWA++ODg7vbN7837ZvcOMI1WhOQckzzx9q9xFBVBrznSz0yaejvSb20kSzhCIge9yyQ7A4iMfzHJGoBjaLYWZhzJZgHAX3YkjzqIZ9FEtXF1jknej4LI+AND57PX4H0+WxuEg95m0t4EEAP3/HeHIJA7TLodAGQpciT3/gMgZ3kAXOb+piSxI/1YGwjj+lkmeXFwiOFUez0Y0dOITzHp40MHcYgTR/KpKojMEPgaQW/2V0mO+wnnJ13do7Uiy45fw6/V3zS5VTFD94Qj3Tg8gH+687CD5GSlCC0kF5j0bV0QvNedd1PQS5VAOMTLTPKjfggduBdBVg6AMAxbKIA0d9TuAxdbEyFM4crp7PhrkJ8zumfGgii6ITXJjvRLhPhGKUQbulr0iNA8y8/siM7mYZpJ18MXqJN2Z2sWi52940Ty6s+b30MXx+P7d62O9OUQxIfIkbxpoXu+AQWm49jX6p/PmORpYU5CF8hjeuTUCl0gG0hOoXearSM5hd5pto7kFHqnuQkdGXnxOtdiA1HrCNvRKpFlhCwjqWWkTJYRsoyklpEyWUbIMpJaRsrEJM+a/8NKiv9dNJlQuXYBEoQZ/yrwqFkAAAAASUVORK5CYII=' }} /></Pressable>
      <Text style={styles.testi}> | </Text>
      <Pressable onPress={() => showPage(2)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADxUlEQVR4nO2dv2sUQRTH35DAzoyJoqKt4j8gGJSY7LyJqKhYB4ylvyrBUhQRtTA2Wlloa5X/IIJKmgS0EzGlhZUSUKOtxMhk75I9vbvcJbc3726/H3iwXC57L+9z83Z2LpkQAQAAAAAAAAAAAAAAAAAAACAVTX5KE9+MHYb4RkJ8mmhy4P8sJwfC18JzYueZhZ8qTIhRbs4oXhUUny3xuWp+ltz58JiAvHLh5sokZNUo/pMQX0rIXQ7HAvKJIaTAF2mJsWFNfFEr97WSz+8seFUr9yVrE2PDFJGu1EqOkIyE/EGj+FfuHflT04kDJIBSCglo4rtVIZrcHRJCAbUKbSEdT8ifqoZW/F6aEEPumFHu1VoQHyVhQkLNampI6Xjb7TQhP6EVf49yoeoTmk2AtOJvmlLf8sm04o/RZg59wmYzUq3chzZOxiuVwr+Q3rKI/KBW/DREOCbhLSvUtCJlpY2TVUySu1fvRSQJsZSOVPO15I6QEBrVKtS0mm9fCiHhI6SEQmQCIcIQI2T9nqCDYWn88HZbVjhHEbn1gJDOL9Al5Ce2e1EP5ygitx4QghEiSgjIgBBhlFiIx32IJCEWd+rNR0h+3WbrkR7q9AjZRenuTuQWztNTLasj00mqfd1O0Klpb7MpeG0dIKQppRWCliVMSLexuKjLEkKY9koTIpPStiypiBGCxUVxQrD8LkwIlt9FCQEZECKMEgvxWH6XJMTiTh1rWdRLLQvL7xkQsglYfscnhnMiWla3sbioyxJCmPZKEyITMRd1IEwIFhfFCcHyuzAhWH4XJQRkQIgwSizEY/ldkhCLO3WMkFYoccuSCYQIo8RCPC7qkoRYXNQxQlqhxC1LJl0WEjd0tv3gvCV3pfYPPf2gJX/VKF7Qyv2InWdphJjamB+idN8OOr4/iBCQT/eEWOJrRrlHsUMrfmIUL+ZGzFut+F2uEItGucex8wwRalaYEFn4QaN4us678qGkneX+pY+FrKGM4je59hD2r1IkmH4XQmEP+PXWRekFEs6WhGjllivf9KmITwC3v8OcW9+obCeN7qn+Ul44rj4enhM7z/oRarq2b+9yO0Kex5+dcLOZS8Ot9XKt7HX8PBuHVvysZSFEZxNN7pZWblbYu2shJ+V+o+yN4ge5H34hft4bEWoaahtqTP2AUTyz8S5zs+HfGw3Tyb0hwrFW/DInYyZ2viXAD2Ujd7OW4GbDc2NnWxImBzTxba14qU5vXspaQr1/GAYKZsRacmcMueshwjHRqEHZAQAAAAAAAAAAAACgwvkLMUFLImKTw/AAAAAASUVORK5CYII=' }} /></Pressable>
    </View>
  )
};

const Footer2 = ({ showPage }) =>{
  return (
    <View style={styles.footerapp2}>
      <Pressable onPress={() => showPage(1)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACDElEQVR4nO2YsWsUURDGvxG5fXOJOVNooY2dIkiqBD13ZlEj5D8wlaRKbee/kNbS1ioQCEGwFEFFUAQrG7GxUVQsBLkiBjc8z7us62bvzmz2bWA++ODg7vbN7837ZvcOMI1WhOQckzzx9q9xFBVBrznSz0yaejvSb20kSzhCIge9yyQ7A4iMfzHJGoBjaLYWZhzJZgHAX3YkjzqIZ9FEtXF1jknej4LI+AND57PX4H0+WxuEg95m0t4EEAP3/HeHIJA7TLodAGQpciT3/gMgZ3kAXOb+piSxI/1YGwjj+lkmeXFwiOFUez0Y0dOITzHp40MHcYgTR/KpKojMEPgaQW/2V0mO+wnnJ13do7Uiy45fw6/V3zS5VTFD94Qj3Tg8gH+687CD5GSlCC0kF5j0bV0QvNedd1PQS5VAOMTLTPKjfggduBdBVg6AMAxbKIA0d9TuAxdbEyFM4crp7PhrkJ8zumfGgii6ITXJjvRLhPhGKUQbulr0iNA8y8/siM7mYZpJ18MXqJN2Z2sWi52940Ty6s+b30MXx+P7d62O9OUQxIfIkbxpoXu+AQWm49jX6p/PmORpYU5CF8hjeuTUCl0gG0hOoXearSM5hd5pto7kFHqnuQkdGXnxOtdiA1HrCNvRKpFlhCwjqWWkTJYRsoyklpEyWUbIMpJaRsrEJM+a/8NKiv9dNJlQuXYBEoQZ/yrwqFkAAAAASUVORK5CYII=' }} /></Pressable>
      <Text style={styles.testi}> | </Text>
      <Pressable onPress={() => showPage(3)}><Image style={styles.foto} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEM0lEQVR4nO1azY9URRD/VVh3ut+MO66AetSjaNTEhCzhVXWiro6KoiYcVLxB5MJHxCvgWTiZkPh3aIhBAoZEDV8iXtyVhZPKwag3FwgaSL2utztxd3ZmZ97MvNlQyUveTPfr7qquqq76VQP3aY3SBKYe9kjf8iRHHfEJTzLrSP72JLf1ie88Y21HPXh7HekkykHBOYQPPPHXnuQ/T3J3dQ//60lOOqQ7gUZlCAxMeQc56EhuNC3qlic+48CHdGfGIU9GiT//gD76rv9pm4Mc9sTfxG/i947kdwf5SIUzEBYS8Oue5PriAvhiAt41iZfqqx2rjvBQgrDbkVxqEsi1BPIq+kfBOZLPmyT4QwX8clGjJwgNR/xjk4COF747CcJjunCb5B+PdC+wYx0Kpx3rPGS/J5nPd7uKFx4tZOgK+Andbtv2mSrC0+gzVZE+40l+sTnndA09DVhDujEf0BFfqCFswICojnTSk3xrWnBdtaIXmzB14u+B6SoGTtNVR3IuV7OubGbRsHlGDzsMiR7Ei+ubtOJ4Ny42M+xB2ESHNjOva1Lv1uFnU37hnMi8U2+Uu9OexwEfyI2/IxVz4I/zc6IIF1sUI0AYcyRXooD5QJvOjYqGCtq5ApnuffIiGQESyGsm5Bsr7ooGb4seohgqkhEAlHtSB3lvhUn5VDQo3lVSRuDBH5qwv2qdT2RhNd/qJgAcFCP1eFDe9sR3ll2nh7xtk54uatJ+MKLkSc5Go5c38H/yxMei7vEhlJ0R8Cc27qdLGi0FVS7fLD8jkmmPI/5imQn5qjZqFld2RqrY+pSNO7uk0ZH8pY1Fx1X9YKSGsMHOkz+Wm1DRjrvApvFOF9evB22pUclxgrXLiBsp1Uo3rqBaa8bY2dwvbx8B9/vOSu7XDkQ5PNIHoo+4rRrQmVEJURKk21oEYzFoVASwrIxMZMFtDBqBzROtJj1pefHuEofxe8w+TrTs5MDvm1u7VN7Eii9HWw7vtkl1+TdLrl4pX6qbbrPd+LVtGUKhfet8uYTgw08Woe/r5AO3gPVC9peFEWcCVrCu46KQ1ifso3kFxzBkShCe88Q3dU2rLmUoPJlLQGFLDIlqWVzFc6bun3UJYvNF82LnhgNih5ojOW9rON91ndGizFmTxgX9jQHRRDz4vrNo41rPBR8r9MzlapZg67MYjE3MGRNXKwiPFzKwSiNXswwVz7DXMIbCKYxF7xQNW9Wpii2PFD2Ja3IAOsmVAquvpKUMl58TC4bdx9q71ieaVC1D7RXG7OYWQ7wtwXvysMMvqFJx1eI2FJyqVx7O2KM5/1kHOaK4k2Zx0W0rBrBpXN+1aKRJUdYnhuIZTpCHHT47sYdyA6JRUVRcAWW7jrHaKxx3NIqNAeBQGFhKCigrFqtZmyP50i7Q/Ll4qUbf+WdNT7VPxG1b5BP3CaNP9wBQ/AKEmpVyLwAAAABJRU5ErkJggg==' }} /></Pressable>
    </View>
  )
};

const FooterApp = ({ showPage, gshowPage }) => {
  return (
    <View style={styles.footerapp}>
      {gshowPage() != 2 && <Footer1 showPage={showPage} />}
      {gshowPage() == 2 && <Footer2 showPage={showPage} />}
    </View>
  );
};
export default FooterApp;