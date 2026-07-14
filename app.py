from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from core.logic import subnetear

app = FastAPI()

# Montamos la carpeta de archivos estáticos (JS y CSS)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configuramos la carpeta de plantillas HTML
templates = Jinja2Templates(directory="templates")

# Modelo de datos para validar la entrada (Seguridad ante todo)
class SubnetRequest(BaseModel):
    base_ipv6: str
    prefix: int

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/api/subnet")
async def get_subnets(data: SubnetRequest):
    # Aquí llamamos a tu lógica pura
    try:
        resultados = subnetear(data.base_ipv6, data.prefix)
        return {"status": "success", "data": resultados}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Para correr el servidor: uvicorn app:app --reload
