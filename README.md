# Lead Management System

A full-stack Lead Management module built with **Laravel 12**, **Inertia.js**, and **React**.

---

## Features

- **Full Lead CRUD**: Create, read, update, and delete leads using Inertia `useForm` with proper validation handling.
- **Server-Side Data Operations**:
  - Pagination
  - Real-time search by Name and Email
  - Filter by Status (e.g., New, Contacted, Qualified, Lost)
  - Sorting by columns (Name, Date, Status, etc.)
- **Clean Architecture**:
  - Zero business logic inside React components / views.
  - Proper form requests for server-side validation.
  - Service/Policy based separation of concerns.

### Bonus Features Implemented
- **Soft Deletes**: Leads can be safely soft-deleted without permanent data loss.
- **Authorization Policies**: Laravel Policy configured for lead deletion and role-based permissions.
- **Inline Status Update**: Fast status updates directly from the lead table view without a full page reload.

---

## Tech Stack

- **Backend**: Laravel 12, PHP 8.3+
- **Frontend**: React (TypeScript/TSX), Inertia.js, Tailwind CSS
- **Database**: MySQL

---

## Installation & Setup

Follow these steps to set up and run the project locally:

1. Clone the Repository
Bash :
git clone <your-repository-url>
cd lead-management

2. Install PHP & Node Dependencies
Bash :
    composer install
    npm install

3. Environment Configuration
Copy .env.example to .env and configure your database settings:

Bash : 
    cp .env.example .env
    php artisan key:generate
Update your .env file with your MySQL credentials:

Code snippet
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lead_management
DB_USERNAME=root
DB_PASSWORD=

4. Run Database Migrations & Seeders

Bash : php artisan migrate --seed

5. Compile Assets & Start Development Servers
Run the Vite development server:

Bash : npm run dev
In a separate terminal, start the Laravel server:

Bash : php artisan serve

Now open http://127.0.0.1:8000 in your browser.

👤 Default Login Credentials (if seeded)
Email: axel@leads.com
Password: password