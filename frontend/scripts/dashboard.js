import { CONFIG } from './config.js';
const list = document.getElementById('historyList');

document.getElementById('logoutBtn').onclick = () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
};

const load = async() => {
    const res = await fetch(`${CONFIG.API_URL}/resume/history`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const data = await res.json();
    if(data.success) {
        list.innerHTML = data.data.map(item => `
            <div class="history-card" onclick='sessionStorage.setItem("lastAnalysis", JSON.stringify(${JSON.stringify(item.result)})); window.location.href="result.html"'>
                <strong>${item.resumeName}</strong>
                <span>Score: ${item.result.score}</span>
            </div>
        `).join('');
    }
};
load();