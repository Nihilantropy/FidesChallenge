MAKEFLAGS += -s

all: stop prune start show

kube:
	docker-compose build
	-kubectl apply -f ./k8s
	-kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
	-kubectl get pod
	-kubectl get svc
	-kubectl get secret
	-kubectl get ingress
	-kubectl get pods -n ingress-nginx
	-curl http://sergio.local

start:
	clear
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