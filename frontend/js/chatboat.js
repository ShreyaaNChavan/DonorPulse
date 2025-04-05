// Toggle chatbot visibility
function toggleChat() {
    let chatbot = document.getElementById("chatbot-container");
    chatbot.style.display = (chatbot.style.display === "block") ? "none" : "block";
}

// Predefined responses for DonorPulse
const responses = [
    { keywords: ["hello", "hi", "hey"], response: "Hello! How can I assist you with DonorPulse today? 🩸" },
    { keywords: ["good morning"], response: "Good morning! How can I help you with DonorPulse? ☀️" },
    { keywords: ["good afternoon"], response: "Good afternoon! Need any help regarding blood donation or our services?" },
    { keywords: ["good evening"], response: "Good evening! How may I assist you with DonorPulse?" },

    { keywords: ["what is donorpulse", "tell me about donorpulse"], response: "DonorPulse is an intelligent blood donation management system offering features like eligibility checks, donor history, and more." },
    { keywords: ["donorpulse"], response: "DonorPulse streamlines blood donation with ML-based predictions, Aadhar integration, and donor tracking features." },

    { keywords: ["feature", "what can donorpulse do", "list features"], response: "DonorPulse offers: eligibility checks, Aadhar-based donor identification, blood volume prediction, diet suggestions, and more!" },

    { keywords: ["accessible", "disabled", "assistive"], response: "Yes! DonorPulse is user-friendly and can be accessed on all devices with screen-reader compatibility." },

    { keywords: ["ai", "machine learning", "how does ai work"], response: "We use ML to predict safe blood donation volumes based on donor health metrics." },

    { keywords: ["who made this", "who developed donorpulse", "who are the creators"], response: "DonorPulse was built by a passionate team to make the donation process smarter, safer, and more efficient." },

    { keywords: ["free", "cost", "pricing"], response: "DonorPulse is a free platform to manage and support blood donation processes." },

    { keywords: ["sign up", "register"], response: "Click on the 'Register' button at the top of the page to create a new donor or admin account." },

    { keywords: ["reset password", "forgot password"], response: "Use the 'Forgot Password' link in the login section to reset your password securely." },

    { keywords: ["mobile", "phone", "responsive"], response: "Yes! DonorPulse is fully responsive and optimized for phones, tablets, and desktops." },

    { keywords: ["who are you"], response: "I'm the DonorPulse assistant bot here to guide you with everything blood donation related! 🧠" },

    { keywords: ["thank you", "thanks"], response: "You're very welcome! Feel free to ask anything else. 😊" },

    { keywords: ["bye", "goodbye"], response: "Goodbye! Wishing you good health and thank you for supporting blood donation! ❤️" }
];

// Function to handle user input
function getBotResponse(input) {
    input = input.toLowerCase();

    for (let i = 0; i < responses.length; i++) {
        for (let j = 0; j < responses[i].keywords.length; j++) {
            if (input.includes(responses[i].keywords[j])) {
                return responses[i].response;
            }
        }
    }
    return "I'm not sure about that. Try rephrasing your question about DonorPulse. 🤔";
}

// Example usage
console.log(getBotResponse("Tell me about DonorPulse"));
console.log(getBotResponse("What features does it have?"));
console.log(getBotResponse("How does AI work in DonorPulse?"));

// Handle user input
function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim().toLowerCase();
    if (!message) return;

    // Display user message
    let chatBody = document.getElementById("chat-body");
    let userMsgDiv = document.createElement("div");
    userMsgDiv.classList.add("user-message");
    userMsgDiv.textContent = message;
    chatBody.appendChild(userMsgDiv);

    // Get bot response
    let response = getBotResponse(message);

    // Display bot response
    let botMsgDiv = document.createElement("div");
    botMsgDiv.classList.add("bot-message");
    botMsgDiv.textContent = response;
    setTimeout(() => {
        chatBody.appendChild(botMsgDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Auto-scroll
    }, 500);

    // Clear input field
    inputField.value = "";
}
