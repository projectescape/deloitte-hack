# Contactless Body Vitals Monitoring System

This repo is the server and frontend part of a system that measures heart rate, respiratory rate, and blood pressure by only using a camera.

The code for the model used for detection can be found [here](https://github.com/ArpitSingla/Contactless-Monitoring-System)

## Setup

To run this part of the project locally, follow these steps

1. Clone the repository locally

   ```bash
   git clone https://github.com/projectescape/deloitte-hack
   ```

1. Install dependencies

   ```bash
   npm install
   cd client
   npm install
   cd ..
   ```

1. Rename `example.env` to `.env` and fill the required values

   DATABASE_URL requires a PostgreSQL url.

   ```env
   DATABASE_URL=*****
   SALT_ROUNDS=*****
   NODE_ENV=*****
   JWT_SECRET=*****
   ```

1. To make sure the model works with locally running website, in models code replace the target server url to be `http://localhost:5000/`

1. Run the program locally
   ```bash
   npm run dev
   ```
