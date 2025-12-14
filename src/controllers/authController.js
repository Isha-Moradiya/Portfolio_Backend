import loginService from "../services/auth/loginService.js"
import getUserService from "../services/auth/getUserService.js"

const login = async (req, res) => {
    try {
      await loginService(req, res);
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
};

const getUser = async (req, res) => {
    try {
      await getUserService(req, res);
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
};

// const changePassword = async (req, res) => {
//     try {
//       await changePasswordService(req, res);
//     } catch (error) {
//       return res.internalServerError({ message: error.message });
//     }
// };

export { login, getUser }
