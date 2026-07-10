# Çok hafif bir Nginx web sunucusu imajını temel alıyoruz
FROM nginx:alpine

RUN echo "merhaba kaptan"

# Bizim index.html dosyamızı, Nginx'in yayın yaptığı varsayılan klasöre kopyalıyoruz
COPY index.html /usr/share/nginx/html/index.html

# Konteynerin 80 portundan yayın yapacağını belirtiyoruz
EXPOSE 81
