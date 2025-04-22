# main.py
import os
import shutil
import zipfile
from fastapi import FastAPI, File, UploadFile
import wfdb
import numpy as np
import preprocessing as pp

app = FastAPI()

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

        """tensor_segments = [
            torch.tensor(seg, dtype=torch.float32).unsqueeze(0)  # shape: [1, L]
            for seg in segments
        ]

         input_batch = torch.stack(tensor_segments)
         with torch.no_grad():
            outputs = model(input_batch)         # [B, num_classes]
            predictions = torch.argmax(outputs, dim=1)

        return {
            "message": "Predizione completata",
            "num_segments": len(segments),
            "predictions": predictions.tolist()
        }"""
        # Puoi passarlo al tuo modello qui, ad esempio:
        # prediction = model(torch.tensor(signal).unsqueeze(0).float())
        # return {"prediction": prediction.tolist()}
        
        return {"message": "File ricevuto e segnale letto", "shape": signal.shape}
    except Exception as e:
        return {"error": str(e)}
    finally:
        shutil.rmtree(temp_dir)
