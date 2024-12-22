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

variable "single_nat_gateway" {
  type        = bool
  default     = true
  description = "Create only one NATGateway"
}




