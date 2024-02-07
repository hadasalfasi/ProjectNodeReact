const users = require('../models/users')

exports.addUser = async(req,res)=>{
    console.log(req.body);
    const user = await users.create(req.body);
    res.json(user)
}
  

  exports.getAllUsers = async (req, res) => {
    try {
      const usersa = await users.find();
      res.json(usersa);
    } catch (error) {
      console.error('Failed to get users', error);
      res.status(500).json({ message: 'Failed to get users' });
    }
};  

