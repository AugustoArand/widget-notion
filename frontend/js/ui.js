// UI Controller - Handles all DOM manipulation
class UIController {
    constructor() {
        this.elements = {
            profileCard: document.getElementById('profileCard'),
            repoCount: document.getElementById('repoCount'),
            followers: document.getElementById('followers'),
            following: document.getElementById('following'),
            totalStars: document.getElementById('totalStars'),
            languages: document.getElementById('languages'),
            recentRepos: document.getElementById('recentRepos')
        };
    }

    showLoading(element) {
        element.innerHTML = '<div class="loading">Carregando...</div>';
    }

    showError(element, message) {
        element.innerHTML = `<div class="error">${message}</div>`;
    }

    updateProfileCard(data) {
        this.elements.profileCard.innerHTML = `
            <img src="${data.avatar_url}" alt="Avatar" class="profile-avatar">
            <div class="profile-info">
                <h2>${data.name || data.login}</h2>
                <p><strong>@${data.login}</strong></p>
                <p>${data.bio || 'Sem biografia'}</p>
                ${data.location ? `<p>📍 ${data.location}</p>` : ''}
                ${data.company ? `<p>🏢 ${data.company}</p>` : ''}
            </div>
        `;
    }

    updateMetrics(data) {
        this.elements.repoCount.textContent = data.public_repos;
        this.elements.followers.textContent = data.followers;
        this.elements.following.textContent = data.following;
    }

    updateLanguages(repos) {
        // Count languages
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        // Calculate total stars
        const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
        this.elements.totalStars.textContent = totalStars;

        // Display top languages
        const languagesHTML = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([lang, count]) => `<span class="badge lang-badge">${lang} (${count})</span>`)
            .join('');

        this.elements.languages.innerHTML = languagesHTML || 'Nenhuma linguagem detectada';
    }

    updateRecentRepos(repos) {
        const recentHTML = repos.slice(0, 5).map(repo => `
            <div class="repo-item">
                <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                <div class="stats-bar">
                    ${repo.language ? `<span>💻 ${repo.language}</span>` : ''}
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🔱 ${repo.forks_count}</span>
                    <span>Atualizado: ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}</span>
                </div>
            </div>
        `).join('');

        this.elements.recentRepos.innerHTML = recentHTML || 'Nenhum repositório encontrado';
    }
}

// Export UI controller instance
const uiController = new UIController();
