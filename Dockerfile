FROM node:22-alpine as builder

WORKDIR /app
COPY . .

RUN npm install -g pnpm@9

RUN pnpm install
RUN pnpm build

FROM nginx
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /var/www/html
EXPOSE 80