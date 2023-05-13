import bcrypt from "bcrypt";

export default {
    password: (password: string) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(String(password), salt);
        return hash;
    },
    comparePassword: (password: string, hash: string) => {
        return bcrypt.compareSync(password, hash);
    }
}