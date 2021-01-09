DROP DATABASE IF EXISTS Pharmacy_App_DB;
CREATE DATABASE Pharmacy_App_DB;

use Pharmacy_App_DB;

/*-------------------------------------------------------Creating Tables---------------------------------------------------------------------*/
/*This TABLE IS responsible for holding the common information among the system users*/
CREATE TABLE Account
(
    PRIMARY KEY(acc_ID),
    -- IDENTITY(starting Value, increment By)-> used for auto incrementing tuples
    acc_ID int auto_increment,
    acc_email varchar(255) NOT NULL UNIQUE,
    acc_password varchar(255) NOT NULL,

    Fname varchar(255) NOT NULL,
    Mname varchar(255) NOT NULL,
    Lname varchar(255) NOT NULL,
     
    -- M for men and F for women 
    gender char NOT NULL,
    Bdate date NOT NULL,

    phoneNum bigint NOT NULL UNIQUE,

    -- user type 
    User_type varchar(255) NOT NULL 
);
/*---------------------Users-------------------------*/

CREATE TABLE Doctor
(
    PRIMARY KEY(doctor_acc_ID),

    doctor_acc_ID int UNIQUE,
    -- not sure about the proper data type for the degree
    doctor_degree varchar(255) NOT NULL,
    doctor_specialization varchar(255) NOT NULL,
    doctor_address varchar(255) NOT NULL,

    FOREIGN KEY (doctor_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE
);

CREATE TABLE Pharmacist
(
    PRIMARY KEY(Pharmacist_acc_ID),

    Pharmacist_acc_ID int UNIQUE,

    Pharmacist_salary int,
    Pharmacist_pharmacy_ID int ,

    FOREIGN KEY (Pharmacist_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE

);

/*----------------------------------------------------------------*/
/*------------------Related to the pharmacy----------------------*/

CREATE TABLE Pharmacy
(
    PRIMARY KEY(pharmacy_ID),

    pharmacy_ID int auto_increment,
    pharmacy_manager_ID int,

    pharmacy_name varchar(255) NOT NULL,
    pharmacy_address varchar(255) NOT NULL UNIQUE,

    FOREIGN KEY (pharmacy_manager_ID) REFERENCES Pharmacist(Pharmacist_acc_ID) ON DELETE SET NULL
);
ALTER TABLE pharmacist ADD FOREIGN KEY (Pharmacist_pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID) ON DELETE SET NULL;

CREATE TABLE Pharmaceutical_Item
(
    PRIMARY KEY(item_id_barcode),
	item_id_barcode int auto_increment,
    item_name varchar(255),
    item_type varchar(255) NOT NULL,
    item_price int
);

CREATE TABLE Pharmacy_Repository
(
    PRIMARY KEY(pharmacy_ID, item_id),

    pharmacy_ID int,
    item_id int ,
    item_quantity int DEFAULT 0,

    FOREIGN KEY (pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Pharmaceutical_Item(item_id_barcode)
);

CREATE TABLE Purchase_operation
(
    PRIMARY KEY(operation_ID, pharmacy_ID),

    operation_ID int auto_increment,
    pharmacy_ID int,
    operation_cash int DEFAULT 0,

    FOREIGN KEY (pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID)  ON DELETE CASCADE
);
/*----------------------------------------------------------------*/
/*---------------------about the patient-------------------------*/


CREATE TABLE Prescription
(
    PRIMARY KEY (Prescription_ID),

    Prescription_ID int auto_increment,
    Prescription_diagnosis varchar(255) NOT NULL,
    Prescription_date date NOT NULL,
    Patient_acc_ID int NOT NULL,
    doctor_acc_ID int NOT NULL,
    pres_status bool default 0,

    FOREIGN KEY (Patient_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE,
    FOREIGN KEY (doctor_acc_ID) references doctor(doctor_acc_ID) 
);

CREATE TABLE Prescription_Medicines
(
    PRIMARY KEY (Prescription_ID, Item_id),

    Quantity int default 0,
    Item_id int,
    Prescription_ID int  auto_increment,

    FOREIGN KEY (Item_id) REFERENCES Pharmaceutical_Item(item_id_barcode),
    FOREIGN KEY (Prescription_ID) REFERENCES Prescription(Prescription_ID)
);

CREATE TABLE Analysis
(
    PRIMARY key(Analysis_Name, Analysis_Date, Patient_acc_ID),

    Analysis_Name varchar(255) NOT NULL,
    Analysis_Date date NOT NULL,
    Result varchar(255) NOT NULL,
    Patient_acc_ID int NOT NULL,

    FOREIGN KEY (Patient_acc_ID) REFERENCES Account(acc_ID)
);

CREATE TABLE Scan
(
    PRIMARY KEY(Scan_Name, Scan_Date, Patient_acc_ID),

    Scan_Name varchar(255) NOT NULL,
    Scan_Date date,
    Result varchar(255) NOT NULL,
    Patient_acc_ID int NOT NULL,

    FOREIGN KEY (Patient_acc_ID) REFERENCES Account(acc_ID)
);


CREATE TABLE Chronic_Disease
(
    PRIMARY KEY(Disease_Name, Patient_acc_ID),

    Disease_Name varchar(255) NOT NULL,
    Disease_Date date NOT NULL,
    Patient_acc_ID int NOT NULL,

    FOREIGN KEY (Patient_acc_ID) REFERENCES Account(acc_ID)
);
/********************************************************************/
/**/
INSERT INTO `Account` (`acc_ID`,`acc_email`,`acc_password`,`Fname`,`Mname`,`Lname`,`gender`,`Bdate`,`phoneNum`,`User_type`) VALUES (1,"Cras.pellentesque@Duisat.co.uk","HXX18WRZ6IY","Jeanette","Bradley","Upton","1","2000-10-20","01141471252","doctor"),(2,"tincidunt@malesuadaut.co.uk","GCZ60STJ0WJ","Steven","Armand","Austin","0","2012-10-15","01145192746","doctor"),(3,"Donec.tempus.lorem@consectetuer.edu","ZMX61UCS6KN","Medge","Zane","Felix","0","1990-07-05","01144839760","pharmacist"),(4,"convallis.dolor@sed.edu","CNS57ICQ6QG","Georgia","Maxwell","Levi","0","2000-10-20","01147281337","pharmacist"),(5,"turpis.Nulla@dolordapibus.net","ODQ95WKN8WF","Colorado","Nicholas","Owen","1","2012-10-15","01143432303","doctor"),(6,"Aliquam.erat@nequevenenatislacus.org","USR81MZS8RG","Levi","Kane","Reuben","1","1990-07-05","01140928218","doctor"),(7,"sed@nequeNullam.com","WZX31FRO8UU","Chantale","Rashad","Oliver","0","2000-10-20","01143262171","pharmacist"),(8,"neque@semper.ca","ISI16KIE4RY","Ferris","Octavius","Orlando","1","2012-10-15","01147867519","pharmacist"),(9,"non.sapien@quisurna.ca","BRS82LVI6QR","Knox","Arsenio","Thaddeus","0","1990-07-05","01146557968","doctor"),(10,"neque.Nullam.nisl@liberoProinmi.co.uk","KAD75BSC5NT","Ori","Bevis","Grady","1","2000-10-20","01149554281","doctor");
INSERT INTO `Account` (`acc_ID`,`acc_email`,`acc_password`,`Fname`,`Mname`,`Lname`,`gender`,`Bdate`,`phoneNum`,`User_type`) VALUES (11,"felis@mattis.co.uk","CQH55PPZ7EF","Tanya","Wing","Barry","1","2012-10-15","01140350883","pharmacist"),(12,"quam@cursusinhendrerit.net","ZQF95PRY6OD","Lysandra","Baxter","Flynn","1","1990-07-05","01140494902","pharmacist"),(13,"aliquam@euplacerat.edu","INZ89NQB1GW","Chava","Erasmus","Yuli","1","2000-10-20","01146798042","doctor"),(14,"ipsum.Suspendisse@elementumloremut.ca","CYQ88LRY0ZP","Geraldine","Louis","Gannon","1","2012-10-15","01141705158","doctor"),(15,"malesuada.ut@faucibusleo.com","YXH26CTL4CV","Ali","Demetrius","Kenneth","1","1990-07-05","01141407102","pharmacist"),(16,"porttitor.eros@placerat.edu","KHF97CQJ9ZX","Julie","Todd","Brennan","1","2000-10-20","01149980737","pharmacist"),(17,"urna@magnatellus.net","XEW35LYA0UA","Hayfa","Abdul","Walker","0","2012-10-15","01146789606","doctor"),(18,"mollis.Integer@Lorem.net","TJY87WLS9PT","Talon","Magee","Baxter","1","1990-07-05","01145028532","doctor"),(19,"vitae.erat@at.edu","IJT43MJK0QN","Sydney","Moses","Demetrius","0","2000-10-20","01147634461","pharmacist"),(20,"neque@adipiscingelit.net","RAB18JMG2GI","Derek","Barclay","Francis","1","2012-10-15","01141507664","pharmacist");
/**/
INSERT INTO `pharmacy_app_db`.`pharmaceutical_item` (`item_id_barcode`,`item_name`, `item_type`, `item_price`) VALUES (1,'bro', 'beauty', 10);
INSERT INTO `pharmacy_app_db`.`pharmaceutical_item` (`item_id_barcode`,`item_name`, `item_type`, `item_price`) VALUES (2,'med', 'medicine', 12);
/**/
INSERT INTO `pharmacy_app_db`.`pharmacist` (`Pharmacist_acc_ID`) VALUES ('2');
/**/
INSERT INTO `pharmacy_app_db`.`pharmacy` (`pharmacy_manager_ID`, `pharmacy_name`, `pharmacy_address`) VALUES (2, 'brother', 'shobra');
/**/
INSERT INTO `pharmacy_app_db`.`pharmacy_repository` (`pharmacy_ID`, `item_id`, `item_quantity`) VALUES (1, 1, 50);
INSERT INTO `pharmacy_app_db`.`pharmacy_repository` (`pharmacy_ID`, `item_id`, `item_quantity`) VALUES (1, 2, 100);
/**/
INSERT INTO `pharmacy_app_db`.`analysis` (`Analysis_Name`, `Analysis_Date`, `Result`, `Patient_acc_ID`) VALUES ('cbc', '2000-10-10', 'DB Lecture 3 - Fall 2020.pdf','1');
/**/
INSERT INTO `pharmacy_app_db`.`chronic_disease` (`Disease_Name`, `Disease_Date`, `Patient_acc_ID`) VALUES ('brd', '2000-10-10', '1');
/**/
INSERT INTO `pharmacy_app_db`.`doctor` (`doctor_acc_ID`, `doctor_degree`, `doctor_specialization`, `doctor_address`) VALUES ('3', 'bech', 'suergery', 'shobra');
/**/
INSERT INTO `pharmacy_app_db`.`prescription` (`Prescription_ID`, `Prescription_diagnosis`, `Prescription_date`, `Patient_acc_ID`, `doctor_acc_ID`) VALUES ('1', 'DB Lecture 1 - Fall 2020.pdf', '2000-10-10', '1', '3');
/**/
INSERT INTO `pharmacy_app_db`.`prescription_medicines` (`Quantity`, `Item_id`, `Prescription_ID`) VALUES ('5', 1, '1');
/**/
INSERT INTO `pharmacy_app_db`.`purchase_operation` (`operation_ID`, `pharmacy_ID`, `operation_cash`) VALUES ('1', '1', '10');
/**/
INSERT INTO `pharmacy_app_db`.`scan` (`Scan_Name`, `Scan_Date`, `Result`, `Patient_acc_ID`) VALUES ('leg', '2000-10-10', 'DB Lecture 1 - Fall 2020.pdf', '1');
INSERT INTO `pharmacy_app_db`.`scan` (`Scan_Name`, `Scan_Date`, `Result`, `Patient_acc_ID`) VALUES ('scan2', '2000-10-10', 'DB Lecture 6 - Fall 2020.pdf', '1');
/**/

