
const addInsuranceForm= document.querySelector('#addInsuranceForm');
const nameText= addInsuranceForm.elements['name'];

const backButton= document.querySelector('#backButton');


backButton.addEventListener('click',()=> window.location.href="/Insurance/Insurance.html");

addInsuranceForm.addEventListener('submit',async (event) => {
    event.preventDefault();
    if(!validateFormData())
      return;

    try {
      const addedInsurance = await addInsurance({'name': nameText.value});
      window.alert('The Insurance was added successfully.');//Mostrar un mensaje de éxito o redirigir al usuario aquí si es apropiado.
      backButton.click();
    } catch(error) {
      handleErrorResponse(error);
    }  
});

function validateFormData(){
    if(nameText.value===''){
      window.alert('Name is Empty');
      return false;
    }

    return true;
}

function handleErrorResponse(error){
    const errorMessage= error.message;
    try { //Verificar si el error es una cadena JSON y tratar de analizarlo
        const errorObject= JSON.parse(errorMessage);
        if (errorObject.status === 409) {
          window.alert(`Conflict: ${errorObject.responseText}`);
        }
        else
          console.error('Error adding the Insurance:', error);
    } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        console.error('Error adding the Insurance:', error);
    }
}


async function addInsurance(insurance){
    const apiUrl = '/api/insurances';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST', // metodo 'POST' para crear un nuevo autor
        headers: {
          'Content-Type': 'application/json', // Indica que estamos enviando datos JSON
        },
        body: JSON.stringify(insurance), // Convierte el objeto y lo envía como cuerpo de la solicitud
      });
      
      if (!response.ok) {
        throw new Error(JSON.stringify({//Lanzar un error con un objeto JSON que contiene el estado y el mensaje de respuesta
            status:response.status,
            responseText:await response.text()
        }));
      }

      const data = await response.json();
      return data; 
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Rethrow the error for handling at the caller's level
    }
}
  

