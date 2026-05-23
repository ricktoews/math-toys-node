# Math Toys API

A small Node.js API providing math-related endpoints, currently hosted at:

https://mathtoys.toews-api.com

---

## Overview

This service exposes endpoints for mathematical utilities and small exploratory experiments. It is designed as a lightweight backend, proxied through Apache and hosted on a DigitalOcean droplet.

---

## Endpoint Example

### GET /api/dc/:n

Example:

https://mathtoys.toews-api.com/api/dc/7

_Description_: Returns the result of the `dc` operation for the provided integer `n`.

---

## Architecture

- **Server**: Node.js
- **Process Management**: systemd (`math-toys-node.service`)
- **Web Server / Proxy**: Apache
- **Hosting**: DigitalOcean droplet

Request flow:

    Client → Apache (port 80/443) → Proxy to localhost:3001 → Node.js app

---

## Project Structure

    math-toys-node/
    ├── src/
    │   └── (application code)
    ├── package.json
    └── README.md

---

## Local Development

From the project root:

    npm install
    npm start

Server runs on:

    http://localhost:3001

---

## Deployment

The app is deployed to:

    /var/www/math-toys-node

### Apache Configuration

    /etc/apache2/sites-available/mathtoys.conf

Proxies traffic to:

    http://localhost:3001

---

## Service Management

Managed via systemd:

    sudo systemctl start math-toys-node
    sudo systemctl stop math-toys-node
    sudo systemctl restart math-toys-node
    sudo systemctl status math-toys-node

View logs:

    sudo journalctl -u math-toys-node -n 50 --no-pager

---

## Troubleshooting

If the API returns **503 Service Unavailable**, the Node process is likely not running.

Check the service:

    sudo systemctl status math-toys-node

Test the backend directly:

    curl http://localhost:3001/api/dc/7

Restart if needed:

    sudo systemctl restart math-toys-node

---

## Notes

This is a personal project for exploring small mathematical ideas and utilities.

---

## Future Improvements

- Expand and document endpoints more fully
- Add automated tests
- Improve error handling and validation
- Consider containerization with Docker if needed

---

## Author

Rick Toews
