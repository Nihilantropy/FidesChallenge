from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
from flask import Flask, request, jsonify

app = Flask(__name__)

# Carica un modello di generazione testi
model_name = "bigscience/bloom-560m"
tokenizer = AutoTokenizer.from_pretrained(model_name)
generator = pipeline("text-generation", model=model_name, tokenizer=tokenizer)

@app.route('/generatestory', methods=['POST'])
def generatestory():
    data = request.get_json()
    prompt = data.get("prompt", "Di che sei stanco")
    generated = generator(prompt, max_length=300, num_return_sequences=1, repetition_penalty=1.2, temperature=0.8)
    story = generated[0]["generated_text"]
    return jsonify({"story": story})

if __name__ == '__main__':
<<<<<<< HEAD
    app.run(debug=True, port=5001, host='0.0.0.0')
=======
    app.run(debug=True, port=5001, host='0.0.0.0')
>>>>>>> origin/fullapp
