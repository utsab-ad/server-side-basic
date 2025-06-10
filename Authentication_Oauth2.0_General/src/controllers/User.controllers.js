
export const userDetails = async (req, res) => {
    try {
        const { name, email, contact} = req.user;

        res.json({
            name: name,
            email: email,
            contact: contact,
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal Server Error", error.message]
        })
    }
}