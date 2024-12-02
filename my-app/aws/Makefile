# Define variables
AWS_REGION := eu-central-1
AWS_ACCOUNT_ID := 976193259173
IMAGES := \
	my-app_backend-tts \
	my-app_proxy \
	my-app_backend-stories \
	my-app_backend-migration \
	my-app_backend-users \
	my-app_db \
	my-app_frontend-expo

# Define a target repository for each image
REPOSITORIES := $(addprefix $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/, $(IMAGES))

# Default rule
.PHONY: all
all: push-all

# Rule to create an ECR repository if it doesn't exist
define create_ecr_repo
	@echo "Ensuring ECR repository for $(1) exists..."
	@aws ecr describe-repositories --repository-name $(1) --region $(AWS_REGION) > /dev/null 2>&1 || \
	aws ecr create-repository --repository-name $(1) --region $(AWS_REGION)
endef

# Rule to tag a Docker image
define tag_docker_image
	@echo "Tagging Docker image $(1)..."
	@docker tag $(1):latest $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(1):latest
endef

# Rule to push a Docker image to ECR
define push_docker_image
	@echo "Pushing Docker image $(1) to ECR..."
	@docker push $(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com/$(1):latest
endef

# Target to process each image
.PHONY: push-all
push-all: $(IMAGES)
	@echo "All images have been pushed to ECR."

$(IMAGES):
	@$(call create_ecr_repo,$@)
	@$(call tag_docker_image,$@)
	@$(call push_docker_image,$@)
