#!/bin/bash

# 2. Cerca tutte le immagini che iniziano con "my-app-" e caricale su Minikube
echo "Scaricamento e caricamento delle immagini Docker che iniziano con 'my-app_*'..."

# Elenco tutte le immagini locali che iniziano con "my-app-" e le carico su Minikube
for image in $(docker images --format '{{.Repository}}' | grep '^my-app_'); do
  echo "Pullo l'immagine: $image"
  docker pull $image
  minikube image load $image
done

# 3. Creazione delle pod nel cluster Kubernetes
# Assumiamo che tu abbia i file YAML delle pod nella cartella "k8s" nella tua directory attuale
echo "Creazione delle pod nel cluster Kubernetes..."
kubectl apply -f ./k8s

# 4. Aggiungi una pausa di 10 secondi prima di eseguire il comando kubectl get pods
echo "Aspetto 10 secondi prima di controllare le pods..."
sleep 10

# 5. Mostra lo stato delle pod per confermare che sono in esecuzione
echo "Verifica lo stato delle pod..."
kubectl get pod
