from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Carica un modello di generazione testi
generator = pipeline("text-generation", model="gpt2")

@app.route('/generatestory', methods=['POST'])
def generatestory():
    data = request.get_json()
    prompt = data.get("prompt", "Di che sei stanco")

    generated = generator(prompt, max_length=1500, num_return_sequences=1)
    story = generated[0]["generated_text"]

    return jsonify({"story": story})

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
