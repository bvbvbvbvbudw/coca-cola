document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('toggle').addEventListener('click', function(){
        document.getElementById('hamburger').classList.toggle('open');
    });

    const stars = document.querySelectorAll('.stars svg');
    const starsArray = Array.from(stars).slice(1, 18);
    function randomGlowStar() {
        const randomStyle = `box-shadow: 0px 0px 36px 6px rgba(255, 255, 255, 0.2);`;

        // Генерация случайных индексов
        const randomIndexes = [];
        while (randomIndexes.length < 4) {
            const randomIndex = Math.floor(Math.random() * starsArray.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        // Применение стиля к выбранным элементам
        randomIndexes.forEach(index => {
            starsArray[index].style.cssText = randomStyle;
            starsArray[index].style.transition = 'box-shadow 1s ease';

            // Используем setTimeout вместо setInterval
            setTimeout(() => {
                starsArray[index].style.cssText = 'box-shadow: 0px 0px 0px 0px';
                starsArray[index].style.transition = 'box-shadow 1s ease';

            }, 1000);
        });
    }
    setInterval(() => {
        randomGlowStar();
    }, 1000);

    setTimeout(function () {
        // Показываем элемент плавно
        var cloudElement = document.querySelector('.cloud');
        cloudElement.style.opacity = '1';
    }, 3000);
})