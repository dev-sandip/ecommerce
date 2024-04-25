import UserModel from "../../models/User.model"

class DbOperation {
  public static getUsersByEmail = async (email: String) => {
    return UserModel.findOne({ email })
  }
  public static getUserByID = async (id: String) => {
    return UserModel.findById({ id });
  }
  public static getAllUsers = async () => {
    return UserModel.find();
  }
}
export default DbOperation;

