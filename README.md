# Lead Management System (Laravel 12 + Inertia.js + React)

A full-stack lead management module built as part of the Axel Technology Machine Test.

## Prerequisites
- PHP: ^8.3
- Node.js
- Composer
- MySQL

## Setup Instructions

1. **Clone the repository and enter directory:**
   ```bash
   git clone <repo-url>
   cd lead-management

    1. Install PHP and Node dependencies:
        composer install
        npm install
    2. Run Migrations & Seeders:
        php artisan migrate --seed
    3. Start Development Servers:
        npm run dev
        php artisan serve