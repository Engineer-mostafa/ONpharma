DROP DATABASE IF EXISTS Pharmacy_App_DB;
CREATE DATABASE Pharmacy_App_DB;

use Pharmacy_App_DB;
/*
Notes on the ID
Doctors --> 1, 2, 5, 6, ..., 17, 18
Pharmacists --> 3, 4, 7, 8, ..., 19, 20
Patients --> 21, 22, 23, 24
*/
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

    Pharmacist_acc_ID int ,

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
ALTER TABLE Pharmacist ADD FOREIGN KEY (Pharmacist_pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID) ON DELETE SET NULL;

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
/*-------------------------------------------------------Filling Tables---------------------------------------------------------------------*/
/*Account*/ 
INSERT INTO `Account` (`acc_ID`,`acc_email`,`acc_password`,`Fname`,`Mname`,`Lname`,`gender`,`Bdate`,`phoneNum`,`User_type`)
VALUES 
(1,"Cras.pellentesque@Duisat.co.uk","$2b$10$k0GSKjYaSx4yZXEYbc/xI.lkj9F6U/G6cIQAqDj1aYDH7FIjxLfK2","Jeanette","Bradley","Upton","1","2000-10-20","01141471252","Doctor"),(2,"tincidunt@malesuadaut.co.uk","$2b$10$l3IHLEH0lzHXrJANk75gz.EaLRD9Bi4W3SFYxdswfdgVWK8yUyx7m","Steven","Armand","Austin","0","2012-10-15","01145192746","Doctor"),
(3,"Donec.tempus.lorem@consectetuer.edu","$2b$10$QOgyQrTBsGdSfk4MhPnCO.SwozduF/b.2riT1.sRFrdRjCD/uKsVi","Medge","Zane","Felix","0","1990-07-05","01144839760","Pharmacist"),(4,"convallis.dolor@sed.edu","$2b$10$kay7uWKwVnM63k4k13MrDee8RbstIL7EjHKk9fx1lfjs2TCPrWhY.","Georgia","Maxwell","Levi","0","2000-10-20","01147281337","Pharmacist"),
(5,"turpis.Nulla@dolordapibus.net","$2b$10$ePp40k7ereyPiMhZuuvjCeppQPjq/f2hMar7en6Lrzyn90OawddJG","Colorado","Nicholas","Owen","1","2012-10-15","01143432303","Doctor"),(6,"Aliquam.erat@nequevenenatislacus.org","$2b$10$Yravge9cgBcuz1PA57kEiOLLfzXJpb4GC1/wGnxGhykmOXmgtQmy2","Levi","Kane","Reuben","1","1990-07-05","01140928218","Doctor"),
(7,"sed@nequeNullam.com","$2b$10$TmwcIwFWjUQ4.CeVJRROeOo3TwsAlDqPIpp13Csi2/K5EQMqqtSHe","Chantale","Rashad","Oliver","0","2000-10-20","01143262171","Pharmacist"),(8,"neque@semper.ca","$2b$10$xuCoZXcOxiHaidRrmpzTFe1unp.vIxRV4oi11rzCeccLYsxHaoEm6","Ferris","Octavius","Orlando","1","2012-10-15","01147867519","Pharmacist"),
(9,"non.sapien@quisurna.ca","$2b$10$GjITEZL8UmOqHCN4cLemWe.X9AmR4MixHlpQIsQ.mfYl6SbVSoSXG","Knox","Arsenio","Thaddeus","0","1990-07-05","01146557968","Doctor"),(10,"neque.Nullam.nisl@liberoProinmi.co.uk","$2b$10$5NcacwxG2MyIWEdEIa3hFOwwRbQn943wtBjoGXb.Qo7bm.Q1X9ApK","Ori","Bevis","Grady","1","2000-10-20","01149554281","Doctor");
INSERT INTO `Account` (`acc_ID`,`acc_email`,`acc_password`,`Fname`,`Mname`,`Lname`,`gender`,`Bdate`,`phoneNum`,`User_type`)
VALUES
(11,"felis@mattis.co.uk","$2b$10$vCxw7tr7LXaW5X756ERycOCUCdZ2wzo2EQVawNyixQ9c9eMZKWgBa","Tanya","Wing","Barry","1","2012-10-15","01140350883","Pharmacist"),(12,"quam@cursusinhendrerit.net","$2b$10$EnIUD8ogqS80Gi1MSPY.NebxEsEPDCpD/bytmONdEYu9pp.rcYOwm","Lysandra","Baxter","Flynn","1","1990-07-05","01140494902","Pharmacist"),
(13,"aliquam@euplacerat.edu","$2b$10$g4IQbPqxPmmlELoy1phDeu2aqLqgpRep4cVAiu9/Inm8.wwpj60Na","Chava","Erasmus","Yuli","1","2000-10-20","01146798042","Doctor"),(14,"ipsum.Suspendisse@elementumloremut.ca","$2b$10$3u0QUuojYH7SEbHe8FPmG.a9G.U34pmGJ.By7DTeEmNb8b2DmKf.e","Geraldine","Louis","Gannon","1","2012-10-15","01141705158","Doctor"),
(15,"malesuada.ut@faucibusleo.com","$2b$10$3iBke2mYUNQLqWdHeWVzL.wi1tsQ/a2CAWPhxayiyQXiNm/jXHBM6","Ali","Demetrius","Kenneth","1","1990-07-05","01141407102","Pharmacist"),(16,"porttitor.eros@placerat.edu","$2b$10$0hkhTTgpJ9jUF6Mmz.TwneoJOwGSF2sNBg0tZtatUWUs0VIv7aXrS","Julie","Todd","Brennan","1","2000-10-20","01149980737","Pharmacist"),
(17,"urna@magnatellus.net","$2b$10$qLkIdXBs0nD0gHiJHVxYg.xMGQXGCbuG/rcbBn9bFO7EwvoIrZ92C","Hayfa","Abdul","Walker","0","2012-10-15","01146789606","Doctor"),(18,"mollis.Integer@Lorem.net","$2b$10$/CqF.3zvfyhvTqu8Nrkaw.F5qcFmjRL9U1BsFfnBv.F0Dcd.0H4fK","Talon","Magee","Baxter","1","1990-07-05","01145028532","Doctor"),
(19,"vitae.erat@at.edu","$2b$10$9Hl/H46sxAoypvPW/vmz9O3whA5Bmiajo4SfDfJLxSRte6sk8O0gW","Sydney","Moses","Demetrius","0","2000-10-20","01147634461","Pharmacist"),(20,"neque@adipiscingelit.net","$2b$10$KZdro4oqxWgLD3gedXhsn.VsiVtZKzOVUoE.Ny49xpPLjw2AwUsPe","Derek","Barclay","Francis","1","2012-10-15","01141507664","Pharmacist");
INSERT INTO `Account` (`acc_ID`,`acc_email`,`acc_password`,`Fname`,`Mname`,`Lname`,`gender`,`Bdate`,`phoneNum`,`User_type`)
VALUES
(21,"felisMoo@mattis.co.uk","$2b$10$UYKydRWNkF1yl3/urz1bWeVBKzCCNnv09QIgRUgTVMSCaXNRwT3Ca","Tanya","Wing","Barry","1","2012-10-15","01140355883","Patient"),(22,"qneuam@cursusinhendrerit.net","$2b$10$qZCQNPTvE9Rt5A3ii.MVJe2T5HEoMRJShbNfLZRmEA7zIsOWRdCPy","Lysandra","Baxter","Flynn","1","1990-07-05","01140484902","Patient"),
(23,"feik@mattis.co.uk","$2b$10$4TCycT8NKerolBwchh5DduLGsXzdxl2H5T.MKxytPXAFcxxZ0fhTC","Tanya","Wing","Barry","1","2012-10-15","01140350887","Patient"),(24,"moquam@cursusinhendrerit.net","$2b$10$5Npo0T3fE9TpEGTu3P5lv.jg5Cbqo2fQ/E.WeD/mzu/XZZhLKPvd2","Lysandra","Baxter","Flynn","1","1990-07-05","01140694902","Patient");
/*Doctor*/
INSERT INTO `Doctor` (`doctor_acc_ID`,`doctor_degree`,`doctor_specialization`,`doctor_address`)
VALUES
(1,'Master','Thoracic surgery','Ap #317-2414 Duis Rd.'),(2,'Master','Thoracic surgery','2139 Tincidunt Avenue'),
(5,'Master','Radiation oncology','5029 Non, Rd.'),(6,'Bachelor','Radiation oncology','P.O. Box 232, 192 Fringilla St.'),
(9,'Doctoral','Neurosurgery','Ap #985-7283 Placerat Avenue'),(10,'Bachelor','Thoracic surgery','Ap #249-718 Enim. Ave'),
(13,'Bachelor','Thoracic surgery','P.O. Box 484, 6129 Cras St.'),(14,'Master','Radiation oncology','9832 Sed St.'),
(17,'Bachelor','Neurosurgery','5116 Varius. Avenue'),(18,'Bachelor','Neurosurgery','3355 Elit, Avenue');
/*Pharmacist*/
INSERT INTO `Pharmacist` (`Pharmacist_acc_ID`) 
VALUES
(3),(4),
(7),(8),
(11),(12),
(15),(16),
(19),(20);
/*Pharmacy*/
INSERT INTO `Pharmacy` (`pharmacy_ID`,`pharmacy_manager_ID`,`pharmacy_name`,`pharmacy_address`) 
VALUES 
(3,3,"Sed Pede Nec LLC","Ap #695-3176 Facilisis, St."),(4,4,"Mi Pede Nonummy Corporation","9412 Nunc St."),
(7,7,"Nullam PC","Ap #971-7657 Nullam Rd."),(8,8,"Lorem Eget Company","5612 Urna. Ave"),
(11,11,"Enim Etiam Associates","7617 Tincidunt Street"),(12,12,"Ut Nec Urna Inc.","6128 Ipsum Street"),
(15,15,"Aliquet Corp.","1931 Proin St."),(16,16,"Cras Vehicula Aliquet Corp.","P.O. Box 405, 7740 A, Avenue"),
(19,19,"Egestas Urna Justo Industries","683-8049 Arcu. Rd."),(20,20,"Vitae Semper Egestas LLC","5551 Ornare Rd.");
/*Pharmacist*/ -- ADD Pharmacist_pharmacy_ID
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 3 WHERE Pharmacist_acc_ID= 3;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 4 WHERE Pharmacist_acc_ID= 4;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 7 WHERE Pharmacist_acc_ID= 7;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 8 WHERE Pharmacist_acc_ID= 8;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 11 WHERE Pharmacist_acc_ID= 11;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 12 WHERE Pharmacist_acc_ID= 12;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 15 WHERE Pharmacist_acc_ID= 15;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 16 WHERE Pharmacist_acc_ID= 16;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 19 WHERE Pharmacist_acc_ID= 19;
UPDATE Pharmacist SET Pharmacist_pharmacy_ID= 20 WHERE Pharmacist_acc_ID= 20;
/*Pharmaceutical_Item*/
INSERT INTO `Pharmaceutical_Item` (`item_id_barcode`,`item_name`,`item_type`,`item_price`) 
VALUES 
(1,"augmentin 1g","Medical",88),(2,"vatika oil","Beauty",74),
(3,"augmentin 500mg","Medical",58),(4,"ceftriaxone 1g","Medical",84),
(5,"head and shoulders shampoo","Beauty",41),(6,"ceftriaxone 500mg","Medical",12),
(7,"cefotaxime 1g","Medical",21),(8,"alphintern","Medical",77),
(9,"panadol 500mg","Medical",91),(10,"panadol cold and flu","Medical",81),
(11,"burfen","Medical",91),(12,"dolac","Medical",81);
/*Pharmacy_Repository*/
INSERT INTO `Pharmacy_Repository` (`pharmacy_ID`,`item_id`,`item_quantity`)
VALUES
(3,1,4),(3,2,4),(3,3,2),
(4,1,30),(4,12,5),(4,5,5),
(7,11,1),(7,1,9),(7,2,10),
(8,10,1),(8,7,8),(8,6,20),
(11,4,2),(11,2,4),(11,3,2),
(12,5,3),(12,7,10),(12,8,2),
(15,10,5),(15,12,9),(15,9,12),
(16,9,6),(16,2,4),(16,3,13),
(19,2,7),(19,5,5),(19,7,5),
(20,11,2),(20,6,4),(20,7,4);
/*Prescription*/
INSERT INTO `Prescription` (`Prescription_ID`,`Prescription_diagnosis`,`Prescription_date`,`Patient_acc_ID`,`doctor_acc_ID`,`pres_status`)
VALUES
(1,"1.png","2020-12-04",3,1,"1"),(2,"2.png","2020-10-14",1,2,"0"),
(3,"3.jpeg","2020-10-06",21,5,"1"),(4,"4.jpeg","2019-12-31",22,6,"1"),
(5,"5.jpg","2019-11-14",23,9,"0"),(6,"6.png","2020-12-04",24,10,"0");
/*Analysis*/
INSERT INTO `Analysis` (`Analysis_Name`,`Analysis_Date`,`Result`,`Patient_acc_ID`) 
VALUES 
("CRP","2020-10-06","CRP.png",'2'),("Thyroid panel","2020-10-31","thyroid.jpg",'20'),
("CRP","2020-10-07","CRP.png",'22'),("Thyroid panel","2020-10-31","thyroid.jpg",'6'),
("CRP","2020-10-10","CRP.png",'2'),("Thyroid panel","2019-11-30","thyroid.jpg","22"),
("Troponin","2020-10-01","troponin.png",'21');
/*Chronic_Disease*/
INSERT INTO `Chronic_Disease` (`Disease_Name`,`Disease_Date`,`Patient_acc_ID`) 
VALUES 
("Alzheimer","2020-12-09","2"),("Diabetes","2020-10-31","4"),
("Heart failure","2020-12-09","2"),("Depression","2020-10-31","4"),
("Heart failure","2020-10-01","21"),("Chronic kidney disease","2019-12-22","23"),
("Chronic kidney disease","2020-12-02","24"),("Diabetes","2019-11-10","22");

/*
INSERT INTO `pharmacy_app_db`.`pharmaceutical_item` (`item_id_barcode`,`item_name`, `item_type`, `item_price`) VALUES (1,'bro', 'beauty', 10);
INSERT INTO `pharmacy_app_db`.`pharmaceutical_item` (`item_id_barcode`,`item_name`, `item_type`, `item_price`) VALUES (2,'med', 'medicine', 12);
--
INSERT INTO `pharmacy_app_db`.`Pharmacist` (`Pharmacist_acc_ID`) VALUES ('2');
--
INSERT INTO `pharmacy_app_db`.`pharmacy` (`pharmacy_manager_ID`, `pharmacy_name`, `pharmacy_address`) VALUES (2, 'brother', 'shobra');
--
INSERT INTO `pharmacy_app_db`.`pharmacy_repository` (`pharmacy_ID`, `item_id`, `item_quantity`) VALUES (1, 1, 50);
INSERT INTO `pharmacy_app_db`.`pharmacy_repository` (`pharmacy_ID`, `item_id`, `item_quantity`) VALUES (1, 2, 100);
--
INSERT INTO `pharmacy_app_db`.`analysis` (`Analysis_Name`, `Analysis_Date`, `Result`, `Patient_acc_ID`) VALUES ('cbc', '2000-10-10', 'DB Lecture 3 - Fall 2020.pdf','1');
--
INSERT INTO `pharmacy_app_db`.`chronic_disease` (`Disease_Name`, `Disease_Date`, `Patient_acc_ID`) VALUES ('brd', '2000-10-10', '1');
--
INSERT INTO `pharmacy_app_db`.`prescription` (`Prescription_ID`, `Prescription_diagnosis`, `Prescription_date`, `Patient_acc_ID`, `doctor_acc_ID`) VALUES ('1', 'DB Lecture 1 - Fall 2020.pdf', '2000-10-10', '1', '3');
--
INSERT INTO `pharmacy_app_db`.`prescription_medicines` (`Quantity`, `Item_id`, `Prescription_ID`) VALUES ('5', 1, '1');
--
INSERT INTO `pharmacy_app_db`.`purchase_operation` (`operation_ID`, `pharmacy_ID`, `operation_cash`) VALUES ('1', '1', '10');
--
INSERT INTO `pharmacy_app_db`.`scan` (`Scan_Name`, `Scan_Date`, `Result`, `Patient_acc_ID`) VALUES ('leg', '2000-10-10', 'DB Lecture 1 - Fall 2020.pdf', '1');
INSERT INTO `pharmacy_app_db`.`scan` (`Scan_Name`, `Scan_Date`, `Result`, `Patient_acc_ID`) VALUES ('scan2', '2000-10-10', 'DB Lecture 6 - Fall 2020.pdf', '1');
--
*/

