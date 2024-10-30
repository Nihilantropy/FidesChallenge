# pip install gtts flask |install
# python tts_server.py |start
from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app)

@app.route('/speak', methods=['POST'])
def speak():
    data = request.get_json()
    text = data.get('text', '')
    language = data.get('language', 'it')
    tts = gTTS(text=text, lang=language)
    tts.save("zz_tts_output.mp3")
    return send_file("zz_tts_output.mp3", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
