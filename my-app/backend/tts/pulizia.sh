#!/bin/bash

# Trova e cancella i file più vecchi di 7 giorni
find "/app" -type f -mtime +7 -exec rm -f {} \;