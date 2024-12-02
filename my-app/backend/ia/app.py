from flask import Flask, request, jsonify
from flask_cors import CORS
import cohere

app = Flask(__name__)
CORS(app, origins=['http://localhost:8000','https://localhost:8000','https://my-self-signed-domain.com','http://my-self-signed-domain.com'])

@app.route('/generatestory', methods=['POST'])
def generatestory():
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            return jsonify({"error": "Prompt non fornito"}), 400

        co = cohere.Client('B8tX61HuJFEFFANVAaKzq5EVe5EN1xOrl8iOR7F4')
        response = co.generate(
            model='c4ai-aya-expanse-32b',
            prompt=data["prompt"] + ". Scrivi la storia in italiano, senza parole e temi offensivi, massimo 2000 carattiri. Rispondi solo con la storia e nient'altro.",
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