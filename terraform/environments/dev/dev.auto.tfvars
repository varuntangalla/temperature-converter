name               = "student-app"
vpc_cidr           = "10.0.0.0/16"
enable_nat_gateway = true
private_subnets    = ["10.0.16.0/22", "10.0.20.0/22", "10.0.24.0/22"]
public_subnets     = ["10.0.32.0/25", "10.0.33.0/25", "10.0.34.0/24"]
database_subnets   = ["10.0.28.0/23", "10.0.30.0/23"]
environment        = "dev"
additional_tags = {
  environment = "dev",
  managed-by  = "Terraform"
}

cluster_name = "student-temp-app-dev"
services = [
  {
    name           = "temp-converter"
    image          = "143912951401.dkr.ecr.us-east-1.amazonaws.com/temp-converter:latest"
    container_port = 3000
    desired_count  = 2
    memory         = 512
    cpu            = 256
    max_capacity   = 5
    min_capacity   = 1
  }
]
log_group_retention_in_days = 7

alarms = {
  cpu_high_threshold         = 80
  memory_high_threshold      = 75
  request_5xx_rate_threshold = 5
}
