
//const saveButton= document.querySelector('#saveButton');

const updateUserForm= document.querySelector('#updateUserForm');
const cpfText= updateUserForm.elements['cpf'];
const firstNameText= updateUserForm.elements['firstName'];
const lastNameText= updateUserForm.elements['lastName']; 
const birthdayText= updateUserForm.elements['birthday']; 
const genderSelect= updateUserForm.elements['gender'];     
const emailText= updateUserForm.elements['email'];
const cellPhoneNumberText= updateUserForm.elements['cellPhoneNumber'];
const homePhoneNumberText= updateUserForm.elements['homePhoneNumber'];
const insuranceCardNumberText= updateUserForm.elements['insuranceCardNumber'];

const urlParams= new URLSearchParams(window.location.search);
const id= urlParams.get('id');

const backButton= document.querySelector('#backButton');


updateUserForm.addEventListener('submit',async (event) => {
    event.preventDefault();
    if(!validateFormData())
      return;

    try {
        const cpf= cpfText.value;
        const cellPhoneNumber= cellPhoneNumberText.value;
        const homePhoneNumber= homePhoneNumberText.value;
        const updatedUser = await updateUser({'id':id,'cpf':cpf,'firstName':firstNameText.value,'lastName':lastNameText.value,'birthday':birthdayText.value,'gender':genderSelect.options[genderSelect.selectedIndex].value,'email':emailText.value,'cellPhoneNumber':cellPhoneNumber,'homePhoneNumber':homePhoneNumber,'insuranceCardNumber':insuranceCardNumberText.value});
        window.alert('The User was updated successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
        backButton.click();
    } catch (error) {
      handleErrorResponse(error);
    }
});

function handleErrorResponse(error){
  const errorMessage= error.message;
  try {
    const errorObject= JSON.parse(errorMessage);
    if(errorObject.status===409){
      window.alert(`Conflict: ${errorObject.responseText}`);
    }
    /*else if(errorObject.status===400){//This is not necessary because we validate it initially with validateFormData() ----------------------->
      window.alert(`Bad Request: ${errorObject.responseText}`)  
    }*/
    else
      console.error('Error updating the User:', error);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
    console.error('Error updating the User:', error);
  }
}


function validateFormData(){
  if(firstNameText.value.trim()==='' || lastNameText.value.trim()==='' || birthdayText.value.trim()==='' || genderSelect.value.trim()==='' || emailText.value.trim()==='' || insuranceCardNumber.value.trim()===''){
    window.alert('First Name, Last Name, Birthday, Gender, Email, or Insurance Card Number is Empty');
    return false;
  }  
  if(cellPhoneNumberText.value.trim()==='' && homePhoneNumberText.value.trim()===''){
    window.alert('User Phone Numbers Null! You must add at least one Phone Number');
    return false;
  }

  if(!isValidCpf(cpfText.value)){//it is also valid the empty string (it will be passed as null to the db)
    window.alert('Cpf is not valid');
    return false;
  }
  if(!isValidCellPhoneNumber(cellPhoneNumberText.value)){//it is also valid the empty string (it will be passed as null to the db)
    window.alert('Cell Phone Number is not valid');
    return false;
  }
  if(!isValidHomePhoneNumber(homePhoneNumberText.value)){//it is also valid the empty string (it will be passed as null to the db)
    window.alert('Home Phone Number is not valid');
    return false;
  }
  return true;
}

function isValidCpf(cpf){
  const cpfRegex= new RegExp(/^$|[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/);
  return cpfRegex.test(cpf);
}

function isValidCellPhoneNumber(cellPhoneNumber){
  const cellPhoneNumberRegex= new RegExp(/^$|^\(\d{2}\) 9\d{4}-\d{4}$/);//Old with +55 /^$|^\+55 \(\d{2}\) 9\d{4}-\d{4}$/
  return cellPhoneNumberRegex.test(cellPhoneNumber);
}

function isValidHomePhoneNumber(homePhoneNumber){
  const homePhoneNumberRegex= new RegExp(/^$|^\(\d{2}\) [2-8]\d{3}-\d{4}$/);//Old with +55 /^$|^\+55 \(\d{2}\) [2-8]\d{3}-\d{4}$/
  return homePhoneNumberRegex.test(homePhoneNumber);
}


backButton.addEventListener('click',() => window.location.href="/User/User.html");


loadFormData(id);
formatFormData();


async function updateUser(user){
    const apiUrl = `/api/users/${user.id}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT', // Método HTTP para actualización (puede ser 'PUT' u otro)
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
        },
        body: JSON.stringify(user), // Convierte el objeto a JSON y lo envía como cuerpo de la solicitud
      });
      if (!response.ok) {
        throw new Error(JSON.stringify({
          status: response.status,
          responseText: await response.text()
        }));
      }
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Rethrow the error for handling at the caller's level
    }
}

async function loadFormData(id){
    try {
      const user = await getUser(id);
      cpfText.value= user.cpf;
      firstNameText.value = user.firstName;
      lastNameText.value= user.lastName;
      birthdayText.value= user.birthday;
      genderSelect.value= user.gender;
      emailText.value= user.email;
      cellPhoneNumberText.value= user.cellPhoneNumber;
      homePhoneNumberText.value= user.homePhoneNumber;
      insuranceCardNumberText.value= user.insuranceCardNumber;
    } catch (error) {
      console.error('Error getting User data:', error);// Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
    }
}


function formatFormData(){
  formatCpf();
  formatCellPhoneNumber();
  formatHomePhoneNumber();
}

function formatCpf() {
  cpfText.addEventListener('input', () => {
      let value = cpfText.value.replace(/\D/g, ''); // Remove non-digit characters
      if (value.length > 11) {// Limit the maximum number of characters to 11
          value = value.substring(0, 11);
      }
      // Apply CPF format (###.###.###-##)
      if (value.length > 3) {
          value = value.substring(0, 3) + '.' + value.substring(3);
      }
      if (value.length > 7) {
         value = value.substring(0, 7) + '.' + value.substring(7);
      }
      if (value.length > 11) {
         value = value.substring(0, 11) + '-' + value.substring(11);
      }
      cpfText.value = value;
  });
}

function formatCellPhoneNumber() {
  cellPhoneNumberText.addEventListener('input', () => {
      let value = cellPhoneNumberText.value.replace(/\D/g, ''); // Remove all non-digit characters
      
      if (value.length > 0) {
          value = value.replace(/^(\d{2})(\d)/, '($1) $2'); // Add parentheses around the first 2 digits
      }
      if (value.length > 7) {
          value = value.replace(/(\d{5})(\d)/, '$1-$2'); // Add a hyphen after the first 5 digits of the main number
      }
      if (value.length > 15) {
          value = value.substring(0, 15); // Limit the length of the value to 11 characters
      }
      cellPhoneNumberText.value = value;
  });
}

function formatHomePhoneNumber() {
  homePhoneNumberText.addEventListener('input', () => {
      let value = homePhoneNumberText.value.replace(/\D/g, ''); // Remove all non-digit characters

      if (value.length > 0) {
          value = value.replace(/^(\d{2})(\d)/, '($1) $2'); // Add parentheses around the first 2 digits
      }
      if (value.length > 6) {
          value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Add a hyphen after the first 4 digits of the main number
      }
      if (value.length > 14) {
          value = value.substring(0, 14); // Limit the length of the value to 14 characters
      }
      homePhoneNumberText.value = value;
  });
}

  
async function getUser(id){
    const apiUrl = `/api/users-by-id/${id}`;
    try {
      const response= await fetch(apiUrl);
      if(!response.ok)
          throw new Error('Network response was not ok');
      const data= await response.json();
      return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Rethrow the error for handling at the caller's level
    }
}

