variable "name" {
  type        = string
  default     = ""
  description = "Name of the resources"
}

variable "environment" {
  type        = string
  default     = ""
  description = "Name of the environment"
}

variable "vpc_cidr" {
  type        = string
  default     = ""
  description = "IPV4 CIDR range for the vpc"
}

variable "private_subnets" {
  type        = list(any)
  default     = []
  description = "List of CIDRS for private subnets"
}

variable "public_subnets" {
  type        = list(any)
  default     = []
  description = "List of CIDRS for public subnets"
}

variable "database_subnets" {
  type        = list(any)
  default     = []
  description = "List of CIDRS for database subnets"
}

variable "additional_tags" {
  type = map(string)
  default = {
    manage-by = "terraform"
  }
  description = "Additional resource tags"
}


variable "enable_nat_gateway" {
  type        = bool
  default     = true
  description = "Create NatGateway"
}

variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
}

variable "services" {
  description = "List of services with their configurations (name, image, container_port, desired_count)"
  type = list(object({
    name           = string
    image          = string
    container_port = number
    desired_count  = number
    memory         = number
    cpu            = number
    max_capacity   = number
    min_capacity   = number

  }))
}

variable "log_group_retention_in_days" {
  description = "Retention period for CloudWatch log groups in days"
  type        = number
  default     = 7
}

variable "alarms" {
  description = "Alarm thresholds for CPU, memory, and request error rates"
  type = object({
    cpu_high_threshold         = number
    memory_high_threshold      = number
    request_5xx_rate_threshold = number
  })
}

variable "secrets" {
  description = "List of secrets from AWS Secrets Manager to be accessed by ECS tasks"
  type        = list(string)
  default     = ["*"]
}
