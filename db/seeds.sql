-- need to create data to fill tables
INSERT INTO department (names)
VALUES  ("Managment"), 
        ("Sales"),
        ("Technical Support"),
        ("Customer Support");
-- Managment Department 1
-- Sales Department 2
-- Technical Support Department 3
-- Customer Support Department 4

INSERT INTO roles (title, salary, department_id)
VALUES ('Regional Director', 120000, 1),
       ('Regional Manager', 100000, 1),
       ('Area Sales Manager', 90000, 2),
       ('Application Consultant East NC', 80000, 3),
       ('Application Consultant West NC', 80000, 3),
       ('Clinical Specialist', 70000, 4);
-- RD role id 1
-- RM role id 2
-- ASM role id 3
-- AC East role id 4
-- AC West role id 5
-- CS role id 6

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Natalie', 'Lutrell', null, 1),
       ('Michelle', 'Kiley', 1, 2),
       ('Peter', 'Masso', 1, 3),
       ('Travis', 'Winkler', 1, 3),
       ('Kristina', 'Ignasiak', 1, 3),
       ('Kaitlyn', 'Brooks', 2, 5),
       ('Chris', 'Erickson', 2, 4),
       ('Kristina', 'Bullock', 7, 6),
       ('Tamra', 'Ames', 7, 6),
       ('Amanda', 'Gedratis', 7, 6),
       ('Kristin', 'Johnson', 6, 6);




