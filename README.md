# Projectnaam

## Beschrijving
Dit project is een **Express server** die gebruikmaakt van de **Sakila MySQL database**.  
De server biedt CRUD-endpoints voor het beheren van data (zoals klanten en films) en rendert pagina’s server-side.  

---

## Installatie

1. Clone de repository:
   ```bash
   git clone https://github.com/jouw-gebruikersnaam/jouw-repo.git
   cd jouw-repo
   ```

2. Installeer dependencies:
   ```bash
   npm install
   ```

3. Maak een `.env` bestand met je eigen databasegegevens:
    ```
   DB_HOST=
   DB_USER=
   DB_PASSWORD=
   DB_DATABASE=
   DB_PORT=
    ```
4. Start de server:
   ```bash
   npm start
   ```

---

## Technologieën

- Node.js  
- Express.js  
- MySQL (`mysql2` package)  
- Pug

---

## Architectuur

- **Controller** → ontvangt HTTP-verzoeken en geeft responses terug  
- **Service** → bevat de business logic en valideert/verwerkt data  
- **DAO (Data Access Object)** → communiceert rechtstreeks met de database via SQL queries  

Non-functionele eisen:
- **Modulariteit**: elke laag mag alleen communiceren met de laag er direct onder  
- **DRY-principe**: geen dubbele code  

---

## Database

- Verbindt met de **Sakila database**  
- Queries worden direct geschreven in SQL  
- **Geen ORM** wordt gebruikt  

---

## Hosting

- De server draait op **Microsoft Azure**  
- Continuous Deployment is ingesteld via GitHub Actions  

---

## Auteur

Vitja Nosa
