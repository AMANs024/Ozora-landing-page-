// Get DOM elements
const form = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');

// REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzEsLwrIrdVcWCfOHh-IL9WHWkK4LHwKfqpUKggP-v7rWq2FGrNd6jlNFid1fI00mSjrA/exec';

// Form submit handler
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // Validate email
    if (!email) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // Disable form while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    try {
        // Send data to Google Sheets
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });

        // Since we're using no-cors mode, we assume success if no error
        showMessage('Thank you! We will notify you soon! 🎉', 'success');
        emailInput.value = '';
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('Something went wrong. Please try again.', 'error');
    } finally {
        // Re-enable form
        submitBtn.disabled = false;
        submitBtn.textContent = 'Notify Me';
    }
});

// Display message function
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';

    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}