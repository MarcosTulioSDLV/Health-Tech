//pagination
const PAGE_SIZE = 3; // Number of items to display per page
let currentPage = 1; // Current page

let isFilteringRows= false;

const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
//-----


const searchButton= document.querySelector('#searchButton');
const searchText= document.querySelector('#searchText');

const addInsuranceButton= document.querySelector('#addInsuranceButton'); 
const showAllInsurancesButton= document.querySelector('#showAllInsurancesButton');

const paginationText= document.querySelector('#paginationText');
const backButton= document.querySelector('#backButton');
const updateInsuranceButton= document.querySelector('#updateInsuranceButton');
const removeInsuranceButton= document.querySelector('#removeInsuranceButton');


prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;  
      if(isFilteringRows)
        displayRowsFilteringByName(searchText.value);
      else 
        displayRows();
    }
});
  
nextPageButton.addEventListener('click', () => {
    currentPage++;
    if(isFilteringRows)
      displayRowsFilteringByName(searchText.value);
    else
      displayRows();
});
  
backButton.addEventListener('click',() => window.location.href="http://localhost:8080/");

addInsuranceButton.addEventListener('click',() => window.location.href="AddInsurance/AddInsurance.html");


searchButton.addEventListener('click', () => {
    currentPage=1;//actualizar pagina cada vez que se va a hacer una nueva busqueda
    isFilteringRows= true;
    displayRowsFilteringByName(searchText.value);
});


showAllInsurancesButton.addEventListener('click', () => {
    currentPage= 1;
    isFilteringRows= false;
    displayRows();
});


updateInsuranceButton.addEventListener('click',()=>{
  const selectedInsuranceRadioButton= getSelectedInsuranceRadioButton();
  if(selectedInsuranceRadioButton==null)
      return;

  const selectedId= selectedInsuranceRadioButton.value;
  window.location.href=`UpdateInsurance/UpdateInsurance.html?id=${selectedId}`;
});

removeInsuranceButton.addEventListener('click',async () => {
  const selectedInsuranceRadioButton= getSelectedInsuranceRadioButton();
  if(selectedInsuranceRadioButton==undefined)
      return;
  
  const selectedId= selectedInsuranceRadioButton.value;

  if(!window.confirm('Do you want to remove this Insurance?')){
      return;
  }

  try{
    const removedInsurance= await removeInsurance(selectedId);
    window.alert('The Insurance was removed successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
    window.location.reload();
  }catch (error) {
    console.error('An error occurred while removing the Insurance:', error);// Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
  }
});

displayRows();

function getSelectedInsuranceRadioButton(){
    const insuranceRadioButton= document.querySelectorAll('.tableInsurances tbody input[name="insuranceRadioButton"]');

    const selectedInsuranceRadioButton= Array.from(insuranceRadioButton).find(radio=>radio.checked===true);
    if(selectedInsuranceRadioButton==undefined){
      window.alert('No Insurance selected, please select an Insurance!');
    }
    return selectedInsuranceRadioButton;
}

async function displayRows() {
  await displayRowsForInsurances(currentPage, PAGE_SIZE);
}

async function displayRowsFilteringByName(name) {
  await displayRowsForInsurances(currentPage, PAGE_SIZE, name);
}

async function displayRowsForInsurances(page, pageSize, name = '') {
  const tbody = document.querySelector('.tableInsurances tbody');
  const tableInsurances= tbody.parentNode;

  try {
    tableInsurances.style.opacity = 0; // Configuramos la opacidad a 0 antes de la transición

    tbody.innerHTML = ''; // Clear existing rows in the table body

    let InsurancesPage;
    if(name)
      InsurancesPage= await getInsurancesByName(name, page, pageSize);
    else
      InsurancesPage= await getInsurances(page, pageSize);

    const rawsFragment= document.createDocumentFragment();

    InsurancesPage.content.forEach((insurance) => {// Iterate through the list of Insurances and create a row for each Insurance
      const tr= document.createElement('tr');
      tr.innerHTML= `
        <td>${insurance.name}</td>
        <td><input type="radio" name="insuranceRadioButton" value=${insurance.id}></td>
      `;
      rawsFragment.appendChild(tr);
    });
    tbody.appendChild(rawsFragment);

    const totalPages=  InsurancesPage.totalPages<1 ? 1: InsurancesPage.totalPages; 
    paginationText.textContent= `Showing ${currentPage} of ${totalPages} entries`;
    updatePaginationButtons(InsurancesPage);

    // Usamos un temporizador para permitir que la transición CSS se aplique antes de cambiar el contenido
    setTimeout(() => {
      tableInsurances.style.opacity = 1; // Establecer la opacidad de nuevo a 1 después de la transición. // Establecer la opacidad de nuevo a 1 después de la transición. colocar el mismo valor del CSS  100 = 0,1s milisegungos!
    }, 100); // Ajusta el tiempo según la duración de la transición CSS (en milisegundos)

  } catch (error) {
    console.error('Error:', error); // Handle any errors that occurred during the fetch operation
  }
}

async function removeInsurance(id){
  const apiUrl = `/api/insurances/${id}`;
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

async function getInsurances(page, PAGE_SIZE) {
  const apiUrl = `/api/insurances?page=${page - 1}&size=${PAGE_SIZE}`;
  return fetchInsurances(apiUrl);
}
  
  
async function getInsurancesByName(name, page, PAGE_SIZE) {
  const apiUrl = `/api/insurances-by-name-containing/${name}?page=${page - 1}&size=${PAGE_SIZE}`;
  return fetchInsurances(apiUrl);
}
  
async function fetchInsurances(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data; // This will be a list of objects (e.g., Page<Insurances>)
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error; // Rethrow the error for handling at the caller's level
  }
}
  
function updatePaginationButtons(insurancesPage) {
  const totalPages = insurancesPage.totalPages;
  
  if (currentPage === 1)
    prevPageButton.disabled = true;
  else 
    prevPageButton.disabled = false;

  if(currentPage>=totalPages)
    nextPageButton.disabled = true;
  else
    nextPageButton.disabled = false;
}
