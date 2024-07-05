function generateCaptcha() {
    var captchaType = document.getElementById('captchaSelect').value;
    var captcha = '';

    if (captchaType === 'alphanumeric') {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        document.getElementById('captchaCode').innerText = captcha;
    } else if (captchaType === 'numeric') {
        for (var i = 0; i < 6; i++) {
            captcha += Math.floor(Math.random() * 10);
        }
        document.getElementById('captchaCode').innerText = captcha;
    } else if (captchaType === 'image') {
        var canvas = document.getElementById('captchaCanvas');
        var context = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;
        
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = 0; i < 6; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        // Draw background
        context.fillStyle = '#f0f0f0';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw text
        context.font = '30px Arial';
        context.fillStyle = '#000';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillText(captcha, canvas.width / 2, canvas.height / 2);
        
        // Add some noise
        for (var i = 0; i < 25; i++) {
            context.fillStyle = getRandomColor();
            context.beginPath();
            context.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, Math.PI * 2);
            context.fill();
        }
        
        document.getElementById('captchaCode').dataset.captcha = captcha;
        document.getElementById('captchaCode').innerHTML = '';
        canvas.style.display = 'block';
    } else {
        document.getElementById('captchaCode').innerHTML = captcha;
    }
}

function validateCaptcha() {
    var userCode = document.getElementById('userCode').value;
    var captchaCode = document.getElementById('captchaCode').dataset.captcha || document.getElementById('captchaCode').innerText;

    if (userCode === captchaCode) {
        alert('Captcha validation successful!');
        // Further actions after successful validation
    } else {
        alert('Incorrect Captcha code. Please try again.');
        // Actions on validation failure
    }
}

function changeCaptchaType() {
    var captchaType = document.getElementById('captchaSelect').value;
    var canvas = document.getElementById('captchaCanvas');
    
    if (captchaType === 'image') {
        canvas.style.display = 'block';
        document.getElementById('captchaCode').innerHTML = '';
    } else {
        canvas.style.display = 'none';
    }
    generateCaptcha();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function moveTitle() {
    const title = document.getElementById('title');
    let direction = 1;
    let position = 0;

    function move() {
        if (position > 10 || position < 0) direction *= -1;
        position += direction;
        title.style.transform = `translateY(${position}px)`;
        requestAnimationFrame(move);
    }

    move();
}

window.onload = function() {
    generateCaptcha();
    moveTitle();
};
