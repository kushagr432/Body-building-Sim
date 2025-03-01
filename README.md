# 🏋️ Bodybuilding Simulator & Protein Factory Challenge 💪

A Next.js application that combines AI-powered bodybuilding advice with an engaging protein factory optimization challenge.

## 🌟 Features

### 🔐 Authentication
- Secure user authentication powered by Supabase
- Google Sign-In integration
- Seamless user management

### 🤖 AI Bodybuilding Advisor
- Real-time bodybuilding advice using GPT-4o-mini
- Get instant answers to questions about:
  - Workout routines
  - Diet plans
  - Recovery strategies
  - Training optimization

### 🏭 Protein Factory Simulator
Challenge yourself with our protein powder factory optimization game!

#### Factory Specifications:
| Machine | Protein/Hour | Electricity/Hour |
|---------|-------------|------------------|
| A       | 10g        | 2kW              |
| B       | 20g        | 5kW              |
| C       | 35g        | 10kW             |
| D       | 50g        | 15kW             |
| E       | 100g       | 40kW             |

**Objective:** Maximize protein production while staying under 50kW power consumption

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd bodybuilding-simulator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_gpt4_api_key
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 🛠️ Built With
- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Authentication
- [GPT-4o-mini](https://openai.com/) - AI Integration
- [v0.dev](https://v0.dev/) - UI Development
- [Vercel](https://vercel.com/) - Deployment

## 📝 Project Structure
```
├── app/
│   ├── components/    # Reusable UI components
│   ├── styles/        # Styles Files
│   └── optimize/        # Optimize Page
├── public/           # Static assets
└── styles/          # CSS styles
```

## 🌐 Deployment
This project is configured for deployment on Vercel. Simply connect your repository to Vercel for automatic deployments.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 🎓 Learning Outcomes
This project provided hands-on experience with modern web development tools and technologies:

### 💻 Technical Skills
- **Next.js**: Built a full-stack application using the latest Next.js features and best practices
- **AI Integration**: Implemented GPT-4 API integration for real-time bodybuilding advice
- **Modern Development Tools**:
  - Used Cursor.ai for intelligent code assistance and pair programming
  - Leveraged v0.dev for rapid UI prototyping and design
  - Implemented authentication with Supabase

### 🧠 Key Takeaways
- Full-stack application architecture
- AI-powered feature implementation
- Modern UI/UX design principles
- Authentication and security best practices
- Resource optimization algorithms

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
