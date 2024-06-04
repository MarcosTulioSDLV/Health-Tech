//pagination
const PAGE_SIZE = 3; // Number of items to display per page
let currentPage = 1; // Current page

let isFilteringRows= false;

const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
//-----


const searchButton= document.querySelector('#searchButton');
const searchText= document.querySelector('#searchText');

const addUserButton= document.querySelector('#addUserButton'); 
const showAllUsersButton= document.querySelector('#showAllUsersButton');

const paginationText= document.querySelector('#paginationText');
const backButton= document.querySelector('#backButton');
const updateUserButton= document.querySelector('#updateUserButton');
const removeUserButton= document.querySelector('#removeUserButton');


prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;  
      if(isFilteringRows)
        displayRowsFilteringByFirstName(searchText.value);
      else 
        displayRows();
    }
});
  
nextPageButton.addEventListener('click', () => {
    currentPage++;
    if(isFilteringRows)
      displayRowsFilteringByFirstName(searchText.value);
    else
      displayRows();
});
  
backButton.addEventListener('click',() => window.location.href="http://localhost:8080/");

addUserButton.addEventListener('click',() => window.location.href="SelectInsuranceToAddNewUser/SelectInsuranceToAddNewUser.html");


searchButton.addEventListener('click', () => {
    currentPage=1;//actualizar pagina cada vez que se va a hacer una nueva busqueda
    isFilteringRows= true;
    displayRowsFilteringByFirstName(searchText.value);
});


showAllUsersButton.addEventListener('click', () => {
    currentPage= 1;
    isFilteringRows= false;
    displayRows();
});


updateUserButton.addEventListener('click',()=>{
  const selectedUserRadioButton= getSelectedUserRadioButton();
  if(selectedUserRadioButton==null)
      return;

  const selectedId= selectedUserRadioButton.value;
  window.location.href=`UpdateUser/UpdateUser.html?id=${selectedId}`;
});

removeUserButton.addEventListener('click',async () => {
  const selectedUserRadioButton= getSelectedUserRadioButton();
  if(selectedUserRadioButton==undefined)
      return;
  
  const selectedId= selectedUserRadioButton.value;

  if(!window.confirm('Do you want to remove this User?')){
      return;
  }

  try{
    const removedUser= await removeUser(selectedId);
    window.alert('The User was removed successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
    window.location.reload();
  }catch (error) {
    console.error('An error occurred while removing the User:', error);// Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
  }
});

displayRows();

function getSelectedUserRadioButton(){
    const userRadioButton= document.querySelectorAll('.tableUsers tbody input[name="userRadioButton"]');

    const selectedUserRadioButton= Array.from(userRadioButton).find(radio=>radio.checked===true);
    if(selectedUserRadioButton==undefined){
      window.alert('No User selected, please select an User!');
    }
    return selectedUserRadioButton;
}

async function displayRows() {
  await displayRowsForUsers(currentPage, PAGE_SIZE);
}

async function displayRowsFilteringByFirstName(firstName) {
  await displayRowsForUsers(currentPage, PAGE_SIZE, firstName);
}

async function displayRowsForUsers(page, pageSize, firstName = '') {
  const tbody = document.querySelector('.tableUsers tbody');
  const tableUsers= tbody.parentNode;

  try {
    tableUsers.style.opacity = 0; // Configuramos la opacidad a 0 antes de la transición

    tbody.innerHTML = ''; // Clear existing rows in the table body

    let usersPage;
    if(firstName)
      usersPage= await getUsersByFirstName(firstName, page, pageSize);
    else
      usersPage= await getUsers(page, pageSize);

    const rawsFragment= document.createDocumentFragment();

    usersPage.content.forEach((user) => {// Iterate through the list of Users and create a row for each User
      const tr= document.createElement('tr');
      tr.innerHTML= `
        <td>${(user.cpf===null)?'-':user.cpf}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.birthday}</td>
        <td>${user.gender}</td>
        <td>${user.email}</td>
        <td>${(user.cellPhoneNumber===null)?'-':user.cellPhoneNumber}</td>
        <td>${(user.homePhoneNumber===null)?'-':user.homePhoneNumber}</td>
        <td>${user.insurance.name}</td>
        <td>${user.insuranceCardNumber}</td>
        <td><input type="radio" name="userRadioButton" value=${user.id}></td>
      `;
      rawsFragment.appendChild(tr);
    });
    tbody.appendChild(rawsFragment);

    const totalPages=  usersPage.totalPages<1 ? 1: usersPage.totalPages; 
    paginationText.textContent= `Showing ${currentPage} of ${totalPages} entries`;
    updatePaginationButtons(usersPage);

    // Usamos un temporizador para permitir que la transición CSS se aplique antes de cambiar el contenido
    setTimeout(() => {
      tableUsers.style.opacity = 1; // Establecer la opacidad de nuevo a 1 después de la transición. // Establecer la opacidad de nuevo a 1 después de la transición. colocar el mismo valor del CSS  100 = 0,1s milisegungos!
    }, 100); // Ajusta el tiempo según la duración de la transición CSS (en milisegundos)

  } catch (error) {
    console.error('Error:', error); // Handle any errors that occurred during the fetch operation
  }
}

async function removeUser(id){
  const apiUrl = `/api/users/${id}`;
  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE', // Especifica el método DELETE
      headers: {
        'Content-Type': 'application/json', // Puedes ajustar el encabezado según lo requiera tu API
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Vuelve a lanzar el error para manejarlo en el nivel del llamador
  }
}

async function getUsers(page, PAGE_SIZE) {
  const apiUrl = `/api/users?page=${page - 1}&size=${PAGE_SIZE}`;
  return fetchUsers(apiUrl);
}
  
async function getUsersByFirstName(firstName, page, PAGE_SIZE) {
  const apiUrl = `/api/users-by-first-name-containing/${firstName}?page=${page - 1}&size=${PAGE_SIZE}`;
  return fetchUsers(apiUrl);
}
  
async function fetchUsers(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data; // This will be a list of objects (e.g., Page<Users>)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Rethrow the error for handling at the caller's level
  }
}
  
function updatePaginationButtons(usersPage) {
  const totalPages = usersPage.totalPages;
  
  if (currentPage === 1)
    prevPageButton.disabled = true;
  else 
    prevPageButton.disabled = false;

  if(currentPage>=totalPages)
    nextPageButton.disabled = true;
  else
    nextPageButton.disabled = false;
}
