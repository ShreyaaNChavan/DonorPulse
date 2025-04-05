from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins

# Initialize Gemini API
genai.configure(api_key="AIzaSyCwbDCula-Gg7UecSGj4Jp8wnEPuU8Pg4M")
model = genai.GenerativeModel("gemini-pro")

@app.route('/recommend_diet', methods=['POST'])
def recommend_diet():
    data = request.json
    height = data.get("height")
    weight = data.get("weight")
    gender = data.get("gender")
    blood_group = data.get("blood_group")

    try:
        height_m = height / 100
        bmi = weight / (height_m ** 2)
        bmi = round(bmi, 2)
    except:
        return jsonify({"error": "Invalid height or weight"}), 400

    # Prepare prompt for Gemini
    prompt = f"""
    I need a personalized diet recommendation.

    - Height: {height} cm
    - Weight: {weight} kg
    - Gender: {gender}
    - Blood Group: {blood_group}
    - BMI: {bmi}

    Please give:
    1. BMI category (underweight/normal/overweight/obese)
    2. Personalized diet plan (breakfast, lunch, dinner)
    3. Foods to avoid based on blood group
    4. Mention if the person is eligible for blood donation (assume weight must be 50+ kg)
    """

    response = model.generate_content(prompt)
    return jsonify({
        "bmi": bmi,
        "recommendation": response.text
    })

if __name__ == '__main__':
    app.run(debug=True,port=5001)
