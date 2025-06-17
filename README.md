# 📁 Organigramma Aziendale

> **Web application per la gestione di aziende, dipendenti e organigrammi gerarchici**

Questa applicazione consente di creare e visualizzare organigrammi dinamici per ogni azienda, con dipendenti assegnati a ruoli e reparti specifici. Il sistema è supportato da un database relazionale completo e un'architettura full-stack moderna.

---

## 🚀 Funzionalità Principali

- **Gestione completa** di aziende, dipendenti e ruoli (CRUD)
- **Organigramma interattivo** per ogni azienda
- **Persistenza dati** tramite Hibernate su database SQL
- **REST API** per comunicazione tra frontend e backend

---

## 🛠️ Stack Tecnologico

| **Backend** | **Frontend** |
|-------------|--------------|
| Java | JavaScript |
| Spring Boot | React.js |
| Hibernate (JPA) | Node.js & npm |
| MySQL/MariaDB | Material UI (MUI) |
| RESTful API | React Redux |

---

## 📊 Data Model

🔗 **[Visualizza il Data Model completo](https://docs.google.com/spreadsheets/d/1xv8NQwKt-qy8W41sehuZbiq-B84vz8JdhN2cjZT-YuU/edit)**

---

## 🗂️ Struttura del Progetto

```
.
├── DB/
│   └── org_chart.sql                 # Script SQL del database
├── DataModel/
│   ├── VisualParadigm/
│   └── orgchart_datamodel.xlsx
├── Progettazione/
│   └── Mock-Up.pdf
├── org_chart/                        # Cartella principale
│   ├── backend/                      # Codice Spring Boot
│   └── frontend/                     # Codice React
├── LICENSE
└── README.md
```
---

📚 Documentazione:
- [Installazione](docs/INSTALLATION.md)
- [Accesso utenti e permessi](docs/ACCESS.md)

---