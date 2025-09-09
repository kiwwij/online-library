document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        const passwordInput = document.getElementById('password');
        const confirmInput = document.getElementById('confirm-password');
        const passwordError = document.getElementById('password-error');
        const confirmError = document.getElementById('confirm-error');

        function validatePassword(password) {
            // Мінімум 6 символів, англ букви, цифри та спецсимволи
            const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
            return regex.test(password);
        }

        passwordInput.addEventListener('input', () => {
            if (!validatePassword(passwordInput.value)) {
                passwordError.style.display = 'block';
            } else {
                passwordError.style.display = 'none';
            }
        });

        confirmInput.addEventListener('input', () => {
            if (confirmInput.value !== passwordInput.value) {
                confirmError.style.display = 'block';
            } else {
                confirmError.style.display = 'none';
            }
        });

        registerForm.addEventListener('submit', (e) => {
            if (!validatePassword(passwordInput.value) || passwordInput.value !== confirmInput.value) {
                e.preventDefault();
                alert('Будь ласка, виправте помилки у паролі.');
            } else {
                e.preventDefault(); // Якщо без бекенду, блокируем обычную отправку
                window.location.href = "index.html"; // Переход на головну
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        const emailInput = loginForm.querySelector('input[type="email"]');
        const passwordInput = loginForm.querySelector('input[type="password"]');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Блокуємо стандартну відправку

            if (!emailInput.value || !passwordInput.value) {
                alert('Будь ласка, введіть Email та пароль.');
            } else {
                // Перевірка пройдена — переходимо на головну
                window.location.href = "index.html";
            }
        });
    }
});