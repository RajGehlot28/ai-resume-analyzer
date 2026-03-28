import { CONFIG } from './config.js';
document.getElementById('uploadForm').onsubmit = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('analyzeBtn');
    btn.innerText = "Analyzing..."; btn.disabled = true;

    const formData = new FormData();
    formData.append("resume", resumeFile.files[0]);
    formData.append("jobDescription", jobDescription.value);

    const res = await fetch(`${CONFIG.API_URL}/resume/analyze`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
    });
    
    const data = await res.json();
    if(data.success) {
        sessionStorage.setItem('lastAnalysis', JSON.stringify(data.data));
        window.location.href = 'result.html';
    }
    btn.innerText = "Analyze Now"; btn.disabled = false;
};