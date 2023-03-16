import './style.scss';

const findRepoForm = document.forms['find-repositories'];
const repoInput = findRepoForm.elements.name;
const repoList = document.querySelector('.repositories-list');
const listEmpty = document.querySelector('.repositories-empty');
const nameError = document.querySelector('.repositories-form__content_name-error');
const loader = document.querySelector('.lds-spinner');
let lastRepo;

let searchValue;
let limit = Math.ceil(document.documentElement.clientHeight / 160);
let page;

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
};

const callback = async (entries, observer) => {
    if (entries[0].isIntersecting) {
        page++;
        const repositories = await fetchRepo({ page, limit });

        repositories.items.forEach((i) => {
            repoList.appendChild(renderRepo(i));
        });

        observer.unobserve(lastRepo);

        if (page * limit < repositories.total_count) {
            lastRepo = document.querySelector('.repositories-list__item:last-child');
            observer.observe(lastRepo);
        }
    }
};

const observer = new IntersectionObserver(callback, options);

repoInput.addEventListener('input', (e) => {
    if (nameError.classList.contains('error-active')) nameError.classList.remove('error-active');
});

findRepoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    page = 1;
    listEmpty.classList.remove('repositories-empty__visible');
    searchValue = repoInput.value;

    if (searchValue.length < 2) {
        nameError.classList.add('error-active');
        return;
    }

    repoList.replaceChildren();

    const repositories = await fetchRepo({ page, limit });

    if (repositories.total_count === 0) {
        listEmpty.classList.add('repositories-empty__visible');
    }

    repositories.items.forEach((i) => {
        repoList.appendChild(renderRepo(i));
    });

    if (page * limit < repositories.total_count) {
        lastRepo = document.querySelector('.repositories-list__item:last-child');
        observer.observe(lastRepo);
    }
});

function renderRepo(repo) {
    const repoItem = document.createElement('li');
    repoItem.classList.add('repositories-list__item');

    const urls = document.createElement('div');
    urls.classList.add('repositories-list__item_urls');

    const git = document.createElement('a');
    git.textContent = 'GitHub';
    git.classList.add('urls__git');
    git.setAttribute('href', repo.html_url);
    git.setAttribute('target', 'blank');
    urls.append(git);

    if (repo.homepage) {
        const home = document.createElement('a');
        home.textContent = 'HomePage';
        home.classList.add('urls__home');
        home.setAttribute('href', repo.homepage);
        home.setAttribute('target', 'blank');
        urls.append(home);
    }

    const date = document.createElement('p');
    date.classList.add('repositories-list__item_date');
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    date.textContent = `Создан: ${new Date(repo.created_at).toLocaleDateString('ru-Ru', dateOptions)}`;

    repoItem.innerHTML = `<p class="repositories-list__item_name">${repo.name}</p>`;

    repoItem.append(urls);
    repoItem.append(date);

    return repoItem;
}

async function fetchRepo({ page, limit }) {
    loader.style.display = 'inline-block';

    const response = await fetch(`https://api.github.com/search/repositories?q=${searchValue} in:name&per_page=${limit}&page=${page}`);
    const result = await response.json();

    loader.style.display = 'none';

    return result;
}
