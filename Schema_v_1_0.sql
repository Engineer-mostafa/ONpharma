-- Set NoCount ON

-- Declare @schemaName varchar(200)
-- set @schemaName=''
-- Declare @constraintName varchar(200)
-- set @constraintName=''
-- Declare @tableName varchar(200)
-- set @tableName=''

-- While exists
-- (   
--     SELECT c.name
-- FROM sys.objects AS c
--     INNER JOIN sys.tables AS t
--     ON c.parent_object_id = t.[object_id]
--     INNER JOIN sys.schemas AS s
--     ON t.[schema_id] = s.[schema_id]
-- WHERE c.[type] IN ('D','C','F','PK','UQ')
--     and t.[name] NOT IN ('__RefactorLog', 'sysdiagrams')
--     and c.name > @constraintName
-- )

-- Begin
--     -- First get the Constraint
--     SELECT
--         @constraintName=min(c.name)
--     FROM sys.objects AS c
--         INNER JOIN sys.tables AS t
--         ON c.parent_object_id = t.[object_id]
--         INNER JOIN sys.schemas AS s
--         ON t.[schema_id] = s.[schema_id]
--     WHERE c.[type] IN ('D','C','F','PK','UQ')
--         and t.[name] NOT IN ('__RefactorLog', 'sysdiagrams')
--         and c.name > @constraintName

--     -- Then select the Table and Schema associated to the current constraint
--     SELECT
--         @tableName = t.name,
--         @schemaName = s.name
--     FROM sys.objects AS c
--         INNER JOIN sys.tables AS t
--         ON c.parent_object_id = t.[object_id]
--         INNER JOIN sys.schemas AS s
--         ON t.[schema_id] = s.[schema_id]
--     WHERE c.name = @constraintName

--     -- Then Print to the output and drop the constraint
--     Print 'Dropping constraint ' + @constraintName + '...'
--     Exec('ALTER TABLE [' + @schemaName + N'].[' + @tableName + N'] DROP CONSTRAINT [' + @constraintName + ']')
-- End

-- Set NoCount OFF
-- /*-------------------------------------------------------*/
-- use this line to ba able to test changes on the database
EXEC sp_msforeachtable "ALTER TABLE ? NOCHECK CONSTRAINT all"
-- remove constrains to be able to drop tables
EXEC sp_MSforeachtable @command1 = "DROP TABLE ?"
DROP DATABASE IF EXISTS[schema_v_1_0]
/*this IS version 1.0 of the DATABASE, this version holds users tables AND pharamcy-related tables */
CREATE DATABASE schema_v_1_0
GO
use schema_v_1_0
/*-------------------------------------------------------Creating Tables---------------------------------------------------------------------*/
/*This TABLE IS responsible for holding the common information among the system users*/
DROP TABLE IF EXISTS Account
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
DROP TABLE IF EXISTS Doctor
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
DROP TABLE IF EXISTS Pharmacist
CREATE TABLE Pharmacist
(
    PRIMARY KEY(Pharmacist_ID),

    Pharmacist_ID int IDENTITY(1,1) ,
    Pharmacist_acc_ID int UNIQUE,

    Pharmacist_salary int NOT NULL,
    Pharmacist_pharmacy_ID int ,

    FOREIGN KEY (Pharmacist_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE,
    FOREIGN KEY (Pharmacist_pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID) ON DELETE SET NULL
);
DROP TABLE IF EXISTS Patient
CREATE TABLE Patient
(
    PRIMARY KEY(patiant_ID),

    patiant_ID int IDENTITY(1,1),
    patient_acc_ID int UNIQUE,

    patient_smoking_status bit DEFAULT 0,

    FOREIGN KEY (patient_acc_ID) REFERENCES Account(acc_ID) ON DELETE CASCADE
);
/*----------------------------------------------------------------*/
/*------------------Related to the pharmacy----------------------*/
DROP TABLE IF EXISTS Pharmacy
CREATE TABLE Pharmacy
(
    PRIMARY KEY(pharmacy_ID),

    pharmacy_ID int IDENTITY(1,1),
    pharmacy_manager_ID int,

    pharmacy_name varchar(255) NOT NULL,
    pharmacy_address varchar(255) NOT NULL UNIQUE,

    FOREIGN KEY (pharmacy_manager_ID) REFERENCES Pharmacist(Pharmacist_ID) ON DELETE SET NULL
);
DROP TABLE IF EXISTS Pharmaceutical_Item
CREATE TABLE Pharmaceutical_Item
(
    PRIMARY KEY(item_name),

    item_name varchar(255),
    item_type varchar(255) NOT NULL,
    item_price int,
);
DROP TABLE IF EXISTS Pharmacy_Repository
CREATE TABLE Pharmacy_Repository
(
    PRIMARY KEY(pharmacy_ID, item_name),

    pharmacy_ID int,
    item_name varchar(255),
    item_quantity int DEFAULT 0,

    FOREIGN KEY (pharmacy_ID) REFERENCES Pharmacy(pharmacy_ID) ON DELETE CASCADE,
    FOREIGN KEY (item_name) REFERENCES Pharmaceutical_Item(item_name) ON DELETE SET NULL
);
DROP TABLE IF EXISTS Purchase_operation
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