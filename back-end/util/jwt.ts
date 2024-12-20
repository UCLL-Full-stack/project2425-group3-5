import jwt from 'jsonwebtoken';

const generateJwtToken = ({username}: {username: string}): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'course_app'};
    const secret = process.env.JWT_SECRET as string;
    try {
        return jwt.sign({username},secret, options);
    } catch(error) {
        console.log(error);
        throw new Error("Error generating JWT token, see server log for detail.")
    }
};

export { generateJwtToken };
