🚀 Scriptify

Scriptify is an interactive learning platform designed to help you master JavaScript through guided lessons, coding challenges, and real-world projects.

Built with Next.js, Prisma, and NextAuth, Scriptify provides a modern, secure, and scalable foundation for learning and experimenting with JavaScript in the browser.

🧑‍💻 Tech Stack

Next.js — Framework for React and SSR/SSG support.

React 19 — Latest React features and improvements.

Prisma — Type-safe ORM for database access (PostgreSQL on AWS RDS).

NextAuth — Secure authentication with support for multiple OAuth providers.

Tailwind CSS — Utility-first CSS framework for styling (planned or included).

AWS Amplify — Deployment and hosting, with CI/CD support.

AWS RDS PostgreSQL — Production-ready relational database.

💡 Features

✅ User authentication with Google and GitHub. ✅ User profile images and account linking✅ Secure database-backed session management (Prisma adapter)✅ Modern, performant frontend with React and Next.js✅ Flexible architecture ready for lesson content, coding challenges, and live preview

⚙️ Setup & Development

1️⃣ Clone the repo

git clone https://github.com/mr-steal-ur-code/scriptify.git
cd scriptify

2️⃣ Install dependencies

npm install

# or

yarn install

3️⃣ Configure environment variables

Create a .env.local file:

DATABASE_URL="your_postgres_connection_string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_generated_secret"

GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

⚠️ Replace placeholders with your actual values.

4️⃣ Run database migrations

npx prisma migrate deploy

Or, for local dev:

npm run db:migrate

5️⃣ Start development server

npm run dev

# or

yarn dev

Then visit http://localhost:3000.

🗄️ Database

Uses PostgreSQL (hosted on AWS RDS).

Prisma schema manages migrations and models.

Auth-related tables (User, Account, Session, etc.) are automatically created and managed by Prisma and NextAuth.

🌟 Future Plans

Interactive JavaScript coding playground

Gamified challenges and achievements

Lesson progress tracking

Personalized learning paths

Community sharing and peer review

🛡️ License

MIT — free to use and modify.

✉️ Contact

For issues, feature requests, or contributions, open an issue or reach out via cj@kutsolutions.com.

Scriptify — Code your way to mastery. 🚀✨
