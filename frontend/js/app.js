// Main Application Controller
class App {
    constructor(username) {
        this.username = username;
    }

    async loadUserData() {
        try {
            const userData = await githubAPI.fetchUserData(this.username);
            uiController.updateProfileCard(userData);
            uiController.updateMetrics(userData);
        } catch (error) {
            uiController.showError(
                uiController.elements.profileCard,
                'Erro ao carregar perfil'
            );
        }
    }

    async loadRepos() {
        try {
            const repos = await githubAPI.fetchUserRepos(this.username);
            uiController.updateLanguages(repos);
            uiController.updateRecentRepos(repos);
        } catch (error) {
            uiController.showError(
                uiController.elements.languages,
                'Erro ao carregar dados'
            );
            uiController.showError(
                uiController.elements.recentRepos,
                'Erro ao carregar repositórios'
            );
        }
    }

    async init() {
        await this.loadUserData();
        await this.loadRepos();
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App('AugustoArand');
    app.init();
});
