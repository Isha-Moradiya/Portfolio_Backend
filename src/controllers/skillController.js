import createSkillService from "../services/skill/createSkillService.js"
import updateSkillService from "../services/skill/updateSkillService.js"
import getAllSkillService from "../services/skill/getAllSkillService.js"
import getSkillByIdService from "../services/skill/getSkillByIdService.js"
import deleteSkillService from "../services/skill/deleteSkillService.js"

const createSkill = async (req, res) => {
    try {
        await createSkillService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const updateSkill = async (req, res) => {
    try {
        await updateSkillService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getAllSkill = async (req, res) => {
    try {
        await getAllSkillService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getSkillById = async (req, res) => {
    try {
        await getSkillByIdService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const deleteSkill = async (req, res) => {
    try {
        await deleteSkillService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

export {
    createSkill, updateSkill, getAllSkill, getSkillById, deleteSkill
}; 