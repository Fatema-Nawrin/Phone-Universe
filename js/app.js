const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field 
    searchField.value = '';
    if (searchText == '') {
        alert('Please, enter a name.')
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
    phones = phones.slice(0, 20)
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    // clear search result 
    searchResult.innerText = '';
    if (phones.length == 0) {
        alert("Such Phone doesn't exist");
    }
    phones?.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="mx-auto mt-3 img-container" alt="...">
            <div class="card-body text-center">
                <h4 class="card-title">${phone.phone_name}</h4>
                <h6>${phone.brand}</h6>
                <button onclick="loadDetails('${phone.slug}')">Details</button>
            </div >
        </div> `
        searchResult.appendChild(div)
    });
}

const loadDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

const displayDetails = phone => {
    const detailsDiv = document.getElementById('phone-details')
    console.log(phone);
    detailsDiv.innerText = ''
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="row row-cols-1 row-cols-md-2 g-4 ">
        <div>
            <img src="${phone.image}" class="w-75 mx-auto d-block" alt="...">
        </div>
        <div class="ps-4">
            <h4 class="card-title">${phone.name}</h4>
            <h6>${phone.brand}</h6>
        </div>
    </div> `
    detailsDiv.appendChild(div)

}
