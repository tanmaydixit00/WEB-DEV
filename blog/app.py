# ============================================================
# Project Title : Simple Blog Platform (Experiment-5)
# Author        : [Your Name]
# Date          : April 2026
# Description   : A Flask-based blog application implementing
#                 full CRUD operations without a database.
# ============================================================

from flask import Flask, render_template, request, redirect, url_for

# Initialize the Flask application
app = Flask(__name__)

# ─────────────────────────────────────────────────────────────
# In-memory storage for blog posts (no database required)
# Each post is a dict: {id, title, content}
# ─────────────────────────────────────────────────────────────
posts = [
    {
        "id": 1,
        "title": "Welcome to Simple Blog!",
        "content": (
            "This is your very first blog post. "
            "Use the navigation above to create, edit, or delete posts. "
            "Happy blogging!"
        ),
    },
    {
        "id": 2,
        "title": "Getting Started with Flask",
        "content": (
            "Flask is a lightweight Python web framework that makes it easy "
            "to build web applications quickly. This project demonstrates "
            "routing, templates, and in-memory CRUD operations."
        ),
    },
]

# Auto-incrementing ID counter
next_id = 3


# ─────────────────────────────────────────────────────────────
# Helper: find a post by its id
# ─────────────────────────────────────────────────────────────
def find_post(post_id):
    """Return the post dict whose 'id' matches post_id, or None."""
    return next((p for p in posts if p["id"] == post_id), None)


# ─────────────────────────────────────────────────────────────
# Route: Home — list all posts
# ─────────────────────────────────────────────────────────────
@app.route("/")
def index():
    """Display all blog posts on the home page."""
    return render_template("index.html", posts=posts)


# ─────────────────────────────────────────────────────────────
# Route: Create — show form (GET) / save new post (POST)
# ─────────────────────────────────────────────────────────────
@app.route("/create", methods=["GET", "POST"])
def create():
    """Handle creation of a new blog post."""
    global next_id

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        # Basic validation: both fields must be non-empty
        if title and content:
            new_post = {"id": next_id, "title": title, "content": content}
            posts.append(new_post)
            next_id += 1

        return redirect(url_for("index"))

    # GET request → show blank creation form
    return render_template("create.html")


# ─────────────────────────────────────────────────────────────
# Route: Edit — pre-fill form (GET) / save changes (POST)
# ─────────────────────────────────────────────────────────────
@app.route("/edit/<int:post_id>", methods=["GET", "POST"])
def edit(post_id):
    """Handle editing of an existing blog post."""
    post = find_post(post_id)

    # If post doesn't exist, redirect home
    if post is None:
        return redirect(url_for("index"))

    if request.method == "POST":
        title = request.form.get("title", "").strip()
        content = request.form.get("content", "").strip()

        # Update only if both fields are provided
        if title and content:
            post["title"] = title
            post["content"] = content

        return redirect(url_for("index"))

    # GET request → show form pre-filled with existing data
    return render_template("edit.html", post=post)


# ─────────────────────────────────────────────────────────────
# Route: Delete — remove post and redirect home
# ─────────────────────────────────────────────────────────────
@app.route("/delete/<int:post_id>", methods=["POST"])
def delete(post_id):
    """Remove the specified post from storage."""
    global posts
    posts = [p for p in posts if p["id"] != post_id]
    return redirect(url_for("index"))


# ─────────────────────────────────────────────────────────────
# Entry point
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True)
