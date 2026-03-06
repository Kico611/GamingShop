# GamingShop 🎮

> Fullstack web aplikacija za online prodaju gaming opreme — korisnici pretražuju i kupuju proizvode, a administratori upravljaju katalogom i korisnicima putem zaštićenog admin panela.

---

## 🧩 O projektu

GamingShop je e-commerce aplikacija namijenjena prodaji gaming periferne opreme (miševi, tipkovnice, slušalice). Korisnici mogu pregledavati proizvode po kategorijama, dodavati ih u košaricu i kontaktirati prodavaoca. Administratori imaju potpuni CRUD nad proizvodima i korisnicima kroz poseban admin sučelje.

---

## ✨ Funkcionalnosti

### 🛍️ Korisničko sučelje
- Pregled svih proizvoda na glavnoj stranici
- **Filtriranje po kategorijama:** miš, tipkovnica, slušalice
- Reklamni banner (Ads komponenta)
- **Košarica** — dodavanje/uklanjanje proizvoda, odabir količine, automatski izračun cijene (podzbroj + 5% PDV + dostava 10€)
- Registracija i prijava korisnika s hashiranom lozinkom (bcrypt)
- Kontakt stranica
- Responzivni dizajn

### 🔐 Admin panel (zaštićene rute)
- Pregled svih korisnika s mogućnošću uređivanja i brisanja
- Kreiranje novih korisnika s dodjelom uloge (admin / user)
- Pregled svih proizvoda s mogućnošću uređivanja i brisanja
- Dodavanje novih proizvoda s uploadom slike (pohrana u MySQL kao BLOB)
- Bočna navigacija (SideNav) za brzo kretanje

---

## 🛠️ Tech stack

| Sloj | Tehnologija |
|---|---|
| **Backend** | Node.js, Express.js |
| **Baza podataka** | MySQL |
| **Autentifikacija** | bcrypt (hashiranje lozinki) |
| **Upload slika** | Multer (memory storage → MySQL BLOB) |
| **Frontend** | React 18, React Router v6 |
| **UI komponente** | MUI (Material UI), Bootstrap 5 |
| **State management** | React Context API (CartContext, UserContext) |

---

## 📁 Struktura projekta

```
GamingShop/
├── GamingShop(ER).png          # ER dijagram baze podataka
│
├── backend/
│   ├── server.js               # Express server — svi API endpointi
│   └── package.json
│
└── frontend/
    └── src/
        ├── App.js              # Routing i layout aplikacije
        ├── CartContext.js      # Globalni state košarice (useReducer)
        ├── UserContext.js      # Globalni state korisnika
        ├── AuthContext.jsx     # Autentifikacijski context
        ├── ProtectedRoutes.jsx # Zaštita admin ruta
        └── components/
            ├── Navbar/         # Navigacijska traka s košaricom i prijavom
            ├── Menu/           # Filtriranje po kategorijama
            ├── Ads/            # Reklamni banner
            ├── Main/           # Prikaz proizvoda
            ├── Product/        # Kartica pojedinog proizvoda
            ├── Cart/           # Košarica s izračunom cijene
            ├── Login/          # Prijava i registracija
            ├── Contact/        # Kontakt forma
            ├── Footer/         # Footer
            └── Admin/
                ├── Admin.js        # Admin layout
                ├── SideNav.js      # Bočna navigacija
                ├── Products.js     # Prikaz svih proizvoda
                ├── ProductList.js  # Lista proizvoda
                ├── AddProduct.js   # Forma za dodavanje proizvoda
                ├── AddForm.js      # Komponenta forme
                ├── EditProducts.js # Uređivanje proizvoda
                ├── Users.js        # Prikaz svih korisnika
                ├── UserList.js     # Lista korisnika
                └── EditUser.js     # Uređivanje korisnika
```

---

## 🗄️ Baza podataka

ER dijagram dostupan je u datoteci `GamingShop(ER).png`.

Glavne tablice:

```sql
user (UserID, Username, Password, role)
product (ProductID, Name, CategoryID, Brand, Description, Price, Color, StockQuantity, Image)
```

Slike proizvoda pohranjuju se kao `BLOB` u MySQL-u i šalju frontendu kao Base64 string.

---

## 🔌 API endpointi

| Metoda | Ruta | Opis |
|---|---|---|
| `POST` | `/register` | Registracija korisnika |
| `POST` | `/login` | Prijava korisnika |
| `GET` | `/dohvati` | Dohvat svih proizvoda |
| `GET` | `/getProduct/:id` | Dohvat jednog proizvoda |
| `POST` | `/addProduct` | Dodavanje novog proizvoda (s uploadom slike) |
| `PUT` | `/updateProduct/:id` | Ažuriranje proizvoda |
| `DELETE` | `/deleteProduct/:id` | Brisanje proizvoda |
| `GET` | `/korisnici` | Dohvat svih korisnika |
| `GET` | `/getUser/:id` | Dohvat jednog korisnika |
| `POST` | `/createUser` | Kreiranje korisnika (admin) |
| `PUT` | `/updateUser/:id` | Ažuriranje korisnika |
| `DELETE` | `/deleteUser/:id` | Brisanje korisnika |

---

## 🚀 Pokretanje lokalno

### Preduvjeti

- Node.js 18+
- MySQL baza podataka

### 1. Kloniraj repozitorij

```bash
git clone https://github.com/Kico611/GamingShop.git
cd GamingShop
```

### 2. Backend

```bash
cd backend
npm install
```

Konfiguriraj MySQL konekciju u `server.js`:

```js
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'tvoj_korisnik',
    password: 'tvoja_lozinka',
    database: 'tvoja_baza'
});
```

Pokreni backend:

```bash
npm start
```

Server radi na: `http://localhost:9000`

### 3. Frontend

```bash
cd frontend
npm install
npm start
```

Frontend radi na: `http://localhost:3000` (proxy prema portu 9000 je već konfiguriran)

---

## 🔐 Uloge korisnika

| Uloga | Pristup |
|---|---|
| `user` | Pregled proizvoda, košarica, kontakt |
| `admin` | Sve korisničke funkcionalnosti + admin panel (`/admin`) |

---
