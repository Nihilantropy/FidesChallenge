##################### Kubernetes ##################### 

# Variables
MICROK8S_CMD = sudo microk8s
KUBECTL_CMD = sudo microk8s kubectl
K8S_NAMESPACES_DIR = k8s/namespaces
K8S_POLICY_DIR = k8s/policy
K8S_ISSUER_DIR = k8s/issuer
K8S_CUSTOM_DIR = k8s

NGINX_INGRESS_CHART_VERSION = 4.11.3
NGINX_INGRESS_APP_VERSION = 1.11.3
NGINX_INGRESS_PATH = ./k8s/ingress/controller/nginx/

# Default kube target
kube:
	@echo "Specify what you want to do:\n \
	- make kube-start -- start all the pods\n \
	- make kube-stop -- stop all the pods\n \
	- make kube-delete -- delete all pods in default namespace\n \
	- make kube-import -- build images from docker-compose and import them into microk8s registry\n \
	- make kube-reset -- reset the entire cluster"

# Stops all running pods in the cluster by scaling deployments to 0
kube-stop:
	kubectl get deployments --all-namespaces -o custom-columns=NS:.metadata.namespace,NAME:.metadata.name | tail -n +2 | while read ns name; do \
	kubectl scale deployment $$name --namespace=$$ns --replicas=0; \
	done
	@echo "All pods have been stopped."

# Starts all pods by scaling deployments back to 1 (or more if needed)
kube-start:
	kubectl get deployments --all-namespaces -o custom-columns=NS:.metadata.namespace,NAME:.metadata.name | tail -n +2 | while read ns name; do \
		kubectl scale deployment $$name --namespace=$$ns --replicas=1; \
	done
	@echo "All pods have been started."

# Create a new node and enable necessary add-ons
kube-reset:
	@echo "Resetting cluster..."
	$(MICROK8S_CMD) reset
	@echo "Cluster correctly reset"
	@echo "Initializing MicroK8s and enabling add-ons..."
	@make kube-init

kube-delete:
	@echo "Deleting all PODS in the default namespace..."
	@kubectl delete pod --all -n default
	@kubectl delete job --all -n default
	@kubectl delete pv mysql-pv
	@echo "Done!"


kube-init:
	$(MICROK8S_CMD) start
	$(MICROK8S_CMD) enable dns
	$(MICROK8S_CMD) enable dashboard 
	$(MICROK8S_CMD) enable helm
	$(MICROK8S_CMD) enable cert-manager
	$(MICROK8S_CMD) enable observability
	@echo "MicroK8s setup complete."
	@make apply
	@echo "All Done!"

kube-import:
	@make images
	@echo "Building <images>.tar for Kubernetes import..."
	@docker images --format '{{.Repository}}:{{.Tag}}' | grep -E '^my-app' | { \
		found=false; \
		while read -r image; do \
			found=true; \
			echo "Processing image: $$image"; \
			tarfile=$$(echo $$image | sed 's|/|-|g' | sed 's|:|_|g' | sed 's|_|-|g').tar; \
			echo "Saving $$image to $$tarfile..."; \
			if ! docker save $$image > $$tarfile; then \
				echo "Error: Failed to save image $$image" >&2; \
				exit 1; \
			fi; \
			echo "Importing $$tarfile into MicroK8s..."; \
			if ! microk8s ctr image import $$tarfile; then \
				echo "Error: Failed to import $$tarfile into MicroK8s" >&2; \
				exit 1; \
			fi; \
			echo "Deleting $$tarfile..."; \
			if ! rm $$tarfile; then \
				echo "Error: Failed to delete $$tarfile" >&2; \
				exit 1; \
			fi; \
		done; \
		if [ "$$found" = false ]; then \
			echo "No images found matching '^my-app'. Did you build the images?" >&2; \
			exit 1; \
		fi; \
	}

# ignoring --- using custom proxy-service instead
ingress:
	@echo "Setup for nginx-ingress controller..."
	@mkdir -p ${NGINX_INGRESS_PATH}/manifests
	@helm template ingress-nginx ingress-nginx \
		--repo https://kubernetes.github.io/ingress-nginx \
		--version ${NGINX_INGRESS_CHART_VERSION} \
		--namespace ingress-nginx \
		> ${NGINX_INGRESS_PATH}/manifests/nginx-ingress.${NGINX_INGRESS_APP_VERSION}.yaml
	@helm upgrade ingress-nginx ingress-nginx/ingress-nginx \
		--namespace ingress-nginx \
  		--set controller.admissionWebhooks.certManager=false
	@kubectl create namespace ingress-nginx --dry-run=client -o yaml | kubectl apply -f -
	@kubectl apply -f ${NGINX_INGRESS_PATH}/manifests/nginx-ingress.${NGINX_INGRESS_APP_VERSION}.yaml
	@echo "Applying routing-by-domain"
	@kubectl apply -f ${NGINX_INGRESS_PATH}/features/routing-by-domain.yaml
	@echo "Setup completed!"

# Apply namespace definitions
namespaces:
	@echo "Applying namespace configurations..."
	$(KUBECTL_CMD) apply -f $(K8S_NAMESPACES_DIR)

# Apply network policies
policies:
	@echo "Applying network policy configurations..."
	$(KUBECTL_CMD) apply -f $(K8S_POLICY_DIR)


### activate issuer after the sergio.com domani correctly points to the cluster ingress controller
# issuer:
# 	@echo "Applying issuer configurations..."
# 	$(KUBECTL_CMD) apply -f $(K8S_ISSUER_DIR)
# 	@microk8s kubectl create ingress my-ingress \
#     	--annotation cert-manager.io/issuer=letsencrypt \
#    	--rule 'sergio.com/*=sergio:80,tls=sergio-tls'

# Apply all custom Kubernetes manifests
apply:
	@echo "Applying all Kubernetes configurations..."
	$(KUBECTL_CMD) apply -f $(K8S_CUSTOM_DIR)

# Check cluster and pod status
status:
	@echo "Checking cluster and pod status..."
	$(MICROK8S_CMD) status
	$(KUBECTL_CMD) get nodes
	$(KUBECTL_CMD) get pods --all-namespaces

# Debugging information
debug:
	@echo "Gathering debug information..."
	$(MICROK8S_CMD) inspect
	$(MICROK8S_CMD) kubectl get events --all-namespaces
	$(MICROK8S_CMD) kubectl describe services --all-namespaces
	$(KUBECTL_CMD) describe nodes
	$(KUBECTL_CMD) describe pods --all-namespaces

# Targets
.PHONY: kube kube-start kube-stop kube-reset status namespaces policies apply debug

##################### Docker-compose ##################### 
MAKEFLAGS += -s

# The full setup rule
all: stop prune start show


start:
	clear
	-./mvnw clean package
	-docker compose -f docker-compose.yml up -d --remove-orphans --build

show:
	-echo ============= Conteiner =============
	docker ps -as
	-echo 
	-echo ============= Network =============
	docker network ls
	-echo 
	-echo ============= Volume =============
	docker volume ls
	-echo 

stop:
	docker compose -f docker-compose.yml down -v --rmi all

restart:
	docker compose -f docker-compose.yml restart -v --rmi all

prune:
	-docker stop $$(docker ps -q)
	-docker rm $$(docker ps -a -q)
	-docker rmi -f $$(docker images -q)
	-docker volume rm $$(docker volume ls -q)
	-docker network rm $$(docker network ls -q)
	-docker image prune --all --force
	-docker system prune --all --force --volumes

images:
	@echo "Building images..."
	@docker-compose build --parallel
	@echo "Images build done!"
