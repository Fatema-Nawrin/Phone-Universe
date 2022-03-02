const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    toggleDetails('none')
    const searchText = searchField.value;
    // clear search field 
    searchField.value = '';
    if (searchText == '') {
        alert('Please, enter a phone name.')
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
        alert("Sorry, Information for this phone doesn't exist.");
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

const toggleDetails = displayStyles => {
    document.getElementById('toggle-details').style.display = displayStyles;
}

const loadDetails = id => {
    toggleDetails('block');
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
const displayDetails = phone => {
    const detailsDiv = document.getElementById('phone-details')
    console.log(phone);
    let sensorInfo = phone.mainFeatures.sensors.join(', ');
    detailsDiv.innerText = ''
    const div = document.createElement('div')
    div.innerHTML = `
        <div>
            <img src="${phone.image}" class="mx-auto d-block" alt="...">
        </div>
    `
    const div2 = document.createElement('div')
    div2.innerHTML = `
    <h4 class="card-title">Specifications of ${phone.name}</h4>
    <div>
        <span class="fw-bolder">Release Date:</span>
        <p class="my-1">${phone.releaseDate ? phone.releaseDate : 'No date is annnounced yet'}.</p>
        <span class="fw-bolder">Chipset:</span>
        <p class="my-1">${phone.mainFeatures.chipSet}.</p>
        <span class="fw-bolder">Storage:</span>
        <p class="my-1">${phone.mainFeatures.storage}.</p>
        <span class="fw-bolder">Display Size:</span>
        <p class="my-1">${phone.mainFeatures.displaySize}.</p>
        <span class="fw-bolder">Sensors:</span>
        <p class="my-1">${sensorInfo}.</p>
    </div>
`
    const div3 = document.createElement('div')
    if (!phone.others) {
        div3.innerHTML = ``
    }
    else {
        div3.innerHTML = `
        <h5 class="mb-1">Other Details:</h5>
        <p class="m-0"><span class="fw-bolder">Bluetooth: </span>${phone.others.Bluetooth ? phone.others.Bluetooth : 'No data found'}.</p>
        <p class="my-0"><span class="fw-bolder">Radio: </span>${phone.others.Radio ? phone.others.Radio : 'No data found'}.</p>
        <p class="my-0"><span class="fw-bolder">NFC:  </span>${phone.others.NFC ? phone.others.NFC : 'No data found'}.</p>
        <p class="my-0"><span class="fw-bolder">USB:  </span>${phone.others.USB ? phone.others.USB : 'No data found'}.</p>
        <p class="my-0"><span class="fw-bolder">GPS:  </span>${phone.others.GPS ? phone.others.GPS : 'No data found'}.</p>
        <p class="my-0"><span class="fw-bolder">WLAN:  </span>${phone.others.WLAN ? phone.others.WLAN : 'No data found'}.</p>
        `
    }
    div2.appendChild(div3)
    detailsDiv.appendChild(div)
    detailsDiv.appendChild(div2)
}