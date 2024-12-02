from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app, origins=['http://localhost','https://localhost','https://my-self-signed-domain.com','http://my-self-signed-domain.com', 'http://frontend-expo.default.svc.cluster.local:8081', 'http://backend-stories'])  # Allow only requests from http://expo-service:8081

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    modify = data.get('modify', '')
    text = data.get('text', '')
    id = data.get('id', 0)
    language = data.get('language', 'it')

    file_path = modify+"-"+str(id)+".mp3"
    if id == -1:
        # Generate text-to-speech audio
        tts = gTTS(text=text, lang=language)
        tts.save(file_path)
        return send_file(file_path, as_attachment=True)

    if os.path.exists(file_path):
        # Ritorna diretto
        return send_file(file_path, as_attachment=True)
    
    # Generate text-to-speech audio
    tts = gTTS(text=text, lang=language)
    tts.save(file_path)
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')