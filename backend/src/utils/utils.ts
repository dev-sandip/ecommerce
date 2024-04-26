class Utils {
    public static usersWithoutPassword = (users: any) => {
        const withoutPassword = users.map((user: any) => {
            const { password, ...rest } = user.toObject();
            return rest;
        });
        return withoutPassword
    }
    public static userWithoutPassword = (user: any) => {
        const { password: hashedPassword, ...rest } = user.toObject();
        return rest;
    }
}
export default Utils;