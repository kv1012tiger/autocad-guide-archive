const feature = document.querySelector('.island-feature');
const scriptUrl = new URL(document.currentScript.src);

fetch(new URL('island-articles.json', scriptUrl))
  .then((response) => {
    if (!response.ok) throw new Error('無法讀取資源島文章');
    return response.json();
  })
  .then((articles) => {
    if (!articles.length) return;
    const article = articles[Math.floor(Math.random() * articles.length)];
    feature.textContent = article.title;
    feature.href = new URL(article.href, 'https://kv1012tiger.github.io/autocad-tw-island/').href;
  })
  .catch(() => {});
