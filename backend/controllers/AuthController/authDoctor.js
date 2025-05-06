import Doctor from "../../models/DoctorSchema.js"
import bcryptjs from "bcryptjs";

export const loginDoctor = async (req, res) => {
    let {email, password} = req.body;

    const doctor = await Doctor.findOne({email});
    
    const isMatched = await bcryptjs.compare(password, doctor.password);
    if (!doctor || !isMatched) {
      res.status(400).json({ message: "Invalid Username or Password" });
    } else {
      res.status(201).json({
        message: "Login Successfull",
        doctor,
      });
    }

    // console.log(doctor);
}

export const signUpDoctor = async (req, res) => {
    let {name, email, password} = req.body;

    const doctor = await Doctor.findOne({email});
    if(doctor){
      return res.status(400).json({message : "Doctor Already Exists!"})
    }

    let hashedPass = await bcryptjs.hash(password, 10);

    const newDoctor = new Doctor({
      name : "Dr." + name,
      email : email,
      password : hashedPass,
    })

    await newDoctor.save();
    res.status(201).json({
      message : "Doctor created successfully",
      doctor : {
        email : newDoctor.email,
        name : newDoctor.name,
      }
    })
}