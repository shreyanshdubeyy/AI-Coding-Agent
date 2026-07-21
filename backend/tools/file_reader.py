import os
from fastapi import UploadFile

UPLOAD_FOLDER = "uploads"

# Create uploads folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

async def read_file(file: UploadFile):
    try:
        # Read uploaded file
        content = await file.read()

        # Save file
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as f:
            f.write(content)

        return {
            "success": True,
            "filename": file.filename,
            "file_path": file_path,
            "content": content.decode("utf-8")
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }