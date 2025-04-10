import express from "express";
import {
  deleteContactById,
  getAllContact,
  getContactById,
  getContactByUserId,
  newContact,
  updateContactById,
} from "../Controllers/contact.js";
import { isAuthenticated } from "../Middleware/Auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newContact);

router.get("/", getAllContact);

router.get("/:id", getContactById);

router.put("/:id", isAuthenticated, updateContactById);

router.delete("/:id", isAuthenticated, deleteContactById);

router.get("/userid/:id",getContactByUserId);

export default router;
