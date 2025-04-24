# main.py
import os
import shutil
import zipfile
from fastapi import FastAPI, File, UploadFile
import wfdb
import numpy as np
import preprocessing as pp
import torch
import LSTMModel as lstm
from collections import Counter
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # oppure ["*"] per tutte le origini (solo per test!)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    temp_dir = "temp_upload"
    os.makedirs(temp_dir, exist_ok=True)

    # Salva il file zip
    zip_path = os.path.join(temp_dir, file.filename)
    with open(zip_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Estrai lo zip
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(temp_dir)

    # Trova il nome del record (senza estensione)
    all_files = os.listdir(temp_dir)
    hea_files = [f for f in all_files if f.endswith('.hea')]
    if not hea_files:
        return {"error": "Nessun file .hea trovato nel pacchetto ZIP"}
    
    record_name = os.path.splitext(hea_files[0])[0]
    record_path = os.path.join(temp_dir, record_name)

    # Legge il segnale con wfdb
    try:
        record = wfdb.rdrecord(record_path)
        signal = record.p_signal[:, 0]  # numpy array (samples x channels)
        print("Segnale shape:", signal.shape)
        segments = pp.preprocessing(record)
        device = "cuda" if torch.cuda.is_available() else "cpu"
        loaded_model = lstm.LSTMModel(1, 160, 5, 0.1).to(device)
        loaded_model.load_state_dict(torch.load(f="best_model_with_both_leads.pth", map_location=device))
        print("modello caricato")
        loaded_model.eval()
        
        tensor_segments = [
            torch.tensor(seg, dtype=torch.float32).unsqueeze(1) 
            for seg in segments
        ]
        print("tensori creati")

        input_batch = torch.stack(tensor_segments)
        print(f"input_batch shape: {input_batch.shape}")

        print("stack creato")
        with torch.no_grad():
            print("torch nograd")
            outputs = loaded_model(input_batch)         # [B, num_classes]
            print("predizione fatta")
            predictions = torch.argmax(outputs, dim=1)

            #num_segments = len(segments)
            prediction_list = predictions.tolist()

            counts = Counter(prediction_list)  # es: Counter({0: 3, 1: 2, 2: 2})

            # Numero totale di segmenti
            total = len(prediction_list)

            # Calcola percentuali
            class_stats = {}
            index_to_label = ['F', 'N', 'S', 'U', 'V']

            # Cicla su ciascuna classe predetta
            for class_index, count in counts.items():
                # Converti indice numerico in etichetta testuale
                label = index_to_label[class_index]

                # Calcola la percentuale
                percentage = round(100 * count / total, 2)

                # Aggiungi al dizionario
                class_stats[label] = {
                    "percentage": percentage
                }

            # Ordina per classe (opzionale)
            class_stats = dict(sorted(class_stats.items()))


            # Stampa
            for label, stats in class_stats.items():
                print(f"Classe {label}:  {stats['percentage']}%")


            return {
                "message": "Predizione completata",
                "num_segments": total,
                "class_distribution": class_stats
            }
        
        # Puoi passarlo al tuo modello qui, ad esempio:
        # prediction = model(torch.tensor(signal).unsqueeze(0).float())
        # return {"prediction": prediction.tolist()}
        
       # return {"message": "File ricevuto e segnale letto", "shape": signal.shape}
    except Exception as e:
        return {"error": str(e)}
    finally:
        shutil.rmtree(temp_dir)
