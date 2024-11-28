MAKEFLAGS += -s

all: stop prune start show

kube:
	-kubectl apply -f ./k8s

kube-rebuild:
	@kubectl get deployments -n default -o name | \
	while read deployment; do \
		echo "Restarting $$deployment..."; \
		kubectl rollout restart $$deployment -n default; \
	done

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