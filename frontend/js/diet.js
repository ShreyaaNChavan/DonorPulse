function getDiet() {
    const heightInput = document.getElementById("height").value.trim();
    const weightInput = document.getElementById("weight").value.trim();
    const gender = document.getElementById("gender").value.trim().toLowerCase();
    const blood = document.getElementById("blood_group").value.trim();
    const output = document.getElementById("output");
  
    output.innerHTML = ""; // Clear previous output
  
    // Validate inputs
    if (!heightInput || !weightInput || isNaN(heightInput) || isNaN(weightInput)) {
      output.innerHTML = "<span style='color: red;'>Please enter valid numbers for height and weight.</span>";
      return;
    }
  
    const height = parseFloat(heightInput);
    const weight = parseFloat(weightInput);
  
    if (height <= 0 || weight <= 0) {
      output.innerHTML = "<span style='color: red;'>Height and weight must be positive values.</span>";
      return;
    }
  
    // BMI Calculation
    const bmi = weight / ((height / 100) ** 2);
    const bmiRounded = bmi.toFixed(2);
    let recommendation = `<strong>Your BMI:</strong> ${bmiRounded}<br><br>`;
  
    // BMI Interpretation
    if (bmi < 18.5) {
      recommendation += "🔸 <strong>Underweight:</strong> Include more protein (eggs, pulses), dairy, nuts, and healthy carbs (potatoes, rice).<br>";
    } else if (bmi < 25) {
      recommendation += "✅ <strong>Normal weight:</strong> Maintain a balanced diet with veggies, fruits, lean protein, and whole grains.<br>";
    } else if (bmi < 30) {
      recommendation += "⚠️ <strong>Overweight:</strong> Cut down on sugar and fat. Eat more fiber, drink water, and exercise regularly.<br>";
    } else {
      recommendation += "❗ <strong>Obese:</strong> Strictly avoid junk food, prefer small meals, track calories, and consult a dietitian.<br>";
    }
  
    // Gender Tips
    if (gender === "male") {
      recommendation += "🧔 Focus on high-protein foods and healthy fats (avocados, nuts) for muscle and energy.<br>";
    } else if (gender === "female") {
      recommendation += "👩 Add iron-rich foods (spinach, dates) and calcium sources (milk, sesame seeds) for bone and hormonal health.<br>";
    } else {
      recommendation += "⚧️ General advice: Maintain nutrient balance, stay hydrated, and manage stress levels.<br>";
    }
  
    // Blood Group Diet Suggestions
    switch (blood.toUpperCase()) {
      case "O+":
      case "O-":
        recommendation += "🩸 <strong>Blood Type O:</strong> Prefer high-protein foods (meat, fish, leafy greens). Avoid dairy and refined grains.<br>";
        break;
      case "A+":
      case "A-":
        recommendation += "🩸 <strong>Blood Type A:</strong> Best with a plant-based diet. Focus on tofu, fruits, vegetables, and whole grains. Avoid red meat.<br>";
        break;
      case "B+":
      case "B-":
        recommendation += "🩸 <strong>Blood Type B:</strong> Flexible diet. Can include dairy, meat, fruits, and vegetables. Avoid corn and lentils.<br>";
        break;
      case "AB+":
      case "AB-":
        recommendation += "🩸 <strong>Blood Type AB:</strong> Mixed diet of A and B. Include seafood, dairy, and greens. Avoid caffeine and processed meat.<br>";
        break;
      default:
        recommendation += "🩸 General advice: Eat a balanced variety from all food groups.<br>";
    }
  
    output.innerHTML = recommendation;
  }
  