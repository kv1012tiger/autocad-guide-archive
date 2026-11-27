const searchBox = document.querySelector('#search-box');
const query = document.querySelector('#query');
const count = document.querySelector('#count');
const pagination = document.querySelector('#pagination');
const topics = Array.from(document.querySelectorAll('#topic-list li'), (row) => ({
  row,
  title: row.querySelector('a').textContent.normalize('NFKC').toLocaleLowerCase('zh-Hant'),
}));

const pageSize = 10;
let currentPage = 1;

function renderTopics() {
  const term = query.value.normalize('NFKC').trim().toLocaleLowerCase('zh-Hant');
  const matches = topics.filter((topic) => topic.title.includes(term));
  const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
  currentPage = Math.min(Math.max(1, currentPage), pageCount);
  const shown = new Set(matches.slice((currentPage - 1) * pageSize, currentPage * pageSize));
  for (const topic of topics) {
    topic.row.hidden = !shown.has(topic);
  }
  count.textContent = term ? `找到 ${matches.length} 篇文章` : `共 ${topics.length} 篇文章`;

  pagination.replaceChildren();
  pagination.hidden = pageCount <= 1;
  for (let page = 1; page <= pageCount; page += 1) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = String(page);
    button.setAttribute('aria-label', `第 ${page} 頁`);
    if (page === currentPage) button.setAttribute('aria-current', 'page');
    button.addEventListener('click', () => {
      currentPage = page;
      renderTopics();
      document.querySelector('#topics').scrollIntoView({ block: 'start' });
    });
    pagination.append(button, ' ');
  }
}

query.addEventListener('input', () => {
  currentPage = 1;
  renderTopics();
});
window.addEventListener('pageshow', renderTopics);
searchBox.hidden = false;
renderTopics();
