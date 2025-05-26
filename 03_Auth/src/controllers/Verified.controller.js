export const Profile = (req, res) => {

    try {
        res.status(200).json({
            success: true,
            message: "Authorized User",
            user: req.user.username
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Cookies Error from middleware", error.message]

        });

    }

}