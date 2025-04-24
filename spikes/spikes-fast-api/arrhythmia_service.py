import os
import shutil
import zipfile
import numpy as np
import torch
import wfdb
import LSTMModel as lstm
from collections import Counter

def generate_signal_from_zip(file, temp_dir):
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
    return wfdb.rdrecord(record_path)

def predict(segments):
    device = "cuda" if torch.cuda.is_available() else "cpu"
    loaded_model = lstm.LSTMModel(1, 160, 5, 0.1).to(device)
    loaded_model.load_state_dict(torch.load(f="best_model_with_both_leads.pth", map_location=device))
    loaded_model.eval()
    
    tensor_segments = [
        torch.tensor(seg, dtype=torch.float32).unsqueeze(1) 
        for seg in segments
    ]

    input_batch = torch.stack(tensor_segments)

    with torch.no_grad():
        outputs = loaded_model(input_batch)
        predictions = torch.argmax(outputs, dim=1)
        prediction_list = predictions.tolist()
        counts = Counter(prediction_list)  # con le predizioni per ogni classe, es: Counter({0: 3, 1: 2, 2: 2})


        total = len(prediction_list)
        class_stats = {}
        index_to_label = ['F', 'N', 'S', 'U', 'V']

        # Cicla su ciascuna classe predetta
        for class_index, count in counts.items():

            label = index_to_label[class_index]
            percentage = round(100 * count / total, 2)
            class_stats[label] = {
                "percentage": percentage
            }

        class_stats = dict(sorted(class_stats.items()))
    
    return class_stats, total

