import { Contact } from "../Models/Contact.js";


export const getAllContact = async (req, res) => {
    const userContact = await Contact.find();
  
    if (!userContact)
      return res.json({ message: "No Contact Exist", success: false });
  
    res.json({ message: "All Contact Fatched", userContact });
  };


export const newContact = async (req,res) =>{
    const {name,email,type,phone} = req.body;

    if (name == "" || email == "" || phone == "" || type == "")
    return res.json({ message: "All feilds are required", success: false });

    let saveContact = await Contact.create({
        name,
        email,
        phone,
        type,
        user:req.user
      });
    
      res.status(201).json({
        message: "Contact saved successfully...!",
        saveContact,
        success: true,
      });
}

export const updateContactById = async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;
  
    let updatedContact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        type,
      },
      { new: true }
    );
  
    if (!updatedContact)
      return res.json({ message: "No Contact exist", success: false });
  
    res.json({
      message: "Contact updated Successfully...!",
      updatedContact,
      success: true,
    });
  };

  export const deleteContactById = async (req, res) => {
    const id = req.params.id;
  
    let deleteContact = await Contact.findByIdAndDelete(id);
  
    if (!deleteContact)
      return res.json({ message: "No Contact exist", success: false });
  
    res.json({
      message: "Contact deleted Successfully...!",
      success: true,
    });
  };

  export const getContactById = async (req, res) => {
    const id = req.params.id;
  
    const userContact = await Contact.findById(id);
    if (!userContact)
      return res.json({ message: "No Contact find", success: "false" });
  
    res.json({ message: "Contact Fetched", userContact, success: true });
  };

  export const getContactByUserId = async (req, res) => {
    const id = req.params.id;
  
    const userContact = await Contact.find({user:id});
    if (!userContact)
      return res.json({ message: "No Contact find", success: "false" });
  
    res.json({ message: "User Specific Contact Fetched", userContact, success: true });
  };