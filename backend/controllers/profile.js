import User from "../models/UserSchema.js";

export const getUser = async (req, res) => {
  // const filePath = `/Documents/${req.file.filename}`;
    const { profile_id } = req.body;
    // console.log(req.body);
    const UserData = await User.findById(profile_id);

    if (!UserData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, UserData });

};

export const editUser = async (req, res) => {
    const { editData, userId } = req.body;

    const user = await User.findById(userId);

    // console.log(editData);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found in DB" });
    }

    user.fullName = editData?.fullName ? editData.fullName : user.fullName;
    user.bio = editData?.bio ? editData.bio : user.bio;
    user.address = editData?.address ? editData.address : user.address;
    user.gender = editData?.gender ? editData.gender : user.gender;
    user.phone = editData?.phone ? editData.phone : user.phone;
    user.photo = editData?.photo ? editData.photo : user.photo;
    user.bloodGroup = editData?.bloodGroup ? editData.bloodGroup : user.bloodGroup;
    await user.save();  

    res.status(200).json({ success: true, newUser: user }); 
 
};
