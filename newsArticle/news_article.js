var xhr = new XMLHttpRequest();
var url = "./news_article.json";
// Using GET request
xhr.open("GET", url, true);
// Expected response type
xhr.responseType = "json";
// This function will be triggered after the data is successfully loaded
xhr.onload = function () {
  var articles = xhr.response.articles;
  var articlesDiv = document.getElementById("articles");

  articles.forEach(function (article) {
    var articleDiv = document.createElement("div");
    articleDiv.classList.add("article");

    var title = document.createElement("h2");
    title.textContent = article.title;

    var description = document.createElement("p");
    description.textContent = article.description;

    var keyPoints = document.createElement("h3");
    keyPoints.textContent = "Key Points: ";

    var KeyList = document.createElement("ul");
    article.key_points.forEach(function (key) {
      var listItem = document.createElement("li");
      listItem.textContent = key;
      KeyList.appendChild(listItem);
    });

    var implicationsHeader = document.createElement("h3");
    implicationsHeader.textContent = "Implications: ";

    var implicationsList = document.createElement("ul");
    article.implications.forEach(function (imply) {
      var listItem = document.createElement("li");
      listItem.textContent = imply;
      implicationsList.appendChild(listItem);
    });

    articleDiv.appendChild(title);
    articleDiv.appendChild(description);
    articleDiv.appendChild(keyPoints);
    articleDiv.appendChild(KeyList);
    articleDiv.appendChild(implicationsHeader);
    articleDiv.appendChild(implicationsList);

    articlesDiv.appendChild(articleDiv);
  });
};
// Send the request
xhr.send();
