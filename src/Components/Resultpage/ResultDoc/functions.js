export function parseData(data) {
    const parser = new DOMParser();
    let text = data.replace(/<\/?[^>]+(>|$)/g, "");
    text = '&lt;data&gt;&lt;p&gt;'+ text;
    let elem = parser.parseFromString(text, 'text/html');
    let cleanElem = parser.parseFromString(elem.querySelector('body').innerText, 'text/html');
    let img = cleanElem.querySelector('img');
    cleanElem = cleanElem.querySelector('data');
    cleanElem.querySelector('img')?.remove();
    let cleanText = cleanElem.innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
    cleanText = cleanText.replace(/\s{2,10}/g, ' ');
    if (cleanText.length > 400) {
        cleanText = cleanText.slice(0, 400) + '...'
    }
    return {inner: cleanText, img: img}
}

export function correctCount(number) {
    let word = '';
    let end2 = number % 100;
    let end1 = number % 10;
    if (end2 >= 11 && end2 <= 19) {
        word = 'Слов'
    } else if (end1 === 1) {
        word = 'Cлово'
    } else if (end1 % 10 >= 2 && end1 % 10 <= 4) {
        word = 'Слова'
    } else {
        word = 'Cлов'
    }
    return (number + ' ' + word)
}