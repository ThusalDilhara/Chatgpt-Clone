ChatGPT Clone — Full-Stack AI Chat Application

 A modern, full-stack ChatGPT-like clone built with **React** and **Appwrite**.  
Deployed on **AWS EC2** with automated **CI/CD pipelines** via **GitHub Actions** & **Docker**.  
Implements secure **Google OAuth2 Authentication** and follows production-grade best practices.

🌟 Features

- 🧠 **AI Chat Interface** — User-friendly chatbot frontend built with React.
- 🔐 **Google OAuth2 Login** — Secure authentication using Appwrite's OAuth2 flow.
- 💾 **Cloud Backend (Appwrite)** — Handles authentication, database, and server-side logic.
- ⚙️ **CI/CD Pipeline** — Automated deployment using GitHub Actions and Docker.
- 🌐 **Live Deployment** — Hosted on AWS EC2 with a real domain:  
[`http://chatgptclone.me`](http://chatgptclone.me)
- 💡 **Error-handling & Security** — Validated OAuth redirect URIs and secured environment.

---

## 🛠️ Tech Stack

| Frontend            | Backend                | DevOps                   |
|---------------------|-------------------------|---------------------------|
| React               | Appwrite (Cloud)       | GitHub Actions (CI/CD)    |
| TailwindCSS         | Appwrite Authentication | Docker                    |
| Vite                | Appwrite Database      | AWS EC2                   |

---

## 🔗 OAuth Setup

1. **Google Cloud Console**:
    - Add `http://chatgptclone.me` as an **Authorized JavaScript Origin**.
    - Add Appwrite’s callback:
      ```
      https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/yourprojectid
      https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/yourprojectid
      ```
2. Configure the **Appwrite Project OAuth** settings to match the Google Client ID and Secret.

3. Your sign-in flow uses:
```javascript
account.createOAuth2Session("google", "http://chatgptclone.me/home", "http://chatgptclone.me/");


⚡ CI/CD Flow
Push code to main branch.

GitHub Actions trigger:

Runs tests.

Builds Docker image.

Deploys to AWS EC2 instance.

Production goes live on https://chatgptclone.me within minutes!

💡 Key Learning Outcomes
Mastered OAuth2 flows with Appwrite and Google Cloud.

Set up real-world cloud deployment on AWS EC2.

Implemented CI/CD automation with Docker & GitHub Actions.

Solved production-grade redirect_uri_mismatch and OAuth security policies.

