# Healto – Deployment con Docker

Questa repository contiene i file necessari per il deploy dell’applicazione **Healto**, composta da microservizi backend (Spring Boot e FastAPI) e un frontend Reactjs.

## Prerequisiti

Assicurati di aver installato:

- Docker
- Docker Compose
- Node.js e npm

## Deployment del Backend

1. Posizionati nella cartella principale `healto`
2. Scarica tutte le immagini da Docker Hub con: `docker-compose pull` 
    (Nota: il microservizio arrhythmia_microservice è abbastanza pesante. Il download può richiedere 15-30 minuti, a seconda della connessione.)
3. Avvia i container con: `docker-compose up`

## Avvio del frontend

1. Apri un nuovo terminale e vai nella cartella `healto_frontend`
2. Avvia il frontend con:
- `npm install`
- `npm run dev`

## Attenzione su arrhythmia_microservice
- Questo microservizio esegue una rete neurale abbastanza bisognosa dal punto di vista della RAM
- Sono raccomandati almeno 8GB di RAM dedicati al container per funzionare bene
- Se la RAM assegnata al container è insufficiente, quest'ultimo potrebbe venire chiuso automaticamente durante l’inferenza da Docker, causando errori HTTP.
- Su linux si può aumentare la memoria RAM dedicata a Docker dalle impostazioni, su windows la situazione potrebbe essere diversa. <br>
**Raccomandazione**: Fai una prova, se noti che il container va in crash quando viene invocato da report_microservice, esegui subito dopo il seguente commando:<br>
`docker inspect arrhythmia_microservice --format='{{.State.OOMKilled}}'` <br>
Se restituisce *true*, significa che il container è stato ucciso per esaurimento di memoria quindi dovrai aumentare la RAM dedicata.
