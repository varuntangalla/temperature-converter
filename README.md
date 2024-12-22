# Student Temperature Management Application

This project is a web-based application designed to manage and monitor student temperature records efficiently. It allows educational institutions to track students' temperatures, ensuring a safe and healthy environment.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Anurag-30/student-temp-app.git
   cd student-temp-app
   ```

2. **Navigate to node-app directory**:

   ```bash
   cd node-app
   ```

3. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) installed.

   ```bash
   npm install
   ```

4. **Run the Application**:

   ```bash
   npm start
   ```

   By default, Application runs on Port 3000
   The application should now be running at `http://localhost:3000`.



# Terraform Setup for Temperature Converter Application

This repository contains Terraform configurations to spin up infrastructure for the Temperature Converter application.

## Project Overview
The Terraform setup automates the creation of necessary infrastructure for deploying a temperature converter application, ensuring a smooth and consistent environment setup.

## Prerequisites

1. **Terraform**:
   - Ensure Terraform is installed on your system (preferably version `1.5.0` or later).
   - [Download Terraform](https://www.terraform.io/downloads.html).

2. **AWS Configuration**:
   - Ensure your AWS environment is configured.
   - Install and configure the AWS CLI:
     ```bash
     aws configure
     ```
     Provide your AWS Access Key, Secret Key, Region, and Output format when prompted.

## Variables

Environment-specific variables are stored in the following path:
```
terraform/environments/{env}.auto.tfvars
```
Replace `{env}` with your desired environment (e.g., `dev`, `staging`, or `prod`).

## Running Terraform Locally

Follow these steps to initialize and apply the Terraform configuration locally:

1. **Navigate to the Terraform Directory**:

   ```bash
   cd .terraform/
   ```

2. **Copy Environment-Specific Variables**:

   ```bash
   cp -r .environment/{env}/* .
   ```
   Replace `{env}` with the appropriate environment (e.g., `dev`, `staging`, `prod`).

3. **Initialize Terraform**:

   ```bash
   terraform init
   ```
   This command initializes the working directory containing Terraform configuration files and downloads the necessary provider plugins.

4. **Review the Plan**:

   ```bash
   terraform plan
   ```
   This command creates an execution plan, detailing the resources Terraform will create, update, or destroy.

5. **Apply the Configuration**:

   ```bash
   terraform apply
   ```
   Confirm the execution to apply the configuration and create the infrastructure.

## Outputs

After applying, Terraform will provide output values, which may include the following:
- Public endpoints for the application
- Resource IDs or ARNs for AWS services

## Notes

- Always double-check the selected environment to avoid unintentional modifications.
- For production environments, ensure proper access control and follow best practices for security and compliance.
- If you encounter issues, check the Terraform logs and ensure your AWS credentials are correctly configured.

## Cleanup

To destroy the infrastructure and clean up resources:

```bash
terraform destroy
```
Ensure you review the plan before confirming destruction to avoid accidental resource removal.


## Building Dockerfile and Running Docker Image Locally

Follow these steps to build the Docker image for the Temperature Converter application and run it locally:

1. **Create the Dockerfile**:

   Ensure your project directory includes a `Dockerfile` with the appropriate instructions to build the application.

2. **Build the Docker Image**:

   ```bash
   docker build -t temperature-converter-app .
   ```
   This command builds a Docker image named `temperature-converter-app` using the `Dockerfile` in the current directory.

3. **Run the Docker Container**:

   ```bash
   docker run -p 3000:3000 temperature-converter-app
   ```
   This command runs the Docker container and maps port `3000` of the container to port `3000` on your local machine.

4. **Access the Application**:

   Open your web browser and navigate to:
   ```
   http://localhost:3000
   ```
   Verify the application is running correctly.
