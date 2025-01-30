## 📖 Medium Clone

A fully functional Medium Clone built using modern web technologies for authentication, database management, and performance optimization.

### 🚀 Features
- 📝 Create, Read, Update, and Delete (CRUD) Blogs
- 🔒 Authentication & Authorization using JWT, bcrypt, and salted password hashing
- 🔐 Secure Login & Signup System
- 🌐 Prisma ORM for seamless database interactions
- 🗄️ PostgreSQL Database for efficient data storage
- ⚡ HonoJS as the lightweight backend framework
- ☁️ Cloudflare Workers for backend hosting and scaling
- 🛠 TypeScript for type safety and better code maintainability

### 🛠 Tech Stack
- TypeScript	Used for static typing and better development experience
- HonoJS	Backend framework for handling API routes
- JWT & Bcrypt	Used for authentication and secure password hashing
- Prisma ORM Database ORM for PostgreSQL
- PostgreSQL Relational database for storing user and blog data
- Cloudflare Used as a backend deployment system


### ⚙️ Setup Instructions

1️⃣ Clone the Repository

    git clone https://github.com/yourusername/medium-clone.git
    cd medium-clone

2️⃣ Install Dependencies

    npm install

3️⃣ Setup Environment Variables (.env)

    DATABASE_URL="postgres://user:password@localhost:5432/mediumdb"
    JWT_SECRET="your_jwt_secret_key"
    SALT_ROUNDS=10

4️⃣ Run Database Migrations

    npx prisma migrate dev

5️⃣ Start the Server

    npm run dev

### 📡 API Endpoints

Method	Endpoint	Description
- POST	/api/v1/user/signup	Register a new user
- POST	/api/v1/user/signin	Authenticate user and return JWT
- GET	/api/v1/blog/bulk	Fetch all blog posts
- POST	/api/v1/blog	Create a new blog (Auth required)
- PUT	/api/v1/blog/:id	Update a blog post (Auth required)

### 🛠 Future Improvements
- 🖼️ Image Uploads for blog posts
- 🏷️ Tagging System for better categorization
- 💬 Commenting & Reactions on blog posts
- 📢 User Notifications for engagement
- 📊 Analytics Dashboard for user insights
- 🍪 Cookies-Based Authentication for better security and seamless login sessions
- 📦 State Management using Redux/Recoil for better handling of global states like authentication, user data, and blog posts
