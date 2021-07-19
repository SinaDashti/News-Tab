const newsType = document.getElementById('newsType');
const tab = document.querySelectorAll('.tab');
const selectedNews = document.querySelector('.news-select');
const news = document.querySelectorAll('a');
const checkBoxButton = document.querySelectorAll('input');
const checkBoxArray = [...checkBoxButton];
const newsMap = {
    'internal': '1',
    'external': '2',
    'video': '3',
    'mostViewed': 'y'
}


const contentSelectFilter = (targetElement, filterType, filterValue) => {
    if (targetElement.id == 'mostViewed' || targetElement.id == 'mostCommented') {
        news.forEach(news => {
            if (news.getAttribute(filterType) == filterValue) news.style.display = 'inline';
            else news.style.display = 'none';
        })
    } else {
        if (!targetElement.checked) {
            news.forEach(news => {
                if (news.getAttribute(filterType) == filterValue) news.style.display = 'none';
            })
        } else {
            news.forEach(news => {
                if (news.getAttribute(filterType) == filterValue) news.style.display = 'inline';
            })
        }
    }

}


const checkBoxDisplayUpdate = (ch) => {
    contentSelectFilter(ch, 'data-filter', newsMap[ch.id])
    // if (!ch.checked) {
    //     contentSelectFilter('data-filter', newsMap[ch.id], 'none');
    // news.forEach(news => {
    //     if (news.getAttribute('data-filter') == newsMap[ch.id]) news.style.display = 'none'
    // })
    // } else {
    //     contentSelectFilter('data-filter', newsMap[ch.id], 'inline');
    // news.forEach(news => {
    //     if (news.getAttribute('data-filter') == newsMap[ch.id]) news.style.display = 'inline'
    // })
    // }
}

const tabViewUpdate = (element, filterType, filterValue) => {
    if (typeof filterValue == 'string') return element.getAttribute(filterType) == filterValue;
    else return parseInt(element.getAttribute(filterType)) >= filterValue
}



const checkBoxAction = (chBoxArr) => {
    chBoxArr.map(isChecked => {
        checkBoxDisplayUpdate(isChecked)
    })
}

const activeTab = (e) => {
    [...newsType.children].map(tab => tab.classList.remove("active"));
    e.target.classList.add("active")
    selectedNews.style.display = 'none';
    if (e.target.id == 'mostViewed') {
        news.forEach(news => {
            if (tabViewUpdate(news, 'data-hot', newsMap[e.target.id])) news.style.display = 'inline';
            // if (news.getAttribute('data-hot') == newsMap[e.target.id]) news.style.display = 'inline';
            else news.style.display = 'none';
        })
    }
    else if (e.target.id == 'mostCommented') {
        news.forEach(news => {
            if (tabViewUpdate(news, 'data-comment', 5)) news.style.display = 'inline';
            // if (parseInt(news.getAttribute('data-comment')) >= 5) news.style.display = 'inline';
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


