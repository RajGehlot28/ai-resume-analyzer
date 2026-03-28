import { CONFIG } from './config.js';

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Registration Logic
if(registerForm) {
    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await fetch(`${CONFIG.API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if(res.ok) {
            if(data.token) {
                localStorage.setItem("token", data.token);
            }
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || "Registration failed");
        }
    };
}

// Login Logic
if(loginForm) {
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${CONFIG.API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value })
        });
        const data = await res.json();
        if(data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else { 
            alert(data.message); 
        }
    };
}