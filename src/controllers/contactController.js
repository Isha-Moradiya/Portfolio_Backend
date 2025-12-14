import createContactService from "../services/contact/createContactService.js"
import updateContactService from "../services/contact/updateContactService.js"
import getAllContactService from "../services/contact/getAllContactService.js"
import getContactByIdService from "../services/contact/getContactByIdService.js"

const createContact = async (req, res) => {
    try {
        await createContactService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const updateContact = async (req, res) => {
    try {
        await updateContactService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getAllContact = async (req, res) => {
    try {
        await getAllContactService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

const getContactById = async (req, res) => {
    try {
        await getContactByIdService(req, res);
    } catch (error) {
        return res.internalServerError({ message: error.message });
    }
};

export {
    createContact, updateContact, getAllContact, getContactById
}; 