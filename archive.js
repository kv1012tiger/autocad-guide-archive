const searchBox = document.querySelector('#search-box');
const query = document.querySelector('#query');
const count = document.querySelector('#count');
const topics = Array.from(document.querySelectorAll('#topic-list li'), (row) => ({
  row,
  title: row.querySelector('a').textContent.normalize('NFKC').toLocaleLowerCase('zh-Hant'),
}));

function filterTopics() {
  const term = query.value.normalize('NFKC').trim().toLocaleLowerCase('zh-Hant');
  let visible = 0;
  for (const { row, title } of topics) {
    row.hidden = !title.includes(term);
    if (!row.hidden) visible += 1;
  }
  count.textContent = term ? `找到 ${visible} 篇文章` : `共 ${topics.length} 篇文章`;
}

query.addEventListener('input', filterTopics);
window.addEventListener('pageshow', filterTopics);
searchBox.hidden = false;
