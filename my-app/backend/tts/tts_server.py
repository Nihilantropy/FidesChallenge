from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import os

app = Flask(__name__)
CORS(app, origins=['http://localhost:8000','https://localhost:8000','https://my-self-signed-domain.com','http://my-self-signed-domain.com'])

@app.route('/speak', methods=['POST'])
def speak():
    try:
        data = request.get_json()
        if not data or 'id' not in data or 'modify' not in data or 'text' not in data or 'language' not in data:
            return jsonify({"error": "Prompt non fornito"}), 400

        file_path = data["modify"]+"-"+str(data["id"])+".mp3"
        if data["id"] == -1:
            # Generate text-to-speech audio
            tts = gTTS(text=data["text"], lang=data["language"])
            tts.save(file_path)
            return send_file(file_path, as_attachment=True)

        if os.path.exists(file_path):
            # Ritorna diretto
            return send_file(file_path, as_attachment=True)
        
        # Generate text-to-speech audio
        tts = gTTS(text=data["text"], lang=data["language"])
        tts.save(file_path)
        return send_file(file_path, as_attachment=True)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')