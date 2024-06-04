
const updateInsuranceForm= document.querySelector('#updateInsuranceForm');
const nameText= updateInsuranceForm.elements['name'];

const urlParams= new URLSearchParams(window.location.search);
const id= urlParams.get('id');

const backButton= document.querySelector('#backButton');


updateInsuranceForm.addEventListener('submit',async (event) => {
    event.preventDefault();
    if(!validateFormData())
      return;

    try {
        const updatedInsurance = await updateInsurance({'id':id,'name': nameText.value});
        window.alert('The Unsurance was updated successfully.');// Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
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
    else
      console.error('Error updating the Insurance:', error);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
    console.error('Error updating the Insurance:', error);
  }
}


function validateFormData(){
  if(nameText.value===''){
    window.alert('Name is Empty');
    return false;
  }

  return true;
}


backButton.addEventListener('click',() => window.location.href="/Insurance/Insurance.html");


loadFormData(id);


async function updateInsurance(insurance){
    const apiUrl = `/api/insurances/${insurance.id}`;
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT', // Método HTTP para actualización (puede ser 'PUT' u otro)
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
        },
        body: JSON.stringify(insurance), // Convierte el objeto a JSON y lo envía como cuerpo de la solicitud
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
      const insurance = await getInsurance(id);
      nameText.value = insurance.name;
    } catch (error) {
      console.error('Error getting Insurance data:', error);// Puedes mostrar un mensaje de error al usuario o realizar otras acciones de manejo de errores aquí.
    }
}
  
async function getInsurance(id){
    const apiUrl = `/api/insurances-by-id/${id}`;
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

