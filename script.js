const newsType = document.getElementById('newsType');
const tab = document.querySelectorAll('.tab');
const selectedNews = document.querySelector('.news-select');
const news = document.querySelectorAll('a');
const checkBoxButton = document.querySelectorAll('input');
const warn = document.getElementById('warn');
const checkBoxArray = [...checkBoxButton];
const newsMap = {
    'internal': '1',
    'external': '2',
    'video': '3',
    'mostViewed': 'y'
}

const tabViewUpdate = (element, filterType, filterValue) => {
    if (typeof filterValue == 'string') return element.getAttribute(filterType) == filterValue;
    else return parseInt(element.getAttribute(filterType)) >= filterValue
}

const updateDisplayValue = (targetElement, newsElement, filterType, filterValue) => {
    if (!targetElement.checked) {
        newsElement.forEach(news => {
            if (tabViewUpdate(news, filterType, filterValue)) news.style.display = 'none';
        })
    } else {
        newsElement.forEach(news => {
            if (tabViewUpdate(news, filterType, filterValue)) news.style.display = 'inline';
        })
    }
}

const contentSelectFilter = (targetElement, filterType, filterValue) => {
    if (targetElement.id == 'mostViewed' || targetElement.id == 'mostCommented') {
        news.forEach(news => {
            if (tabViewUpdate(news, filterType, filterValue)) news.style.display = 'inline';
            else news.style.display = 'none';
        })
    }else updateDisplayValue(targetElement, news, filterType, filterValue);

}


const checkBoxDisplayUpdate = (ch) => {
    contentSelectFilter(ch, 'data-filter', newsMap[ch.id])
}


const checkBoxAction = (chBoxArr) => {
    let temp = [];
    chBoxArr.map(isChecked => {
        temp.push(isChecked.checked);
        checkBoxDisplayUpdate(isChecked)
    })
    if (temp.every((el) => el==false)) {
        // chBoxArr[]
        setTimeout(() => {warn.style.display = 'inline'}, 0);
        setTimeout(() => {warn.style.display = 'none'}, 1500);
    }
}

const activeTab = (e) => {
    [...newsType.children].map(tab => tab.classList.remove("active"));
    e.target.classList.add("active")
    selectedNews.style.display = 'none';
    if (e.target.id == 'mostViewed') {
        news.forEach(news => {
            if (tabViewUpdate(news, 'data-hot', newsMap[e.target.id])) news.style.display = 'inline';
            else news.style.display = 'none';
        })
    }
    else if (e.target.id == 'mostCommented') {
        news.forEach(news => {
            if (tabViewUpdate(news, 'data-comment', 5)) news.style.display = 'inline';
            else news.style.display = 'none';
        })
    } else {
        selectedNews.style.display = 'grid';
        checkBoxAction(checkBoxArray)
    }

}



tab.forEach(option => option.addEventListener("click", activeTab))

checkBoxButton.forEach(checkBox => {
    checkBox.addEventListener('change', () => checkBoxAction(checkBoxArray))
})


