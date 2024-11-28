from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere

app = Flask(__name__)
CORS(app, origins=["http://expo-service:8081", "http://localhost:8000"])  # Allow only requests from http://expo-service:8081

@app.route('/generatestory', methods=['POST'])
def generatestory():
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "Prompt non fornito"}), 400

        co = cohere.Client('B8tX61HuJFEFFANVAaKzq5EVe5EN1xOrl8iOR7F4')
        response = co.generate(
            model='c4ai-aya-expanse-32b',
            prompt=data["prompt"]+" perfavare in italiano e di massimo 2000 carattiri. rispondemi con solo la storia e null'altro",
            max_tokens=3000,
            temperature=1,
            k=0,
            stop_sequences=[],
            return_likelihoods='NONE'
        )
        story=response.generations[0].text
        return jsonify({"story": story})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')

# https://cohere.com/