# --- BİRİNCİ AŞAMA: Derleme (Build) Aşaması ---
# Uygulamayı derlemek için içinde Maven ve JDK bulunan ağır bir imaj kullanıyoruz.
FROM maven:3.9.6-eclipse-temurin-17 AS build

# Konteyner içinde kendimize bir çalışma dizini oluşturuyoruz.
WORKDIR /app

# Projemizin bağımlılık dosyasını (pom.xml) ve kaynak kodlarını (src) konteynere kopyalıyoruz.
COPY pom.xml .
COPY src ./src

# Kodu derleyip çalıştırılabilir bir .jar dosyası üretiyoruz.
RUN mvn clean package -DskipTests

# --- İKİNCİ AŞAMA: Çalıştırma (Production) Aşaması ---
# Sadece uygulamayı çalıştırmak için gereken çok daha hafif bir JRE imajı alıyoruz. (İçinde Maven yok!)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Birinci aşamada (build) üretilen .jar dosyasını alıp bu temiz imaja kopyalıyoruz.
COPY --from=build /app/target/uygulama-0.0.1-SNAPSHOT.jar app.jar

# Uygulamanın dış dünya ile haberleşeceği portu belirtiyoruz.
EXPOSE 8080

# Konteyner ayağa kalktığında çalıştırılacak nihai komutu veriyoruz.
ENTRYPOINT ["java", "-jar", "app.jar"]
