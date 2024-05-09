from fastapi import APIRouter, Depends,HTTPException, Path, Response, UploadFile, File
from core.utils import validate_filename
from fastapi.responses import FileResponse
from models import User
from core.security import validate_token
from os.path import exists

router = APIRouter(prefix="/files", tags=["files"])

@router.get("/markdown/{filename:path}")
async def get_markdown(filename: str = Path(...),user: User = Depends(validate_token)):
    validate_filename(filename)
    file_path = f'markdown/{filename}'
    print(file_path)
    if exists(file_path):
        return FileResponse(file_path)
    raise HTTPException(status_code=404, detail="File not found")

@router.put("/markdown/{filename:path}")
async def update_markdown(filename: str = Path(...), file: UploadFile = File(...),user: User = Depends(validate_token)):
    validate_filename(filename)
    if user.permission != 1:
        raise HTTPException(status_code=403, detail="Permission denied")
    # if exists(file_path):
    #     return Response(status_code=400, content="Filename already exists. Please choose another name.")
    file_path = f'markdown/{filename}'
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    return {"message": "File updated successfully"}
