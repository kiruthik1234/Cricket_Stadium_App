export class AuthController {
    async login(req, res) {
        // Logic for user login
        const { username, password } = req.body;
        // Authenticate user and return response
    }

    async signIn(req, res) {
        // Logic for user sign-in
        const { username, password } = req.body;
        // Create new user and return response
    }
}