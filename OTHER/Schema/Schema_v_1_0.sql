CREATE DATABASE Pharmacy_App_DB;

/*-------------------------------------------------------Creating Tables---------------------------------------------------------------------*/
/*This TABLE IS responsible for holding the common information among the system users*/
CREATE TABLE Account
(
    PRIMARY KEY(acc_ID),
    -- IDENTITY(starting Value, increment By)-> used for auto incrementing tuples
    acc_ID int IDENTITY(1,1),
    acc_email varchar(255) NOT NULL UNIQUE,
    acc_password varchar(255) NOT NULL UNIQUE,

    Fname varchar(255) NOT NULL,
    Mname varchar(255) NOT NULL,
    Lname varchar(255) NOT NULL,

    -- 0 for men and 1 for women 
    gender bit NOT NULL,
    Bdata date NOT NULL,

    phoneNum int NOT NULL UNIQUE
);
/*---------------------Users-------------------------*/

CREATE TABLE Doctor
(
    PRIMARY KEY(doctor_ID),

    doctor_ID int IDENTITY(1,1),
    doctor_acc_ID int UNIQUE,
    -- not sure about the proper data type for the degree
    doctor_degree varchar(255) NOT NULL,
    doctor_specialization varchar(255) NOT NULL,
    doctor_address varchar(255) NOT NULL,

    FOREIGN KEY (doctor_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE
);

CREATE TABLE Pharmacist
(
    PRIMARY KEY(Pharmacist_ID),

    Pharmacist_ID int IDENTITY(1,1) ,
    Pharmacist_acc_ID int UNIQUE,

    Pharmacist_salary int NOT NULL,
    Pharmacist_pharmacy_ID int ,

    FOREIGN KEY (Pharmacist_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE,

);

CREATE TABLE Patient
(
    PRIMARY KEY(Patient_ID),

    Patient_ID int IDENTITY(1,1),
    Patient_acc_ID int UNIQUE,

    Patient_smoking_status bit DEFAULT 0,

    FOREIGN KEY (Patient_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE
);
/*----------------------------------------------------------------*/
/*------------------Related to the pharmacy----------------------*/

CREATE TABLE Pharmacy
(
    PRIMARY KEY(pharmacy_ID),

    pharmacy_ID int IDENTITY(1,1),
    pharmacy_manager_ID int,

    pharmacy_name varchar(255) NOT NULL,
    pharmacy_address varchar(255) NOT NULL UNIQUE,

    FOREIGN KEY (pharmacy_manager_ID) REFERENCES Pharmacist(Pharmacist_ID) ON DELETE SET NULL
);
ALTER TABLE pharmacist ADD FOREIGN KEY (Pharmacist_pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID) ON DELETE SET NULL;



CREATE TABLE Pharmaceutical_Item
(
    PRIMARY KEY(item_name),

    item_name varchar(255),
    item_type varchar(255) NOT NULL,
    item_price int,
);

CREATE TABLE Pharmacy_Repository
(
    PRIMARY KEY(pharmacy_ID, item_name),

    pharmacy_ID int,
    item_name varchar(255),
    item_quantity int DEFAULT 0,

    FOREIGN KEY (pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID) ON DELETE CASCADE,
    FOREIGN KEY (item_name) REFERENCES Pharmaceutical_Item(item_name)
);

CREATE TABLE Purchase_operation
(
    PRIMARY KEY(operation_ID, pharmacy_ID),

    operation_ID int IDENTITY(1,1),
    pharmacy_ID int,
    operation_cash int DEFAULT 0,

    FOREIGN KEY (pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID)  ON DELETE CASCADE
);
/*----------------------------------------------------------------*/
/*---------------------about the patient-------------------------*/

/*
TODO
1. implement patient-realted tables
2. adding more constrains
3. addig proper beahviours e.g CASCADE ON DELETE, ...
*/
CREATE TABLE Prescription
(
    PRIMARY KEY (Prescription_ID),

    Prescription_ID int identity(1,1),
    Prescription_diagnosis varchar(255) NOT NULL,
    Prescription_date date NOT NULL,
    Patient_ID int,
    Doctor_ID int NOT NULL,

    FOREIGN KEY (Patient_ID) REFERENCES Patient(Patient_ID) ON DELETE CASCADE,
    FOREIGN KEY (Doctor_ID) references doctor(doctor_ID) 
);
CREATE TABLE prescription_Medicines
(
    PRIMARY KEY (Prescription_ID, Item_Name),

    Quantity int,
    Item_Name varchar(255) NOT NULL,
    Prescription_ID int,

    FOREIGN KEY (Item_Name) REFERENCES Pharmaceutical_Item,
    FOREIGN KEY (Prescription_ID) REFERENCES Prescription(Prescription_ID)
);

CREATE TABLE Analysis
(
    PRIMARY key(Analysis_Name, Analysis_Date, Patient_ID),

    Analysis_Name varchar(255) NOT NULL,
    Analysis_Date date NOT NULL,
    Result float NOT NULL,
    Lower_Range float,
    Upper_Range float,
    Patient_ID int NOT NULL,

    FOREIGN KEY (Patient_ID) REFERENCES Patient
);

CREATE TABLE Scan
(
    PRIMARY KEY(Scan_Name, Scan_Date, Patient_ID),

    Scan_Name varchar(255) NOT NULL,
    Scan_Date date,
    Result float NOT NULL,
    Patient_ID int,

    FOREIGN KEY (Patient_ID) REFERENCES Patient
);


CREATE TABLE Chronic_Disease
(
    PRIMARY KEY(Disease_Name, Patient_ID),

    Disease_Name varchar(255) NOT NULL,
    Disease_Date date,
    Patient_ID int,

    FOREIGN KEY (Patient_ID) REFERENCES Patient
);


