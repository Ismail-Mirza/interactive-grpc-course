# gRPC Mastery — From Beginner to Production

A 10-lesson interactive course for learning gRPC, built specifically around the FlowGenX B2B cplane↔dplane architecture.

## 🌐 Live Site

Hosted on GitHub Pages: `https://<your-username>.github.io/<repo-name>/`

## 📚 Lessons

| # | Title | Level |
|---|-------|-------|
| 1 | gRPC vs REST — The Why | Beginner |
| 2 | Proto3 Foundations | Beginner |
| 3 | Advanced Proto3 | Beginner+ |
| 4 | Unary RPC | Intermediate |
| 5 | Streaming Patterns | Intermediate |
| 6 | Error Handling | Intermediate |
| 7 | Interceptors, Metadata & Deadlines | Intermediate+ |
| 8 | Security — TLS & JWT Auth | Advanced |
| 9 | Observability, Health & Testing | Advanced |
| 10 | Capstone: Production cplane↔dplane | Capstone |

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `grpc-mastery`)
2. Push all files to the `main` branch
3. Go to **Settings → Pages → Source → Deploy from branch → main / (root)**
4. Visit `https://<username>.github.io/grpc-mastery/`

## 🛠️ Local Preview

```bash
# Any static server works
python -m http.server 8080
# Open http://localhost:8080
```

## 📦 Requirements for Demo Project

```
grpcio>=1.58.0
grpcio-tools>=1.58.0
grpcio-health-checking>=1.58.0
grpcio-reflection>=1.58.0
grpcio-status>=1.58.0
googleapis-common-protos>=1.62.0
protobuf>=4.24.4
PyJWT>=2.8.0
cryptography>=41.0.0
prometheus-client>=0.18.0
pytest>=7.4.0
```
