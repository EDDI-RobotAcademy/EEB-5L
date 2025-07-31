FROM node:20 AS builder

WORKDIR /app
#COPY . .
#
#RUN npm install -g pnpm \
#  && pnpm install \
#  && pnpm run build
#
#FROM nginx:alpine
#
## nginx 설정 복사
#COPY docker/nginx.conf /etc/nginx/nginx.conf
#
## dist 전체 복사
#COPY --from=builder /app/dist /usr/share/nginx/html
#
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

# 소스 전체 복사
COPY . .

# 빌드 실행
RUN npm install \
  && npm run build

FROM nginx:alpine

# nginx 설정 복사
COPY docker/nginx.conf /etc/nginx/nginx.conf

# 각 앱 dist를 nginx 경로에 맞게 복사
COPY --from=builder /app/html-container/dist /usr/share/nginx/html/html-container
COPY --from=builder /app/navigation-bar-app/dist /usr/share/nginx/html/navigation-bar-app
COPY --from=builder /app/vue-board-app/dist /usr/share/nginx/html/vue-board
COPY --from=builder /app/dice-game-app/dist /usr/share/nginx/html/dice-game-app
COPY --from=builder /app/authentication-app/dist /usr/share/nginx/html/authentication-app
COPY --from=builder /app/game-chip-app/dist /usr/share/nginx/html/game-chip-app
COPY --from=builder /app/cart-app/dist /usr/share/nginx/html/cart-app

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]