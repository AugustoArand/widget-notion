const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// GitHub API configuration
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

const githubHeaders = {
    'Accept': 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
};

// Routes

// Get user data
app.get('/api/user/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(
            `${GITHUB_API_BASE}/users/${username}`,
            { headers: githubHeaders }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar usuário:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Erro ao buscar dados do usuário',
            message: error.message
        });
    }
});

// Get user repositories
app.get('/api/repos/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(
            `${GITHUB_API_BASE}/users/${username}/repos`,
            {
                headers: githubHeaders,
                params: {
                    sort: 'updated',
                    per_page: 100
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error.message);
        res.status(error.response?.status || 500).json({
            error: 'Erro ao buscar repositórios',
            message: error.message
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📊 API disponível em http://localhost:${PORT}/api`);
});
