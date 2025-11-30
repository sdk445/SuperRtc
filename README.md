# SuperRtc - WebRTC Audio Broadcast System with self hosted turn server 🔊

**SuperRtc** is a real-time audio broadcasting application using **WebRTC** for media transport and **Socket.io** for signaling. It features a Host/Listener architecture with a synchronized real-time chat and audio visualizer.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0-green.svg)

---

## 🌟 Features

* **Real-time Audio:** Low latency P2P audio streaming.
* **Audio Visualizer:** Canvas-based frequency visualizer on the receiver side.
* **Data Channels:** Instant text chat synced via WebRTC (no server persistence).
* **Room Logic:** `create-room` (Host) and `join-room` (Listener) mechanics.
* **Autoplay Handling:** "Tap to Unmute" overlay for mobile/browser compatibility.

---

## 🛠️ Installation & Setup

### 1. Prerequisites
Ensure you have **Node.js** installed.

### 2. Initialize Project
Run the following commands in your terminal:
```bash
npm install
node server.js
```
# Self-Hosted WebRTC TURN/STUN Server using CoTURN and Docker

This guide details how to set up and expose a self-hosted CoTURN server using Docker for stable containerization and ngrok for public accessibility (if standard port forwarding is unavailable).

## ⚠️ Prerequisites

1.  **Docker:** Docker Engine must be installed and running on your host machine.
2.  **Network Access:** You need administrative access to your router for port forwarding, *or* a valid ngrok account/installation for TCP tunneling.

## 1. CoTURN Server Setup (Docker)

We will use the official `coturn/coturn` Docker image. This process ensures the TURN/STUN server runs in an isolated and reproducible environment.

### 1.1. Prepare CoTURN Configuration

A minimal configuration is required, typically passed as command line arguments or via a configuration file mounted into the container.

### 1.2. Run the Docker Container

The core of the setup is mapping the necessary ports that CoTURN uses for STUN/TURN signaling and relaying media.

| Port | Protocol | Purpose |
| :--- | :--- | :--- |
| `3478` | TCP/UDP | Primary TURN/STUN signaling port. |
| `5349` | TCP | Secure TURN/STUN signaling (TURN/TLS). |

Use the following command to start the container, replacing `[YOUR_EXTERNAL_IP]` with the public IP of the server running Docker.

```bash
# It is highly recommended to run CoTURN with a configuration file 
# defining users and realm, but for simplicity, we use the default 
# image and map the ports.

docker run -d \
  --name=coturn \
  --net=host \
  -p 3478:3478/udp \
  -p 3478:3478/tcp \
  -p 5349:5349/tcp \
  coturn/coturn
```
##images 

<img width="1916" height="5" alt="image (1)" src="https://github.com/user-attachments/assets/d977c2e7-22f9-4f06-ac55-8622e431af06" />

<img width="1916" height="110" alt="image (2)" src="https://github.com/user-attachments/assets/36478d9c-3837-4fd2-a68e-c91b43041f28" />

<img width="835" height="181" alt="image (3)" src="https://github.com/user-attachments/assets/70dc9a95-cbb5-42ff-9ec7-a9e21067d0c5" />

<img width="866" height="834" alt="image (6)" src="https://github.com/user-attachments/assets/35c66821-51ba-4cf9-a6d5-13e95e9341af" />
<img width="824" height="809" alt="image (7)" src="https://github.com/user-attachments/assets/487bf767-1e35-4cf5-a23a-f0010ed973e6" />
<img width="823" height="773" alt="image (9)" src="https://github.com/user-attachments/assets/910b32ac-b430-4d81-af30-9c54d2c3e0e6" />

<img width="702" height="891" alt="image (10)" src="https://github.com/user-attachments/assets/aea4bedc-ba88-45b5-bcf2-f1f036bbeac7" />
