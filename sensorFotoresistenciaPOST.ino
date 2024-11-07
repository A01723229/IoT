#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>

#define yPin D5      // Pin de entrada del sensor de luz
#define rPin D7      // Pin de salida para controlar la lámpara
#define lightPin A0

#define WIFI_SSID "Tec-IoT"
#define WIFI_PASSWORD "spotless.magnetic.bridge"

HTTPClient httpClient;
WiFiClient wClient;
String URL_POST = "http://10.22.239.185:3000/iot_proyectointegrador/api/insertLog"; // URL para la solicitud POST

int lightVal;
int umbralLuz = 100;  // Umbral de luz para activar la lámpara


void setup() {
  Serial.begin(9600);      
  pinMode(lightPin, INPUT); // Define el pin de la fotoresistencia como entrada
  pinMode(yPin, OUTPUT);    // Define el pin del LED verde como salida
  pinMode(rPin, OUTPUT);    // Define el pin del LED rojo como salida

  digitalWrite(yPin, LOW);  // Inicializa el LED verde en apagado
  digitalWrite(rPin, LOW);  // Inicializa el LED rojo en apagado
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando a red WiFi ");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConectado a WiFi!");
}

void loop() {
   // Leer la fotoresistencia
  lightVal = analogRead(lightPin);
  Serial.print("Lectura de luz: ");
  Serial.println(lightVal);
  delay(500);

  // Controlar LEDs según la luz
  if(lightVal < umbralLuz) {
    digitalWrite(yPin, HIGH);  // Encender LED verde
    digitalWrite(rPin, LOW);   // Apagar LED rojo
  } else {
    digitalWrite(yPin, LOW);   // Apagar LED verde
    digitalWrite(rPin, HIGH);  // Encender LED rojo
  }

  delay(1000);  // Delay 1 segundo entre lecturas

  // Enviar datos al servidor mediante POST
  enviarLecturaLuz(lightVal);

  delay(15000);  // Esperar 15 segundos antes de la siguiente lectura
}

void enviarLecturaLuz(int lecturaLuz) {
  Serial.print("Dirección IP: ");
  Serial.println(WiFi.localIP());

  if (WiFi.status() == WL_CONNECTED) {
    delay(100);
    String payload = "{\"serialNumber\":\"LDR01\",\"valor\":" + String(lecturaLuz) + "}";

    httpClient.begin(wClient, URL_POST.c_str());
    httpClient.addHeader("Content-Type", "application/json");
    
    int httpResponseCode = httpClient.POST(payload);
    
    Serial.print("Código de respuesta HTTP: ");
    Serial.println(httpResponseCode);

    if (httpResponseCode > 0) {
      Serial.println("Respuesta del servidor: " + httpClient.getString());
    } else {
      Serial.println("Error en la solicitud HTTP POST");
    }

    httpClient.end();
  } else {
    Serial.println("Error: No conectado a WiFi");
  }
}
