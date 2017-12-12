(() => {
  'use strict';

  const regex = {
    base64: /^data:/,
  };

  const onResponse = (yakulist) => {
    choiceYakuMitsuru(yakulist);
  };

  const choiceYakuMitsuru = (yakulist) => {
    const random = Math.floor(Math.random() * 101);
    const url = yakulist[random];
    if (regex.base64.test(url)) {
      choiceYakuMitsuru(yakulist);
    } else {
      replaceMemo.src = yakulist[random];
    }
  };

  chrome.extension.sendMessage({ query: 'やくみつる' }, onResponse);

  const replaceMemo = {
    src: '',
  };

  const replaceImage = (images, aTags, divs) => {
    images.forEach($el => {
      const $img = document.createElement('img');
      $img.className = $el.className;
      $img.style.cssText = $el.style.cssText;
      //$img.height = $el.height;
      //$img.width = $el.width;
      $img.src = replaceMemo.src;
      $el.parentNode.replaceChild($img, $el);
    });
    aTags.bk.forEach($a => {
      if ($a.parentNode == null) return;
      const $newA = document.createElement('a');
      $a.style.background = '';
      $newA.style.cssText = $a.style.cssText;
      $newA.style.background = `url("${replaceMemo.src}")`;
      $a.parentNode.replaceChild($newA, $a);
    });
    aTags.bki.forEach($a => {
      if ($a.parentNode == null) return;
      const $newA = document.createElement('a');
      $a.style.backgroundImage = '';
      $newA.style.cssText = $a.style.cssText;
      $newA.style.backgroundImage = `url("${replaceMemo.src}")`;
      $a.parentNode.replaceChild($newA, $a);
    });
    divs.bk.forEach($div => {
      if ($div.parentNode == null) return;
      const $newDiv = document.createElement('div');
      $div.style.background = '';
      $newDiv.style.cssText = $div.style.cssText;
      $newDiv.style.background = `url("${replaceMemo.src}")`;
      $div.parentNode.replaceChild($newDiv, $div);
    });
    divs.bki.forEach($div => {
      if ($div.parentNode == null) return;
      const $newDiv = document.createElement('div');
      $div.style.backgroundImage = '';
      $newDiv.style.cssText = $div.style.cssText;
      $newDiv.style.backgroundImage = `url("${replaceMemo.src}")`;
      $div.parentNode.replaceChild($newDiv, $div);
    });
  };

  const includeBKUrl = ($el) => {
    return $el.style.background.includes('url');
  };
  const includeBKIUrl = ($el) => {
    return $el.style.backgroundImage.includes('url');
  };

  const onWatch = () => {
    const $images = document.querySelectorAll('img');
    const $aTags = document.querySelectorAll('a');
    const $divs = document.querySelectorAll('div');
    const images = Array.from($images).filter($el => $el.src !== replaceMemo.src);
    const backgroundForATags = Array.from($aTags).filter($a => includeBKUrl($a));
    const backgroundImageForATags = Array.from($aTags).filter($a => includeBKIUrl($a));
    const backgroundForDivs = Array.from($divs).filter($div => includeBKUrl($div));
    const backgroundImageForDivs = Array.from($divs).filter($div => includeBKIUrl($div));
    replaceImage(images, { bk: backgroundForATags, bki: backgroundImageForATags }, { bk: backgroundForDivs, bki: backgroundImageForDivs });
  };

  const main = () => {
    setInterval(onWatch, 1000);
  };

  main();
})();
