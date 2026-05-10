# Modular Drag-and-Drop Page Builder & Enterprise CMS

A highly customizable, modular Content Management System (CMS) built with PHP 8.x and the Laminas framework. The core philosophy of this project is **strict modular independence** combined with an advanced, block-based visual layout engine.

## 🏗️ Architectural Core: 100% Independent Modules
The system is built as a collection of decoupled components. Each module is fully self-contained and can be integrated into **any existing Laminas application** without breaking dependencies:

* **Admin Module:** Handles the secure dashboard backend, configuration, and central management.
* **Pages Module:** Manages dynamic routing, layout fetching, and frontend rendering engine.
* **Layout Module:** Controls the structural canvas and grid systems for the site.
* **Roadmap (Upcoming Modules):** Fully decoupled Auth & Registration module, User Profiles, and Media Manager.

## 🚀 Advanced Block-Based Visual Builder
Unlike rigid CMS systems, this platform treats pages as a collection of flexible, customizable blocks:
* **Total Positioning Freedom:** Blocks can be arranged in any order using a drag-and-drop mechanism. Users can place, swap, and nest blocks anywhere on the page canvas.
* **Granular Element Styling:** Every individual element inside a block features a dedicated styling form. Users can inject custom CSS properties and visual styles directly from the UI.
* **Reusability:** Any block layout can be cloned or repeated across different parts of the website seamlessly.

## 🛠️ Tech Stack
* **Backend:** PHP 8.x, Laminas Framework (Enterprise-grade MVC architecture)
* **Database:** MySQL / MariaDB (Relational layout structures & dynamic block configurations)
* **Frontend:** Vanilla JavaScript (Drag-and-Drop API, Fetch API for asynchronous state saving), CSS3, HTML5

## 🚦 Local Setup
1. Clone the repository:
   ```bash
   git clone github.com
   ```
2. Install dependencies via Composer:
   ```bash
   composer install
   ```
3. Configure your database credentials in `config/autoload/local.php` and run migrations.
