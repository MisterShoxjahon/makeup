const contactList = document.querySelector('.contact-list');
const contactForm = document.querySelector('.contact-form');
const photoSelector = document.querySelector('.photo');
const currentPhoto = document.querySelector('.current-img');
let selectedPhoto = null;

let contacts = [
];

function renderContact() {
    contactList.innerHTML = '';

    contacts.forEach(user => {
        if (user.isFavourite) {
            contactList.innerHTML += `
             <div class="future">
                  <div class="Yaxyo">
                    <img class="middle" src=${user.img} alt="Middle" />
                    <div class="fiix">
                      <p class="yaxyo">${user.first_name} ${user.last_name}</p>
                      <p class="number">${user.phone}</p>
                    </div>
                  </div>
                  <div class="dabavka">
                    <img onclick='toggleFav(${user.id})' src="./icons/stars.svg" alt="star" />
                    <img src="./icons/copy.svg" alt="copy" />
                  </div>
            </div>
            `
        } else {
            contactList.innerHTML += `
             <div class="future">
                  <div class="Yaxyo">
                    <img class="middle" src=${user.img} alt="Middle" />
                    <div class="fiix">
                      <p class="yaxyo">${user.first_name} ${user.last_name}</p>
                      <p class="number">${user.phone}</p>
                    </div>
                  </div>
                  <div class="dabavka">
                    <img onclick='toggleFav(${user.id})' src="./icons/unstar.svg" alt="unstar" />
                    <img src="./icons/copy.svg" alt="copy" />
                  </div>
            </div>
            `
        }
    })
}

function toggleFav(id) {
    console.log(id);

    let updatedArr = contacts.map(user => {
        if (user.id === id) {
            return { ...user, isFavourite: !user.isFavourite }
        }else {
            return user;
        }
    }) ;

    contacts = updatedArr;
    renderContact()
}

renderContact()


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target[0].value.trim() !== '' && e.target[1].value.trim() !== '' && e.target[2].value.trim() !== '' && e.target[3].value.trim() !== '') {

        let newContact = {
            id: Date.now(),
            img: selectedPhoto == null ? './img/Middle.png' : selectedPhoto,
            first_name: e.target[0].value,
            last_name: e.target[1].value,
            phone: e.target[2].value,
            email: e.target[3].value,
            isFavourite: false
        }
        contacts.push(newContact);
        e.target.reset();
        currentPhoto.src = '/img/guy.png';

        renderContact()
    } else {
        alert('Please fill in all fields.')
    }

})


photoSelector.addEventListener('click', () => {

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.click();

    fileInput.addEventListener('change', (e) => {
        currentPhoto.src = URL.createObjectURL(e.target.files[0]);
        selectedPhoto = URL.createObjectURL(e.target.files[0]);
    })
})