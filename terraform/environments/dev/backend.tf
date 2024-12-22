terraform {
  backend "s3" {
    region         = "us-east-1"
    bucket         = "terraform-state-us-east-1-143912951401"
    key            = "dev/terraform.tfstate"
    dynamodb_table = "terraform-state-locks"
  }
}