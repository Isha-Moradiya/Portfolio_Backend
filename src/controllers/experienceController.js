import createExperienceService from "../services/experience/createExperienceService.js"
import updateExperienceService from "../services/experience/updateExperienceService.js"
import getAllExperienceService from "../services/experience/getAllExperienceService.js"
import getExperienceByIdService from "../services/experience/getExperienceByIdService.js"
import deleteExperienceService from "../services/experience/deleteExperienceService.js"

const createExperience = async (req, res) => {
    try {
        await createExperienceService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const updateExperience = async (req, res) => {
    try {
        await updateExperienceService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getAllExperience = async (req, res) => {
    try {
        await getAllExperienceService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getExperienceById = async (req, res) => {
    try {
        await getExperienceByIdService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const deleteExperience = async (req, res) => {
    try {
        await deleteExperienceService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

export {
    createExperience, updateExperience, getAllExperience, getExperienceById, deleteExperience
}; 