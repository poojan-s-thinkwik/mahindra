
class AuthController {

    constructor(authService) {
        this.authService = authService;
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            return res.status(200).json({ message: 'Logged in successfully', token });
        } catch(err) {
            next(err);
        }
    }
}

export default AuthController;