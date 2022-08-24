-- need to create data to fill tables
INSERT INTO department (names)
VALUES  ("Managment"), 
        ("Sales"),
        ("Customer Support"),
        ("Technical Support");
-- Managment Department 1
-- Sales Department 2
-- Customer Support Department 3
-- Technical Support Department 4

INSERT INTO roles (title, salary, department_id)
VALUES ('Regional Director', 120000, 1),
       ('Regional Manager', 100000, 1),
       ('Area Sales Manager', 90000, 2),
       ('Application Consultant', 80000, 4),
       ('Clinical Specialist', 70000, 3);
-- RD role id 1
-- RM role id 2
-- ASM role id 3
-- AC role id 4
-- CS role id 5

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Natalie', 'Lutrell', null, 1),
       ('Michelle', 'Kiley', 1, 1),
       ('Peter', 'Masso', 1, 2),
       ('Travis', 'Winkler', 1, 2),
       ('Kaitlyn', 'Brooks', 2, 4),
       ('Chris', 'Erickson', 2, 4),
       ('Kristina', 'Bullock', 2, 3),
       ('Tamra', 'Ames', 2, 3),
       ('Amanda', 'Gedratis', 2, 3)



