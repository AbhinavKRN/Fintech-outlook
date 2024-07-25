require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const HASURA_URL = process.env.HASURA_URL;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;

// Endpoint to get user account details
app.get('/account/:id', async (req, res) => {
  const userId = req.params.id;
  const query = `
    query {
      users_by_pk(id: ${userId}) {
        id
        name
        balance
      }
    }
  `;

  try {
    const response = await axios.post(
      HASURA_URL,
      { query },
      { headers: { 'x-hasura-admin-secret': HASURA_ADMIN_SECRET } }
    );
    res.json(response.data.data.users_by_pk);
  } catch (error) {
    console.error('Error fetching account details:', error.message);
    res.status(500).send('Error fetching account details');
  }
});

// Endpoint to perform a transaction (deposit or withdraw)
app.post('/transaction', async (req, res) => {
  const { userId, amount } = req.body;
  const mutation = `
    mutation {
      update_users_by_pk(
        pk_columns: { id: ${userId} }
        _inc: { balance: ${amount} }
      ) {
        id
        balance
      }
    }
  `;

  try {
    const response = await axios.post(
      HASURA_URL,
      { query: mutation },
      { headers: { 'x-hasura-admin-secret': HASURA_ADMIN_SECRET } }
    );
    res.json(response.data.data.update_users_by_pk);
  } catch (error) {
    console.error('Error performing transaction:', error.message);
    res.status(500).send('Error performing transaction');
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
