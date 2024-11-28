from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app, origins=["http://expo-service:8081", "http://localhost:8000"])  # Allow only requests from http://expo-service:8081

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    modify = data.get('modify', '')
    text = data.get('text', '')
    id = data.get('id', 0)
    language = data.get('language', 'it')

    if id == -1:
        # Generate text-to-speech audio
        tts = gTTS(text=text, lang=language)
        tts.save(file_path)
        return send_file(file_path, as_attachment=True)

    file_path = modify="-"+str(id)+".mp3"
    if os.path.exists(file_path):
        # Ritorna diretto
        return send_file(file_path, as_attachment=True)
    
    # Generate text-to-speech audio
    tts = gTTS(text=text, lang=language)
    tts.save(file_path)
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')