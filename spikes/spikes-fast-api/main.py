import shutil
from fastapi import FastAPI, File, UploadFile
import preprocessing as pp
import arrhythmia_service as ars
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
    try:
        record = ars.generate_signal_from_zip(file, temp_dir)
        segments = pp.preprocessing(record)
        class_stats, total = ars.predict(segments)

        for label, stats in class_stats.items():
            print(f"Classe {label}:  {stats['percentage']}%")

            return {
                "message": "Predizione completata",
                "num_segments": total,
                "class_distribution": class_stats
            }
        
    except Exception as e:
        return {"error": str(e)}
    finally:
        shutil.rmtree(temp_dir)
