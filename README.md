# ⚡ gRPC Mastery — From Beginner to Production

> An interactive 10-lesson course for learning gRPC from scratch, built around a real-world **B2B Control Plane ↔ Data Plane** architecture using Python.

[![GitHub Pages](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-4f46e5?style=for-the-badge&logo=github)](https://ismail-mirza.github.io/interactive-grpc-course/)
[![Lessons](https://img.shields.io/badge/Lessons-10-06b6d4?style=for-the-badge)](https://ismail-mirza.github.io/interactive-grpc-course/)
[![Language](https://img.shields.io/badge/Language-Python-3776ab?style=for-the-badge&logo=python)](https://grpc.io/docs/languages/python/)

---

## 🌐 Live Course

**[https://ismail-mirza.github.io/interactive-grpc-course/](https://ismail-mirza.github.io/interactive-grpc-course/)**

---

## 🎯 What You'll Learn

By the end of this course you will be able to:

- Write `.proto` files and generate Python client/server stubs with `protoc`
- Build gRPC servers and clients in Python using all 4 RPC patterns
- Implement **bidirectional streaming** for persistent, firewall-traversing connections
- Handle errors correctly using gRPC status codes and the rich error model
- Write **server and client interceptors** for logging, auth, and tracing
- Secure gRPC channels with **TLS** and authenticate clients with **JWT**
- Add **Prometheus metrics**, **OpenTelemetry tracing**, and **health checks**
- Build a complete **production-grade cplane↔dplane system** with reconnection backoff

---

## 🏗️ What You'll Build

A mini version of a real B2B deployment system — a **Control Plane** (cloud) that manages multiple **Data Plane** clients (customer networks):

```
grpc-demo/
├── proto/
│   └── cplane.proto          # Service contract (Lessons 2–3)
├── cplane/
│   ├── server.py             # gRPC server with TLS + JWT (Lessons 4–9)
│   ├── interceptors.py       # Logging, auth, metrics middleware (Lesson 7)
│   ├── auth.py               # JWT token generation/validation (Lesson 8)
│   └── metrics.py            # Prometheus metrics (Lesson 9)
├── dplane/
│   ├── client.py             # gRPC client with streaming (Lessons 4–9)
│   └── reconnect.py          # Exponential backoff reconnection (Lesson 10)
├── certs/                    # TLS certificates (Lesson 8)
└── docker-compose.yml        # Full stack (Lesson 10)
```

**Architecture:**
```
[dplane 1] ──┐
[dplane 2] ──┤── bidirectional gRPC stream ──► [cplane server]
[dplane N] ──┘    (TLS + JWT + heartbeat)        (cloud)
```

---

## 📚 Course Curriculum

| # | Lesson | Level | Key Topics |
|---|--------|-------|------------|
| 1 | [gRPC vs REST — The Why](lesson-01.html) | Beginner | HTTP/2, Protobuf vs JSON, 4 RPC types, when to use gRPC |
| 2 | [Proto3 Foundations](lesson-02.html) | Beginner | Scalar types, messages, enums, services, protoc codegen |
| 3 | [Advanced Proto3](lesson-03.html) | Beginner+ | oneof, map, well-known types (Timestamp), backward compatibility |
| 4 | [Unary RPC](lesson-04.html) | Intermediate | Channel, stub, servicer, gRPC status codes |
| 5 | [Streaming Patterns](lesson-05.html) | Intermediate | All 4 RPC types, bidirectional streaming, asyncio |
| 6 | [Error Handling](lesson-06.html) | Intermediate | Status codes, rich error model, retryable vs fatal errors |
| 7 | [Interceptors, Metadata & Deadlines](lesson-07.html) | Intermediate+ | Middleware, trace IDs, timeout propagation |
| 8 | [Security — TLS & JWT Auth](lesson-08.html) | Advanced | OpenSSL certs, ssl_channel_credentials, JWT interceptors |
| 9 | [Observability, Health & Testing](lesson-09.html) | Advanced | Prometheus, OpenTelemetry, grpcurl, pytest |
| 10 | [Capstone: Production cplane↔dplane](lesson-10.html) | Capstone | Exponential backoff, heartbeat, Docker Compose, production checklist |

---

## ✨ Course Features

- **Interactive exercises** — each lesson has a task with a hidden solution reveal
- **YouTube video links** — curated videos for every lesson topic
- **Progress tracking** — completion saved in `localStorage`, visible on the home page
- **Annotated code examples** — syntax-highlighted with copy-to-clipboard
- **Architecture callouts** — "how this maps to production" explainers on key patterns
- **Copy-paste ready** — all code runs as-is in the demo project

---

## 🚀 GitHub Pages Setup

This site is a static HTML site — no build step required.

1. Fork or clone this repo
2. Go to **Settings → Pages**
3. Set **Source** → `Deploy from a branch` → `main` → `/ (root)`
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

> The `.nojekyll` file is already included to prevent Jekyll from interfering with the site.

---

## 🛠️ Local Preview

```bash
git clone https://github.com/Ismail-Mirza/interactive-grpc-course.git
cd interactive-grpc-course

# Any static server works
python -m http.server 8080
# Open http://localhost:8080
```

---

## 📦 Python Dependencies (for the demo project)

```bash
pip install \
  grpcio>=1.58.0 \
  grpcio-tools>=1.58.0 \
  grpcio-health-checking>=1.58.0 \
  grpcio-reflection>=1.58.0 \
  grpcio-status>=1.58.0 \
  googleapis-common-protos>=1.62.0 \
  protobuf>=4.24.4 \
  PyJWT>=2.8.0 \
  cryptography>=41.0.0 \
  prometheus-client>=0.18.0 \
  opentelemetry-api \
  opentelemetry-sdk \
  pytest>=7.4.0
```

---

## 📖 Resources

- [gRPC Official Docs](https://grpc.io/docs/)
- [Proto3 Language Guide](https://protobuf.dev/programming-guides/proto3/)
- [gRPC Python Quickstart](https://grpc.io/docs/languages/python/quickstart/)
- [grpcurl — CLI for gRPC](https://github.com/fullstorydev/grpcurl)

---

## 📄 License

MIT — free to use and share.
