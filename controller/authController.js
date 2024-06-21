import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    console.log("request::: ", req.body);
    try {
        const { firstName, lastName, gender, phoneNo, email, designation, dob, image, age, country, state, city, pinCode, password } = req.body;
        const user = new User({
            firstName,
            lastName,
            gender,
            phoneNo,
            email,
            designation,
            image,
            dob,
            age,
            country,
            state,
            city,
            pinCode,
            password
        });

        await user.save();
        res.status(201).json({ msg: 'User Register successfully' });
    } catch (error) {
        console.error("Message:: ", error.message);
        res.status(500).json({ msg: 'Error registering user', error });
    }
}

// Login Function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            msg: 'Login successful',
            token,
        });
    } catch (error) {
        console.error("Error during login: ", error.message);
        res.status(500).json({ msg: 'Error during login', error });
    }
};

export const getDetails = async (req, res) => {
    try {
        // Fetch user details from MongoDB based on req.user.id (assuming user ID is stored in JWT payload)
        console.log("req.user: ", req);
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from response

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details: ', error.message);
        res.status(500).json({ msg: 'Server error', error });
    }
};