// API Service - Handles all communication with the backend
// Detecta automaticamente se está em produção ou desenvolvimento
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000/api'
    : 'https://api.github.com'; // Usar API direta do GitHub em produção

class GitHubAPI {
    constructor() {
        this.baseUrl = API_BASE_URL;
        this.isDirect = !this.baseUrl.includes('localhost');
    }

    async fetchUserData(username) {
        try {
            let url;
            if (this.isDirect) {
                // Modo direto (GitHub Pages) - chama API do GitHub diretamente
                url = `https://api.github.com/users/${username}`;
            } else {
                // Modo local - usa backend
                url = `${this.baseUrl}/user/${username}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            throw error;
        }
    }

    async fetchUserRepos(username) {
        try {
            let url;
            if (this.isDirect) {
                // Modo direto (GitHub Pages) - chama API do GitHub diretamente
                url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
            } else {
                // Modo local - usa backend
                url = `${this.baseUrl}/repos/${username}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar repositórios');
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar repositórios:', error);
            throw error;
        }
    }
}

// Export the API instance
const githubAPI = new GitHubAPI();
