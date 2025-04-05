import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)  # Allow all origins

# Load blood donation dataset
data = pd.read_excel("dataset/blood_dataset.xls")

# Extract BMI and Blood Volume columns
X = data[['bmi']].values  # Feature
y = data['blood_volume'].values  # Target

# Train Linear Regression model
model = LinearRegression()
model.fit(X, y)

# Function to predict blood volume
def predict_blood_volume(bmi):
    predicted_volume = model.predict([[bmi]])[0]
    return round(predicted_volume, 2)

@app.route('/check-eligibility', methods=['POST'])
def check_eligibility():
    data = request.json
    gender = data.get('gender')
    bmi = float(data.get('bmi'))
    age = int(data.get('age'))

    # Age restriction
    if age < 18:
        return jsonify({"message": "You are underage to donate blood!", "bloodVolume": None})

    # BMI Eligibility Check
    if gender == "Male" and bmi <= 24:
        return jsonify({"message": "You are not eligible to donate blood.", "bloodVolume": None})
    elif gender in ["Female", "Other"] and bmi <= 22:
        return jsonify({"message": "You are not eligible to donate blood.", "bloodVolume": None})

    # Predict blood volume using Linear Regression
    blood_volume = predict_blood_volume(bmi)

    return jsonify({"message": "You are eligible to donate blood!", "bloodVolume": blood_volume})

if __name__ == '__main__':
    app.run(debug=True)
