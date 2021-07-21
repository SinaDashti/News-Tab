const newsType = document.getElementById('newsType');
const newsTypeChildren = [...newsType.children];
const tab = document.querySelectorAll('.tab');
const selectedNews = document.querySelector('.news-select');
const news = document.querySelectorAll('a');
const checkBoxButton = document.querySelectorAll('input');
const warn = document.querySelector('.warn');
const checkBoxArray = [...checkBoxButton];
const newsMap = {
    'internal': '1',
    'external': '2',
    'video': '3',
    'mostViewed': 'y'
}

news.forEach(news => {
    if (news.getAttribute('data-filter') == '3') news.previousSibling.classList.add('fa-video');
    else if (parseInt(news.getAttribute('data-comment')) >= 5 && news.getAttribute('data-hot') == '') news.previousSibling.classList.add('fa-comment');
    else if (news.getAttribute('data-hot') == 'y' && parseInt(news.getAttribute('data-comment')) < 5) news.previousSibling.classList.add('fa-eye');
    else if (news.getAttribute('data-hot') == 'y' && parseInt(news.getAttribute('data-comment')) >= 5) {
        news.previousSibling.classList.remove('fas');
        news.previousSibling.classList.add('fab', 'fa-hotjar');
    } else if (parseInt(news.getAttribute('data-comment')) < 5 && news.getAttribute('data-hot') == '' && news.getAttribute('data-filter') != '3') {
        news.previousSibling.classList.add('fa-newspaper');
    }
})


const tabViewUpdate = (element, filterType, filterValue) => {
    if (typeof filterValue == 'string') return element.getAttribute(filterType) == filterValue;
    else return parseInt(element.getAttribute(filterType)) >= filterValue
}

const changeElementDisplay = (element, displayValue) => {
    if (displayValue == 'none') {
        element.parentNode.style.borderBottom = 'none'
    }
    else {
        element.parentNode.style.borderBottom = 'solid 1px silver';
    }
    element.style.display = displayValue;
    element.previousSibling.style.display = displayValue;
}

const updateDisplayValue = (targetElement, newsElement, filterType, filterValue) => {
    if (!targetElement.checked) {
        newsElement.forEach(news => {
            if (tabViewUpdate(news, filterType, filterValue)) changeElementDisplay(news, 'none');
        })
    } else {
        newsElement.forEach(news => {
            if (tabViewUpdate(news, filterType, filterValue)) changeElementDisplay(news, 'inline');
        })
    }
}

const contentSelectFilter = (targetElement, filterType, filterValue) => {
    if (targetElement.id == 'mostViewed' || targetElement.id == 'mostCommented') {
        news.forEach(news => {
            if (tabViewUpdate(news, filterType, filterValue)) changeElementDisplay(news, 'inline');
            else changeElementDisplay(news, 'none');
        })
    } else updateDisplayValue(targetElement, news, filterType, filterValue);

}


const checkBoxDisplayUpdate = (ch) => {
    contentSelectFilter(ch, 'data-filter', newsMap[ch.id])
}


const checkBoxAction = (e, chBoxArr) => {
    let temp = [];
    chBoxArr.map(isChecked => {
        temp.push(isChecked.checked);
        checkBoxDisplayUpdate(isChecked)
    })
    if (temp.every((el) => el == false)) {
        e.target.checked = true;
        news.forEach(news => {
            if (tabViewUpdate(news, 'data-filter', newsMap[e.target.id])) changeElementDisplay(news, 'inline');
        })
        setTimeout(() => {
            warn.style.display = 'inline'
        }, 0);
        setTimeout(() => {
            warn.style.display = 'none'
        }, 1500);
    }
}
const activeTab = (e) => {
    newsTypeChildren.map(tab => tab.classList.remove("active"));
    e.target.classList.add("active")
    selectedNews.style.display = 'none'
    warn.style.display = 'none';
    if (e.target.id == 'mostViewed') {
        news.forEach(news => {
            if (tabViewUpdate(news, 'data-hot', newsMap[e.target.id])) changeElementDisplay(news, 'inline');
            else changeElementDisplay(news, 'none');
        })
    } else if (e.target.id == 'mostCommented') {
        news.forEach(news => {
            if (tabViewUpdate(news, 'data-comment', 5)) changeElementDisplay(news, 'inline');
            else changeElementDisplay(news, 'none');
        })
    } else {
        selectedNews.style.display = 'grid';
        checkBoxAction(e, checkBoxArray)
    }

}

tab.forEach(option => option.addEventListener("click", activeTab))

checkBoxButton.forEach(checkBox => {
    checkBox.addEventListener('change', (e) => checkBoxAction(e, checkBoxArray))
})
