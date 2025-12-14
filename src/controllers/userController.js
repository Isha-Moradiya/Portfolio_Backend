import getUserDetailsService from "../services/user/getUserDetailsService.js"
import updateUserDetailsService from "../services/user/updateUserDetailsService.js"

const getUserDetails = async (req, res) => {
    try {
        await getUserDetailsService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        await updateUserDetailsService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

export {
    getUserDetails, updateUserDetails
}; 