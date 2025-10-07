function displayArticleList() {
    const articleList = document.getElementById('article-list');
    articleList.innerHTML = '';
    
    for (const articleKey in wikiArticles) {
        const article = wikiArticles[articleKey];
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        link.textContent = article.title;
        link.href = '#';
        link.className = 'article-link';
        link.onclick = function() {
            showArticle(articleKey);
            return false;
        };
        
        listItem.appendChild(link);
        articleList.appendChild(listItem);
    }

function showArticle(articleKey) {
    const article = wikiArticles[articleKey];
    if (!article) return;
    
    document.getElementById('article-title').textContent = article.title;
    document.getElementById('article-body').innerHTML = article.content;
    
    history.pushState(null, '', `#${articleKey}`);
}

function loadArticleFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash && wikiArticles[hash]) {
        showArticle(hash);
    } else {
        showArticle('home');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayArticleList();
    loadArticleFromHash();
    
    window.addEventListener('popstate', function() {
        loadArticleFromHash();
    });
});
