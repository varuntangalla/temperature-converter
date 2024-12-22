data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

module "vpc" {
  source             = "./modules/aws-vpc"
  name               = var.name
  vpc_cidr           = var.vpc_cidr
  enable_nat_gateway = var.enable_nat_gateway
  private_subnets    = var.private_subnets
  public_subnets     = var.public_subnets
  database_subnets   = var.database_subnets
  environment        = var.environment
  additional_tags    = var.additional_tags
}

module "ecs_module" {
  source       = "./modules/ecs"
  cluster_name = var.cluster_name
  services     = var.services
  account_id   = data.aws_caller_identity.current.account_id
  aws_region   = data.aws_region.current.name

  public_subnets              = module.vpc.public_subnets
  private_subnets             = module.vpc.private_subnets
  vpc_id                      = module.vpc.vpc_id
  log_group_retention_in_days = var.log_group_retention_in_days

  alarms = var.alarms

  secrets = var.secrets
}