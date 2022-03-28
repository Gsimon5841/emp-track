INSERT INTO department (department_name)
VALUES
('Clinical Laboratory'),
('Molecular Laboratory'),
('Billing'),
('Sales'),
('Phlebotomy Services'),
('Couriers'),
('Management');

INSERT INTO role (title, salary, department_id)
VALUES
('CLinical Lab Assistant', 30000, 1),
('Clinical Medical Technologist', 55000, 1),
('Clinical Lab Supervisor', 65000, 7), 
('Molecular Lab Assistant', 31000, 2), 
('Molecular Medical Technologist', 60000, 2),
('Molecular Lab Supervisor', 75000, 7),  
('Billing Specialist', 42000, 3),
('Billing Supervisor', 52000, 7),
('Sales Specialist', 50000, 4),
('Sales Supervisor', 70000, 7),
('PSC Phlebotomist', 30000, 5),
('Mobile Phlebotomist', 32000, 5),
('Phlebotomy Supervisor', 42000,7),
('Courier',36000, 6),
('Courier Supervisor', 46000, 7);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Maria', 'Ingrid', 1, 3), 
('Feleicia', 'Zaray',2, 3 ), 
('Teodora', 'Paolina', 3, NULL),
('Esme', 'Edmund', 4, 6), 
('Josefa', 'Mafalda', 5, 6),
('Leocadio', 'Shanthi', 6, NULL),
('Amarilis', 'Clara',7, 8),
('Eligio', 'Zinovy', 8, NULL),
('Chinyere', 'Kendrick', 9, 10),
('Hana', 'Charisse', 10, Null),
('Oskar', 'Deloris', 11, 13),
('Jessica', 'Aleksandr', 12, 13),
('Emma', 'Amalia', 13, Null),
('Sylvia', 'Emery', 14, 15),
('Kenneth', 'Edelmiro', 15, Null);


