const parser = new DOMParser();

const onMessage = (request, sender, callback) => {
  const xhr = new XMLHttpRequest();
  const url = `https://www.google.co.jp/search?q=${encodeURI(request.query)}&num=100&safe=off&tbm=isch&source=lnms&sa=X&ved=0ahUKEwiR0sro4-zXAhVKmZQKHaJYDdEQ_AUICygC&biw=1920&bih=983&dpr=1`;
  xhr.onload = () => {
    const doc = parser.parseFromString(xhr.responseText, 'text/html');
    const divs = Array.from(doc.querySelectorAll('.rg_meta'));
    const images = divs.map(div => JSON.parse(div.innerText).ou);
    callback(images);
  };
  xhr.open('GET', url, true);
  xhr.send();
  return true;
};

chrome.extension.onMessage.addListener(onMessage);
