const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000; // You can change the port if needed

// Middleware
app.use(cors()); // Enables cross-origin resource sharing
app.use(bodyParser.json()); // Parse JSON requests

// Serve static files (frontend assets)
app.use(express.static(path.join(__dirname, 'public')));

// Mock data storage (In a real application, you'd store this in a database)
let feedbackData = [];

// Route for form submission
app.post('/submit-feedback', (req, res) => {
    const { name, feedback } = req.body;

    // Simple validation
    if (!name || !feedback) {
        return res.status(400).json({ message: 'Please fill out all fields!' });
    }

    // Save feedback (mock storage in an array)
    feedbackData.push({ name, feedback });

    // Process feedback and generate response
    const responseMessage = processFeedback(feedback);

    // Respond with the feedback analysis
    res.status(200).json({ message: 'Thank you for your feedback!', analysis: responseMessage });
});

// Function to process feedback and generate a health assessment
function processFeedback(feedback) {
    // Simple logic to categorize feedback based on specific keywords (mock example)
    if (feedback.toLowerCase().includes('happy') || feedback.toLowerCase().includes('good')) {
        return 'You seem to be doing well mentally! Keep up the good work. :)';
    } else if (feedback.toLowerCase().includes('stress') || feedback.toLowerCase().includes('anxiety')) {
        return 'It sounds like you might be feeling stressed or anxious. Consider talking to a professional for support.';
    } else if (feedback.toLowerCase().includes('sad') || feedback.toLowerCase().includes('depressed')) {
        return 'You may be feeling down. It’s important to reach out to a support system or a mental health expert.';
    } else {
        return 'Thank you for sharing. If you need further assistance, please don’t hesitate to seek professional help.';
    }
}

// Route to get all feedback (Optional)
app.get('/feedbacks', (req, res) => {
    res.json(feedbackData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
