
# Health Tech
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white) ![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=Spring&logoColor=white)  ![H2 Database](https://img.shields.io/badge/H2%20Database-018bff?style=for-the-badge&logoColor=white) ![OpenApi](https://img.shields.io/badge/Docs-OpenAPI-success?style=for-the-badge&logo=swagger)


I developed a Web Application to manage users and their medical insurances in a Brazilian Clinic. 
This system allows to store user information such brazilian Cpf, first name, last name, birthday, cell phone number, home phone number etc, and also to store medical insurances.

![HealthTechImg1](https://github.com/MarcosTulioSDLV/Health-Tech/assets/41268178/0886893a-6078-4ced-a55b-83ad3273c8b7)


# Health Tech Rest API (Backend)
The Backend was built by a Rest API by using **Spring Boot and Java. I used some common libraries for this Rest API such Spring Web, Spring Data JPA, Validation, H2 Database and SpringDoc OpenAPI Starter WebMVC UI 2.3.0 (for the API documentation)**.

The system ensures that there are no duplicate registrations using the Cpf as a unique identifier, if this information is provided (not mandatory). Similarly, for the cell phone number and home phone number fields, at least one of them must be filled with a valid brazilian phone number.

The system allows to register a new patient, update an existing patient and delete it. The insurance is selected from all available insurances previously stored in the insurance table.


## Database Config: 
For test this API, an external Database is not necessary because an embedded Database (H2 Database) was used with the following configuration properties:

- Name: health_tech_db
- Username: sa
- Password:

## Development Tools:
This Rest API was built with:

- Spring Boot version: 3.2.5
- Java version: 17

## System Class Diagram

![HealthTechClassDiagram](https://github.com/MarcosTulioSDLV/Health-Tech/assets/41268178/47ceb1f1-8c13-429e-9031-fbb6666510f9)

# Fronted

## Development Tools:
The Fronted was built with:
- HTML
- CSS
- Vanilla JavaScript.



