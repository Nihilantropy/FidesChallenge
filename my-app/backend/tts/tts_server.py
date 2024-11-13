from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app, origins=["http://expo-service:8081", "http://localhost:8000"])  # Allow only requests from http://expo-service:8081

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    text = data.get('text', '')
    language = data.get('language', 'it')
    
    # Generate text-to-speech audio
    tts = gTTS(text=text, lang=language)
    tts.save("zz_tts_output.mp3")
    
    return send_file("zz_tts_output.mp3", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
