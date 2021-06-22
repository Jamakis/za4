const main = document.querySelector('main')
const sortBtn = document.getElementById('sort')
const sortReverseBtn = document.getElementById('sortReverse')
const search = document.getElementById('search')
const notFound = document.getElementById('notFound')

const getUsers = async (url) => {

  const responce = await fetch(url)
  const data = await responce.json()
  const returnData = data.data

  return returnData

}

const displayUsers = (users) => {
  main.innerHTML = ''
  users.forEach(user => {
    main.innerHTML += `
    <div class="card">
        <img src="${user.avatar}" alt="Avatar" style="width:200px" id="${user.id}">
        <div class="container">
            
            <h3 class="first_name">${user.first_name} ${user.last_name}</h3>
            <p>${user.email}</p>
        </div>
    </div>
    `
  })
}

getUsers("https://reqres.in/api/users?page=2")
  .then(data => {
    console.log(data)
    displayUsers(data)
  })
  .catch(err => console.log(err))

sortBtn.addEventListener('click', e => {
  getUsers("https://reqres.in/api/users?page=2")
    .then(data => {
      data.sort((a, b) => {
        if (a.first_name > b.first_name) return 1;
        if (a.first_name == b.first_name) return 0;
        if (a.first_name < b.first_name) return -1;
      })
      displayUsers(data)
    })
    .catch(err => console.log(err))
})

sortReverseBtn.addEventListener('click', e => {
  getUsers("https://reqres.in/api/users?page=2")
    .then(data => {
      data.sort((a, b) => {
        if (a.first_name > b.first_name) return 1;
        if (a.first_name == b.first_name) return 0;
        if (a.first_name < b.first_name) return -1;
      })
      data.reverse()
      displayUsers(data)
    })
    .catch(err => console.log(err))
})

const filterNames = term => {
  const firstNames = document.querySelectorAll('.first_name')

  Array.from(firstNames)
    .filter(name => !name.innerText.toLowerCase().includes(term))
    .forEach(name => name.parentElement.parentElement.classList.add('filtered'))

  Array.from(firstNames)
    .filter(name => name.innerText.toLowerCase().includes(term))
    .forEach(name => name.parentElement.parentElement.classList.remove('filtered'))

  if (Array.from(firstNames).every(name => name.parentElement.parentElement.classList.contains('filtered'))) {
    notFound.classList.remove('filtered')
  } else {
    notFound.classList.add('filtered')
  }

}
search.addEventListener('keyup', () => {
  const term = search.value.trim().toLowerCase()
  filterNames(term)
})