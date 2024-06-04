-- Add insurances
INSERT INTO TB_INSURANCE (name) VALUES
('Amil'),
('Bradesco Saude'),
('Porto Seguro Saude'),
('Sul Americana');

-- Add Users
INSERT INTO TB_USER (cpf,first_name,last_name,birthday,gender,email,cell_phone_number,home_phone_number,insurance_card_number,insurance_id) VALUES
('987.654.321-00','Marcos','Veiga','1992-12-17','MALE','mar@gmail.com','(11) 91234-5678',null,'111',1),
('987.654.322-11','Diogo','Silva',CURRENT_DATE,'MALE','dio@gmail.com',null,'(21) 2345-6789','222',2),
(null,'Gabriela','Costa','2007-10-23','FEMALE','gabi@gmail.com','(31) 98765-4321',null,'333',3);
