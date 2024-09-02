# Data Migration and Database Assessment Tasks

## Task 1: Migrate Data from an Excel File to Azure SQL Server Database

### Overview

This task involves migrating data from an Excel file into an Azure SQL Server database using Azure Data Factory (ADF) and Azure Storage Account. Only the specified columns will be migrated, ensuring the correct data types are applied.

### Steps

1. **Prepare the Azure Environment:**

   - **Azure Storage Account**: Create a storage account in Azure to store the Excel file.
   - **Azure SQL Server Database**: Ensure an Azure SQL Server database is set up and ready to receive the data.

2. **Upload the Excel File to Azure Storage:**

   - Upload the Excel file containing the data to the Azure Blob Storage container.

3. **Create a Table in Azure SQL Database:**

   - Create a table in the Azure SQL database to match the structure of the data being migrated. For this task:
     ```sql
     CREATE TABLE Employees (
         EmpID INT NOT NULL,
         Emp_Last_Name VARCHAR(255),
         Salary INT NOT NULL
     );
     ```

4. **Set Up Azure Data Factory (ADF):**

   - In the Azure portal, create a new Azure Data Factory.
   - Define a linked service to connect to the Azure Storage Account where the Excel file is stored.
   - Define a linked service to connect to the Azure SQL Server database.

5. **Create a Data Pipeline in ADF:**

   - Create a new pipeline in Azure Data Factory.
   - Add a `Copy Data` activity to the pipeline:
     - **Source**: Configure the Excel file as the source dataset.
     - **Sink**: Configure the Azure SQL Database table as the destination.
   - Map the columns (`EmpID`, `Emp_Last_Name`, `Salary`) ensuring correct data types.

6. **Execute the Pipeline:**

   - Trigger the pipeline to start the data migration process.
   - Monitor the pipeline's execution to ensure the data is successfully migrated.

7. **Verify the Migration:**
   - Connect to the Azure SQL Database using SQL Server Management Studio (SSMS) or Azure Data Studio.
   - Query the `Employees` table to confirm that the data has been correctly migrated.

---

## Task 2: Database Assessment and Migration Using Azure Migrate

### Overview

This task involves performing a database assessment using Azure Migrate and migrating the database from a local environment to a SQL Server.

### Steps

1. **Download and Install SQL Server Migration Assistant (SSMA):**

   - Install SSMA from the official website

2. **Create an SSMA Project:**

   - Launch SSMA and create a new project targeting `SQL Server`.

3. **Connect to the Local Database:**

   - Use SSMA to connect to your local database.
   - Add the database you want to assess and migrate.

4. **Perform a Database Assessment:**

   - Run the assessment in SSMA to analyze compatibility and get recommendations for migration.
   - Review the assessment report to address any potential issues.

5. **Migrate the Database to SQL Server:**

   - Connect to the target SQL Server instance in SSMA.
   - Migrate the database schema and data from the local database to the SQL Server instance.
   - Validate the migration by querying the SQL Server to ensure all data has been accurately migrated.

6. **Post-Migration Steps:**
   - Update any application connection strings to point to the new SQL Server instance.
   - Test the application to ensure it functions correctly with the newly migrated database.
