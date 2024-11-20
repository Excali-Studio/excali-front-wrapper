FROM node:22-alpine as builder

ARG VITE_API_BASE_URL=https://excali.silk-sh.eu/api
ARG VITE_AUTH_REDIRECT_URL=/auth/google/login
ARG VITE_APP_BACKEND_V2_GET_URL=https://excali.silk-sh.eu/api/
ARG VITE_APP_BACKEND_V2_POST_URL=https://excali.silk-sh.eu/api/
ARG VITE_CANVAS_STATE_SAVE_DEBOUNCE_TIMEOUT=200
ARG VITE_DISABLE_TAGS_MANAGER=false
ARG VITE_DISABLE_USERS_PAGE=true


ARG VITE_APP_WS_SERVER_URL=http://room:8888/
ARG VITE_USER_MOUSE_SYNC_THROTTLE=33

WORKDIR /app
COPY . .

RUN npm install -g pnpm@9

RUN pnpm install
RUN pnpm build

FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /var/www/html
EXPOSE 80
