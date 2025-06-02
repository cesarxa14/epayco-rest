# 📝 Prueba Tecnica ePayco

**Cesar Torres** 


## 🚀 Tecnologías Usadas

- **NestJS**
- **Servicios Web REST / SOAP**
- **BD SQL - MySQL**
- **TypeORM**



## Instalación

Sigue estos pasos para correr el proyecto en tu máquina local usando Docker y MongoDB.

### 1. Clona el repositorio

```bash
git clone https://github.com/cesarxa14/epayco-rest.git
cd epayco-test
```

### 2. Instala las dependencias

```bash
npm i
```


### 3. Configura tu base de datos local MySQL

Crea un archivo .env y agrega las siguientes variables

```bash
MAIL_USER="tu gmail"
MAIL_PASSWORD="tu contraseña de aplicacion"

DB_HOST=localhost
DB_PORT=3306
DB_NAME="nombre de tu base de datos"
DB_USER="nombre de usuario"
DB_PASSWORD="contraseña mysql"
```

### 4. Corre la aplicación NestJS

```bash
npm run start
```
Abre tu navegador y  verifica el servicio REST en: http://localhost:3000
Abre tu navegador y  verifica el servicio SOAP en: http://localhost:3000/soap?wsdl


## Endpoints

#### 1. Crear cliente:
- Metodo: POST
- URI: http://localhost:3000/rest
- Body: 
```json
{
  "document": "99999",
  "name": "Cesar Torres",
  "email": "cesarf9t@hotmail.com",
  "phone": "99999"
}
```

#### 2. Recargar billetera:
- Metodo: POST
- URI: http://localhost:3000/rest/recharge
- Body: 
```json
{
  "document": "99999",
  "phone": "99999",
  "value": 500
}
```


#### 3. Iniciar pago:
- Metodo: POST
- URI: http://localhost:3000/rest/pay
- Body: 
```json
{
  "document": "99999",
  "phone": "99999",
  "amount": 100
}
```

#### 4. Confirmar pago:
- Metodo: POST
- URI: http://localhost:3000/rest/confirm-payment
- Body: 
```json
{
    "sessionId": "89dd430e-88ab-45fb-875c-eaf34754ada3",
    "token": "332341"
}
```

#### 5. Revisar saldo:
- Metodo: POST
- URI: http://localhost:3000/rest/check-balance
- Body: 
```json
{
    "document": "99999",
    "phone": "99999"
}
```
    
