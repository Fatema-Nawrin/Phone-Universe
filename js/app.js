const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field 
    searchField.value = '';
    if (searchText == '') {

    }
    else {
        console.log(searchText);
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
    }
}

const displaySearchResult = (phones) => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    for (const phone of phones) {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="mx-auto mt-3 img-container" alt="...">
        <div class="card-body text-center">
          <h4 class="card-title">${phone.phone_name}</h4>
          <h6>${phone.brand}</h6>
          <button>Details</button>
        </div>
      </div>`
        searchResult.appendChild(div)

    }
}