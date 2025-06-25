Per effettuare il deployment su una macchina diversa, sono state caricate tutte le immagini dei microservizi e le immagini relativi database su dockerHub. In questo modo l'utente attraverso il commando docker pull potrà eseguirle nella sua macchina. 
I vari commando sono: 
1) docker pull clowncraft/auth_microservice:latest      #per scaricare l'immagine del microservizio auth
2) docker pull clowncraft/report_microservice:latest   #per scaricare l'immagine del microservizio report
3) docker pull clowncraft/booking_microservice:latest    #per scaricare l'immagine del microservizio booking
4) docker pull clowncraft/arrhythmia_microservice:latest   #per scaricare l'immagine del microservizio arrhythmia (attenzione: dimensione immagine molto grande: 6gb)
5) docker pull clowncraft/mysql-report:latest			#per scaricare l'immagine del database report
6) docker pull clowncraft/mysql-booking:latest 			#per scaricare l'immagine del database booking
7) docker pull clowncraft/mysql-auth:latest 			#per scaricare l'immagine del database auth

Dopodiché l'utente dovrà soltanto eseguire le immagine scaricate sul proprio docker locale.

