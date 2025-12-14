import createWorkService from "../services/work/createWorkService.js"
import updateWorkService from "../services/work/updateWorkService.js"
import getAllWorkService from "../services/work/getAllWorkService.js"
import getWorkByIdService from "../services/work/getWorkByIdService.js"
import deleteWorkService from "../services/work/deleteWorkService.js"

const createWork = async (req, res) => {
    try {
        await createWorkService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const updateWork = async (req, res) => {
    try {
        await updateWorkService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getAllWork = async (req, res) => {
    try {
        await getAllWorkService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getWorkById = async (req, res) => {
    try {
        await getWorkByIdService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const deleteWork = async (req, res) => {
    try {
        await deleteWorkService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

export {
    createWork, updateWork, getAllWork, getWorkById, deleteWork
}; 