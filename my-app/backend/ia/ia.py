from flask import Flask, request, jsonify
from transformers import AutoModelForCausalLM, AutoTokenizer
from flask_cors import CORS
import torch

app = Flask(__name__)
CORS(app)

@app.route("/generatestory", methods=["POST"])
def generate_story():
    data = request.json
    prompt = data.get("prompt", "")
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(**inputs, max_length=1400, num_return_sequences=1)
    story = tokenizer.decode(outputs[0], skip_special_tokens=True)    
    return jsonify({"story": story})

if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')