export CORS_ALLOW_ORIGIN="http://localhost:5173;http://localhost:8081"
PORT="${PORT:-8081}"
uvicorn open_webui.main:app --port $PORT --host 0.0.0.0 --forwarded-allow-ips '*' --reload
