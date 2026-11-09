const fs = require('fs');       // Подключаем модуль для работы с файловой системой
const path = require('path');   // Подключаем модуль для работы с путями
const axios = require('axios'); // Подключаем библиотеку axios для HTTP-запросов (скачивания)

// 1. Читаем файл db.json (он находится в папке src)
const dbPath = path.join(__dirname, 'src', 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 2. Создаем папку 'photos', если она еще не существует
const photosDir = path.join(__dirname, 'photos');
if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir);
}

// 3. Асинхронная функция для скачивания фотографий
async function downloadPhotos() {
    // Получаем массив людей из ключа "people" в файле db.json
    const items = dbData.people; 

    if (!items || items.length === 0) {
        console.log("⚠️ В db.json не найден массив 'people' или он пуст.");
        return;
    }

    console.log(`📦 Найдено ${items.length} человек. Начинаем скачивание...`);

    // Проходимся циклом по каждому человеку
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        // Получаем ссылку на фото из поля "photo"
        const imageUrl = item.photo; 

        if (!imageUrl) {
            console.log(`⚠️ У ${item.name} отсутствует ссылка на фото.`);
            continue;
        }

        // Определяем расширение файла (.jpg, .png и т.д.)
        let ext = '.jpg';
        try {
            const urlObj = new URL(imageUrl);
            const pathnameExt = path.extname(urlObj.pathname);
            if (pathnameExt) ext = pathnameExt;
        } catch(e) {}

        // Формируем имя файла (например, John_Smith.jpg)
        const fileName = `${item.name}_${item.surname}${ext}`;
        const filePath = path.join(photosDir, fileName);

        try {
            console.log(`📥 Скачивается: ${fileName}...`);
            
            // Отправляем GET-запрос для скачивания изображения
            const response = await axios({
                method: 'GET',
                url: imageUrl,
                responseType: 'stream'
            });

            // Создаем поток для записи файла на диск
            const writer = fs.createWriteStream(filePath);
            
            // Перенаправляем поток данных из ответа в файл
            response.data.pipe(writer);

            // Ожидаем завершения записи файла
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`✅ Успешно скачано: ${fileName}`);
        } catch (error) {
            console.error(`❌ Ошибка при скачивании ${fileName}:`, error.message);
        }
    }
    console.log('🎉 Загрузка всех фотографий завершена.');
}

// Запускаем функцию
downloadPhotos();