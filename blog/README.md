# Simple Blog — Experiment 5

A Flask-based blog platform demonstrating full **CRUD** (Create, Read, Update, Delete)
operations using in-memory storage — no database required.

---

## Project Structure

```
simple_blog/
├── app.py                   # Main Flask application
├── templates/
│   ├── base.html            # Base layout (navbar, footer)
│   ├── index.html           # Home page — list all posts
│   ├── create.html          # Create new post form
│   └── edit.html            # Edit existing post form
├── static/
│   └── style.css            # Custom stylesheet
└── README.md
```

---

## Setup & Run

### 1. Install Flask

```bash
pip install flask
```

### 2. Run the application

```bash
cd simple_blog
python app.py
```

### 3. Open in browser

Navigate to: [http://127.0.0.1:5000](http://127.0.0.1:5000)

---

## Features

| Operation | Route | Method |
|-----------|-------|--------|
| List posts | `/` | GET |
| Create post | `/create` | GET, POST |
| Edit post | `/edit/<id>` | GET, POST |
| Delete post | `/delete/<id>` | POST |

---

## External References

- [Flask Documentation](https://flask.palletsprojects.com/) — routing, templates, request handling  
- [Jinja2 Template Docs](https://jinja.palletsprojects.com/) — template inheritance, filters  
- [Google Fonts — DM Serif Display & DM Sans](https://fonts.google.com/) — typography  
- [MDN Web Docs](https://developer.mozilla.org/) — HTML form attributes, CSS variables  

---

## Academic Integrity Statement

This project was written independently as part of Experiment 5.
All code is original. External references are cited above.
