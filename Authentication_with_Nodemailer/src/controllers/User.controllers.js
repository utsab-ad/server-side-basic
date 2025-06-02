import User from "../models/User.model.js";

export const userDetails = async (req, res) => {
  try {
    const { name, email, contact } = req.user;

    res.json({
      name: name,
      email: email,
      contact: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error", error.message],
    });
  }
};

export const userDelete = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const deletion = await User.findByIdAndDelete({ _id: user._id });

    if (!deletion) {
      return res.status(500).json({
        success: false,
        message: [user.name, "Not Deleted"],
      });
    }

    await res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    await res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged Out and Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error", error.message],
    });
  }
};
