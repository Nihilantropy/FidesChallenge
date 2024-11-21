#!/bin/bash

# Verifica se Minikube è installato
if ! command -v minikube &> /dev/null
then
    echo "Minikube non è installato. Installalo prima di eseguire lo script."
    exit 1
fi

# 1. Avvia Minikube (assicurati di avere i privilegi di amministratore per eseguire il tunnel)
echo "Avvio di Minikube..."
minikube startr

# 2. Creazione delle pod nel cluster Kubernetes
# Assumiamo che tu abbia i file YAML delle pod nella cartella "k8s" nella tua directory attuale
echo "Creazione delle pod nel cluster Kubernetes..."
kubectl apply -f ./k8s

# 3. Aggiungi una pausa di 10 secondi prima di eseguire il comando kubectl get pods
echo "Aspetto 10 secondi prima di controllare le pods..."
sleep 10

# 4. Mostra lo stato delle pod per confermare che sono in esecuzione
echo "Verifica lo stato delle pod..."
kubectl get pod
