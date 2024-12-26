terraform {
  backend "s3" {
    region         = "us-east-1"
    bucket         = "terraform-state-us-east-1-060795916737"
    key            = "dev/terraform.tfstate"
    dynamodb_table = "terraform-state-locks"
  }
}