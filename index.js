// auth.js
document.addEventListener('DOMContentLoaded', () => {
    let isLogin = true;
    
    // Auth Modal Functions
    function showAuthModal(type) {
        isLogin = type === 'login';
        toggleForm();
        const modal = document.getElementById('authModal');
        const formContainer = document.querySelector('.auth-form-container');
        modal.style.display = 'flex';
        setTimeout(() => {
            formContainer.classList.add('active');
        }, 10);
    }

    function hideAuthModal() {
        const modal = document.getElementById('authModal');
        const formContainer = document.querySelector('.auth-form-container');
        formContainer.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    function toggleForm() {
        document.getElementById('formTitle').textContent = isLogin ? 'Login' : 'Sign Up';
        document.getElementById('toggleText').textContent = isLogin 
            ? "Don't have an account? Sign Up" 
            : "Already have an account? Login";
        document.getElementById('nameField').style.display = isLogin ? 'none' : 'block';
        document.querySelector('#authForm button').textContent = isLogin ? 'Login' : 'Sign Up';
    }

    // Form Submission Handler
    async function handleAuthSubmit(e) {
        e.preventDefault();
        const formData = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name')?.value
        };

        const endpoint = isLogin ? 'login.php' : 'signup.php';
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            if (result.success) {
                alert(isLogin ? 'Login successful!' : 'Registration successful!');
                hideAuthModal();
                // Add any post-login redirect or UI update here
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Google Sign-In Handler
    function handleGoogleSignIn() {
        google.accounts.id.initialize({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
            callback: handleCredentialResponse
        });
        google.accounts.id.prompt();
    }

    async function handleCredentialResponse(response) {
        try {
            const res = await fetch('google_login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credential: response.credential })
            });
            
            const result = await res.json();
            if (result.success) {
                alert('Google login successful!');
                hideAuthModal();
                // Add any post-login redirect or UI update here
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Event Listeners
    document.querySelector('.form-toggle').addEventListener('click', () => {
        isLogin = !isLogin;
        toggleForm();
    });

    // Expose functions to global scope
    window.showAuthModal = showAuthModal;
    window.hideAuthModal = hideAuthModal;
    window.handleAuthSubmit = handleAuthSubmit;
    window.handleGoogleSignIn = handleGoogleSignIn;
});
