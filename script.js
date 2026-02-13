// Состояние приложения
let currentScreen = 'boot';

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    initBootScreen();
    
    // Начинаем с экрана загрузки
    showScreen('boot');
});

// Управление экранами
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(screenName + 'Screen');
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;
    }
}

// Функция печати текста с курсором
function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        element.textContent = '';
        element.classList.add('typing');
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            } else {
                // Текст напечатан, курсор остается
                resolve();
            }
        }
        
        type();
    });
}

// Функция для стирания текста посимвольно (обратный эффект)
function eraseText(element, text, speed) {
    return new Promise((resolve) => {
        let i = text.length;
        
        function erase() {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                element.classList.add('typing'); // Курсор остается
                i--;
                setTimeout(erase, speed);
            } else {
                // Текст полностью стерт
                element.textContent = '';
                element.classList.remove('typing');
                resolve();
            }
        }
        
        erase();
    });
}

// Функция для последовательности текстов
async function showLoadingSequence() {
    const loadingText = document.getElementById('loadingText');
    if (!loadingText) return;
    
    const texts = [
        { text: 'Не поняла...', stayTime: 2000, fadeTime: 2500 },
        { text: 'До осознания...', stayTime: 2000, fadeTime: 2500 },
        { text: '3', stayTime: 1000, fadeTime: 1500 },
        { text: '2', stayTime: 1000, fadeTime: 1500 },
        { text: '1', stayTime: 1000, fadeTime: 1500 }
    ];
    
    for (let i = 0; i < texts.length; i++) {
        const { text, stayTime, fadeTime } = texts[i];
        
        // Печатаем текст с эффектом печатания (50ms на символ)
        await typeText(loadingText, text, 50);
        
        // Текст остается на экране с курсором
        if (stayTime > 0) {
            await new Promise(resolve => setTimeout(resolve, stayTime));
        }
        
        // Стираем текст посимвольно в обратном порядке
        await eraseText(loadingText, text, 50);
        
        // Небольшая пауза перед следующим текстом
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Показываем спиннер загрузки (точки)
    const loadingSpinner = document.getElementById('loadingSpinner');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'block';
        
        // После показа точек ждем немного и показываем рабочий стол
        setTimeout(() => {
            showDesktop();
        }, 2000); // Показываем точки 2 секунды
    }
}

// Функция показа рабочего стола
function showDesktop() {
    const wallpaper = document.getElementById('desktopWallpaper');
    const loadingScreen = document.getElementById('loadingScreen');
    const blackLayer = document.getElementById('blackLayer');
    const explosionLayer = document.getElementById('explosionLayer');
    
    if (!wallpaper || !loadingScreen) {
        console.error('Wallpaper or loadingScreen not found!');
        return;
    }
    
    console.log('showDesktop called');
    
    // Плавно скрываем loading screen
    loadingScreen.style.transition = 'opacity 0.8s ease';
    loadingScreen.style.opacity = '0';
    
    // Скрываем черный слой и слой взрыва
    if (blackLayer) {
        blackLayer.style.transition = 'opacity 0.8s ease';
        blackLayer.style.opacity = '0';
    }
    if (explosionLayer) {
        explosionLayer.style.transition = 'opacity 0.8s ease';
        explosionLayer.style.opacity = '0';
    }
    
    // После fade-out показываем обои и убираем loading
    setTimeout(() => {
        wallpaper.style.opacity = '1';
        wallpaper.classList.add('active');
        
        // Показываем логотип Windows XP
        const windowsLogo = document.getElementById('windowsLogo');
        if (windowsLogo) {
            windowsLogo.classList.add('active');
        }
        
        loadingScreen.remove();
        if (blackLayer) blackLayer.remove();
        if (explosionLayer) explosionLayer.remove();
        document.body.classList.remove('explosion-active');
        console.log('Desktop shown');
        
        // Инициализируем taskbar (часы и дата)
        initTaskbar();
        
        // Запускаем вирусный эффект окон
        setTimeout(() => {
            startVirusEffect();
        }, 800);
    }, 800);
}

// Инициализация taskbar
function initTaskbar() {
    updateTaskbarTime();
    // Обновляем время каждую минуту
    setInterval(updateTaskbarTime, 60000);
}

// Обновление времени и даты в taskbar
function updateTaskbarTime() {
    const timeElement = document.getElementById('taskbarTime');
    const dateElement = document.getElementById('taskbarDate');
    
    if (!timeElement || !dateElement) return;
    
    const now = new Date();
    
    // Форматируем время (ЧЧ:ММ)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
    
    // Форматируем дату (ДД.ММ.ГГГГ)
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    dateElement.textContent = `${day}.${month}.${year}`;
}

// Virus Windows Effect
function startVirusEffect() {
    const container = document.getElementById('virusContainer');
    if (!container) return;
    
    // Активируем контейнер для взаимодействий
    container.classList.add('active');
    
    // Количество окон (8-12)
    const windowCount = 10;
    
    for (let i = 0; i < windowCount; i++) {
        setTimeout(() => {
            const isFinal = i === windowCount - 1;
            const win = createVirusWindow(isFinal);
            container.appendChild(win);
        }, i * 120); // Задержка между окнами 120ms
    }
}

function createVirusWindow(isFinal) {
    const win = document.createElement('div');
    win.className = 'virus-window';
    
    // Проверяем, мобильное ли устройство
    const isMobile = window.innerWidth <= 768;
    
    if (isFinal) {
        win.classList.add('final');
    } else {
        if (isMobile) {
            // На мобильных центрируем окна
            win.style.top = '50%';
            win.style.left = '50%';
            win.style.transform = 'translate(-50%, -50%)';
        } else {
            // Случайная позиция для обычных окон на десктопе
            const maxTop = Math.max(0, window.innerHeight - 200);
            const maxLeft = Math.max(0, window.innerWidth - 350);
            win.style.top = Math.max(0, Math.random() * maxTop) + 'px';
            win.style.left = Math.max(0, Math.random() * maxLeft) + 'px';
        }
    }
    
    // Случайные заголовки для обычных окон
    const titles = [
        'System Error',
        'Critical Warning',
        'Virus Detected',
        'Security Alert',
        'System Failure',
        'Error 404',
        'Access Denied',
        'File Corrupted',
        'Memory Error'
    ];
    
    const messages = [
        'Critical love virus detected!',
        'System infected with affection.exe',
        'Warning: Love.exe is running',
        'Your heart is at risk!',
        'Romantic malware found!',
        'Cupid.exe has been activated',
        'Love virus spreading rapidly!',
        'Affection.dll loaded successfully',
        'Heart.exe is now running'
    ];
    
    const title = isFinal ? 'System Warning' : titles[Math.floor(Math.random() * titles.length)];
    const message = isFinal ? 'Ты будешь моей валентинкой?' : messages[Math.floor(Math.random() * messages.length)];
    
    win.innerHTML = `
        <div class="virus-title">
            <span class="virus-title-text">${title}</span>
            ${isFinal ? '<button class="virus-close">×</button>' : '<span class="virus-close-disabled">×</span>'}
        </div>
        <div class="virus-content">
            ${message}
        </div>
        <div class="virus-buttons">
            <button class="yes-btn ${isFinal ? '' : 'disabled'}">Да</button>
            <button class="no-btn ${isFinal ? '' : 'disabled'}">Нет</button>
        </div>
    `;
    
    // Обработчик закрытия окна - только для финального
    if (isFinal) {
        const closeBtn = win.querySelector('.virus-close');
        closeBtn.addEventListener('click', () => {
            // На финальном окне закрытие не работает - только через "Да"
            // Но можно оставить визуальную анимацию
            closeBtn.style.opacity = '0.5';
            setTimeout(() => {
                closeBtn.style.opacity = '1';
            }, 200);
        });
    }
    
    // Обработчик кнопки "Да" - только для финального окна
    if (isFinal) {
        const yesBtn = win.querySelector('.yes-btn');
        yesBtn.addEventListener('click', () => {
            // TODO: Показать анимацию сердец
            console.log('YES clicked on final window!');
            // Закрываем все окна
            closeAllVirusWindows();
        });
    } else {
        // Для обычных окон - только визуальная анимация
        const yesBtn = win.querySelector('.yes-btn');
        yesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Визуальная анимация нажатия
            yesBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                yesBtn.style.transform = 'scale(1)';
            }, 150);
        });
        
        const noBtn = win.querySelector('.no-btn');
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Визуальная анимация нажатия
            noBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                noBtn.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    // Обработчик кнопки "Нет" - только для финального окна
    if (isFinal) {
        const noBtn = win.querySelector('.no-btn');
        makeNoButtonEscape(noBtn);
    }
    
    return win;
}

function makeNoButtonEscape(button) {
    let escapeCount = 0;
    
    // Убираем все hover события
    button.removeEventListener('mouseenter', () => {});
    button.removeEventListener('mouseover', () => {});
    
    // Устанавливаем стили для позиционирования
    button.style.position = 'absolute';
    button.style.transition = '0.2s ease';
    
    // Обработчик только через click
    button.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        
        if (escapeCount < 5) {
            // Перемещаем кнопку в случайную позицию на весь экран
            const x = Math.random() * (window.innerWidth - button.offsetWidth);
            const y = Math.random() * (window.innerHeight - button.offsetHeight);
            
            button.style.left = x + 'px';
            button.style.top = y + 'px';
            
            escapeCount++;
            // НЕ выполняем основное действие
        } else {
            // После 5 попыток выполняем основное действие - закрываем все вирусные окна
            closeAllVirusWindows();
        }
    });
}

function closeAllVirusWindows() {
    const container = document.getElementById('virusContainer');
    if (!container) return;
    
    const windows = container.querySelectorAll('.virus-window');
    windows.forEach((win, index) => {
        setTimeout(() => {
            win.style.animation = 'popIn 0.2s ease-out reverse';
            setTimeout(() => {
                win.remove();
            }, 200);
        }, index * 50);
    });
    
    // Деактивируем контейнер после закрытия всех окон
    setTimeout(() => {
        container.classList.remove('active');
        // Показываем иконки рабочего стола после закрытия вирусов
        showDesktopIcons();
    }, windows.length * 50 + 300);
}

// Desktop Icons Functions
function showDesktopIcons() {
    const desktopIcons = document.getElementById('desktopIcons');
    if (!desktopIcons) {
        console.error('Desktop icons container not found!');
        return;
    }
    
    console.log('Showing desktop icons');
    
    // Показываем иконки с анимацией
    desktopIcons.classList.add('visible');
    
    // Инициализируем обработчики после небольшой задержки
    setTimeout(() => {
        initDesktopIcons();
    }, 100);
}

function initDesktopIcons() {
    const icons = document.querySelectorAll('.desktop-icon');
    
    if (icons.length === 0) {
        console.error('No desktop icons found!');
        return;
    }
    
    console.log(`Found ${icons.length} desktop icons`);
    
    icons.forEach((icon, index) => {
        const type = icon.getAttribute('data-type');
        const name = icon.getAttribute('data-name');
        
        if (!type || !name) {
            console.error(`Icon ${index} missing data attributes`);
            return;
        }
        
        console.log(`Setting up icon ${index}: type=${type}, name=${name}`);
        
        // Удаляем старые обработчики если они есть
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        // Обработчик одинарного клика/тапа
        newIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`Icon clicked: ${type} - ${name}`);
            
            // Визуальная обратная связь
            document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
            newIcon.classList.add('selected');
            
            // Открываем соответствующее окно
            setTimeout(() => {
                try {
                    if (type === 'folder') {
                        console.log('Opening folder:', name);
                        openFolderWindow(name);
                    } else if (type === 'file') {
                        console.log('Opening file:', name);
                        openTextFileWindow(name);
                    } else if (type === 'recycle') {
                        console.log('Opening recycle bin');
                        openRecycleBinWindow();
                    }
                } catch (error) {
                    console.error('Error opening window:', error);
                }
            }, 150);
        });
    });
}

// Windows XP Window Component
function createXPWindow(title, contentHTML) {
    console.log('Creating XP window:', title);
    
    // Проверяем, это превью или новое окно
    const isPreview = contentHTML.includes('image-preview-content');
    
    // Удаляем только превью окна, но не окно папки
    if (isPreview) {
        const existingPreview = document.querySelector('.xp-window.active.image-preview-window');
        if (existingPreview) {
            existingPreview.remove();
        }
    } else {
        // Если открываем новое окно (не превью), удаляем все активные окна кроме папки
        const existingWindow = document.querySelector('.xp-window.active');
        if (existingWindow && !existingWindow.classList.contains('_isFolderWindow')) {
            existingWindow.remove();
        }
    }
    
    const window = document.createElement('div');
    window.className = 'xp-window';
    window.innerHTML = `
        <div class="xp-window-header">
            <span class="xp-window-title">${title}</span>
            <button class="xp-window-close">×</button>
        </div>
        <div class="xp-window-body">
            ${contentHTML}
        </div>
    `;
    
    document.body.appendChild(window);
    
    // Обработчик закрытия
    const closeBtn = window.querySelector('.xp-window-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeXPWindow(window);
            // Если закрываем превью, показываем папку снова
            if (window.classList.contains('image-preview-window')) {
                const folderWindow = document.querySelector('.xp-window._isFolderWindow');
                if (folderWindow && folderWindow.parentNode) {
                    setTimeout(() => {
                        folderWindow.classList.add('active');
                    }, 200);
                }
            }
        });
    }
    
    // Показываем окно
    setTimeout(() => {
        window.classList.add('active');
        console.log('Window shown:', title);
    }, 10);
    
    // Если это превью, скрываем окно папки (но не удаляем)
    if (isPreview) {
        const folderWindow = document.querySelector('.xp-window.active._isFolderWindow');
        if (folderWindow) {
            folderWindow.classList.remove('active');
        }
    }
    
    return window;
}

function closeXPWindow(window) {
    window.style.animation = 'windowAppear 0.2s ease-out reverse';
    setTimeout(() => {
        window.remove();
    }, 200);
}

// Folder Window
function openFolderWindow(folderName) {
    // Файлы из xp_folder
    const folderImages = [
        'xp_folder1.webp',
        'xp_folder2.webp',
        'xp_folder3.webp',
        'xp_folder4.webp',
        'xp_folder5.webp',
        'xp_folder6.webp',
        'xp_folder7.webp'
    ];
    
    // Создаем сетку изображений
    const imageGridHTML = folderImages.map((imageName, index) => {
        return `
            <div class="image-grid-item" data-image="${imageName}">
                <img src="photos/${imageName}" alt="${imageName}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'padding:20px;text-align:center;\\'>${imageName}</div>';">
            </div>
        `;
    }).join('');
    
    const content = `
        <div class="xp-window-content">
            <div class="image-grid">
                ${imageGridHTML}
            </div>
        </div>
    `;
    
    const folderWindow = createXPWindow(folderName, content);
    
    // Сохраняем ссылку на окно папки для возврата
    folderWindow.classList.add('_isFolderWindow');
    
    // Обработчики кликов на изображения
    const imageItems = folderWindow.querySelectorAll('.image-grid-item');
    imageItems.forEach(item => {
        item.addEventListener('click', () => {
            const imageName = item.getAttribute('data-image');
            // Передаем ссылку на окно папки для возврата
            openImagePreview(imageName, '', folderWindow);
        });
    });
    
    return folderWindow;
}

// Text File Window
function openTextFileWindow(fileName) {
    const content = `
        <div class="text-viewer-content">ты че?
это что за дела?
еще чего ты хочешь?</div>
    `;
    
    createXPWindow(fileName, content);
}

// Recycle Bin Window
function openRecycleBinWindow() {
    const content = `
        <div class="xp-window-content">
            <div class="recycle-content">
                <div class="recycle-item" data-image="xp_trash.webp">
                    <div class="recycle-item-icon">🖼️</div>
                    <div class="recycle-item-name">xp_trash.webp</div>
                </div>
            </div>
        </div>
    `;
    
    const window = createXPWindow('Корзина', content);
    
    // Обработчик клика на файл в корзине
    const recycleItem = window.querySelector('.recycle-item');
    if (recycleItem) {
        recycleItem.addEventListener('click', () => {
            const imageName = recycleItem.getAttribute('data-image');
            openImagePreview(imageName, 'Это ты думала я удалил?');
        });
    }
}

// Image Preview Window
function openImagePreview(imageName, caption = '', folderWindow = null) {
    // Кнопка "Назад" только если есть окно папки
    const backButtonHTML = folderWindow ? `
        <div style="text-align:center;margin-top:15px;">
            <button class="xp-back-button" id="backToFolderBtn">← Назад</button>
        </div>
    ` : '';
    
    const captionHTML = caption ? `<div style="text-align:center;margin-top:15px;font-size:12px;color:#666;font-style:italic;">${caption}</div>` : '';
    const content = `
        <div class="image-preview-content">
            <img src="photos/${imageName}" alt="${imageName}" onerror="this.parentElement.innerHTML='<div style=\\'padding:40px;text-align:center;font-size:14px;\\'>Изображение не найдено: ${imageName}</div>';">
            ${captionHTML}
            ${backButtonHTML}
        </div>
    `;
    
    const previewWindow = createXPWindow(imageName, content);
    previewWindow.classList.add('image-preview-window');
    
    // Если открываем превью, скрываем окно папки (но не удаляем)
    if (folderWindow) {
        folderWindow.classList.remove('active');
    }
    
    // Обработчик кнопки "Назад"
    if (folderWindow) {
        const backBtn = previewWindow.querySelector('#backToFolderBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                // Закрываем превью
                closeXPWindow(previewWindow);
                // Показываем окно папки снова
                setTimeout(() => {
                    if (folderWindow && folderWindow.parentNode) {
                        folderWindow.classList.add('active');
                    }
                }, 200);
            });
        }
    }
}

// System Popup Functions
let escapeCount = 0;

function showSystemPopup() {
    const overlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('systemPopup');
    
    if (!overlay || !popup) return;
    
    // Сбрасываем счетчик и состояние кнопки NO
    escapeCount = 0;
    const popupNo = document.getElementById('popupNo');
    if (popupNo) {
        popupNo.style.opacity = '1';
        popupNo.style.pointerEvents = 'all';
        popupNo.style.display = 'block';
        popupNo.style.position = '';
        popupNo.style.left = '';
        popupNo.style.top = '';
        popupNo.style.right = '';
    }
    
    popup.style.display = 'block';
    overlay.classList.add('active');
    popup.classList.add('show');
    
    // Инициализируем обработчики
    initPopupHandlers();
}

function hideSystemPopup() {
    const overlay = document.getElementById('popupOverlay');
    const popup = document.getElementById('systemPopup');
    
    if (overlay) overlay.classList.remove('active');
    if (popup) {
        popup.classList.remove('show');
        // Убираем класс после анимации
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

function initPopupHandlers() {
    const popupYes = document.getElementById('popupYes');
    const popupNo = document.getElementById('popupNo');
    const popupClose = document.getElementById('popupClose');
    
    // YES button
    if (popupYes) {
        popupYes.addEventListener('click', handleYesClick);
    }
    
    // NO button - только через click, без hover
    if (popupNo) {
        // Убираем все старые обработчики (включая hover)
        // Клонируем кнопку чтобы убрать все старые обработчики
        const newButton = popupNo.cloneNode(true);
        popupNo.parentNode.replaceChild(newButton, popupNo);
        
        // Устанавливаем стили
        newButton.style.position = 'absolute';
        newButton.style.transition = '0.2s ease';
        
        // Добавляем только click обработчик
        newButton.addEventListener('click', handleNoClick);
    }
    
    // Close button
    if (popupClose) {
        popupClose.addEventListener('click', hideSystemPopup);
    }
}

function handleYesClick() {
    // Отключаем кнопку во время стирания
    const popupYes = document.getElementById('popupYes');
    if (popupYes) {
        popupYes.style.pointerEvents = 'none';
    }
    
    // Стираем текст, затем закрываем popup
    eraseMessage(() => {
        hideSystemPopup();
        // TODO: Show heart explosion animation
        // TODO: Continue to next sequence
        console.log('YES clicked - show hearts!');
    });
}

function handleNoClick(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.target;
    if (!button) return;
    
    if (escapeCount < 5) {
        // Перемещаем кнопку в случайную позицию на весь экран
        const x = Math.random() * (window.innerWidth - button.offsetWidth);
        const y = Math.random() * (window.innerHeight - button.offsetHeight);
        
        button.style.left = x + 'px';
        button.style.top = y + 'px';
        
        escapeCount++;
        // НЕ выполняем основное действие
    } else {
        // После 5 попыток выполняем основное действие - скрываем кнопку
        button.style.opacity = '0';
        button.style.pointerEvents = 'none';
        setTimeout(() => {
            button.style.display = 'none';
        }, 300);
    }
}

// Функция для стирания текста посимвольно (обратный эффект)
function eraseText(element, text, speed) {
    return new Promise((resolve) => {
        let i = text.length;
        
        function erase() {
            if (i > 0) {
                element.textContent = text.substring(0, i - 1);
                element.classList.add('typing'); // Курсор остается
                i--;
                setTimeout(erase, speed);
            } else {
                // Текст полностью стерт
                element.textContent = '';
                element.classList.remove('typing');
                resolve();
            }
        }
        
        erase();
    });
}


// Экран загрузки
function initBootScreen() {
    // Кнопка "запустить"
    const readBtn = document.getElementById('readBtn');
    const boomVideo = document.getElementById('boomVideo');
    const boomContainer = document.getElementById('boomVideoContainer');
    
    if (!readBtn || !boomVideo || !boomContainer) {
        console.error('Elements not found!');
        return;
    }
    
    readBtn.addEventListener('click', () => {
        // Предотвращаем скроллинг
        document.body.classList.add('explosion-active');
        
        // Задержка 500ms перед началом
        setTimeout(() => {
            // Сначала показываем видео с хромакеем
            boomContainer.classList.add('active');
            boomVideo.currentTime = 0;
            boomVideo.play().catch(error => {
                console.error('Error playing video:', error);
            });
            
            // Через 400ms начинаем тряску и эффект взрыва
            setTimeout(() => {
                // Активируем вспышку
                document.body.classList.add('explosion-start');
                
                // Скрываем основной контент после начала вспышки
                setTimeout(() => {
                    const bootScreen = document.getElementById('bootScreen');
                    if (bootScreen) {
                        bootScreen.style.opacity = '0';
                        bootScreen.style.transition = 'opacity 0.4s ease-out';
                    }
                }, 200);
                
                // Переключаем на черный фон после вспышки
                setTimeout(() => {
                    document.body.classList.add('black-start');
                    
                    // Запускаем последовательность текстов через 1.5 секунды после черного экрана
                    // (черный слой появляется за 0.8s, ждем еще 1.5s = 2.3s после начала черного)
                    setTimeout(() => {
                        console.log('Starting loading sequence');
                        showLoadingSequence();
                    }, 1500);
                }, 900); // 900ms после начала вспышки (вспышка длится 1.2s)
            }, 400); // 400ms после начала видео
            
            // После завершения анимации взрыва и видео (через ~4 секунды)
            setTimeout(() => {
                // Скрываем видео
                boomContainer.classList.remove('active');
                boomVideo.pause();
                boomVideo.currentTime = 0;
            }, 4000); // 4 секунды
        }, 500); // 500ms задержка
    });
}

