const taskCnt = require('../models/taskCnt');

exports.updateCnt = async (req, res) => {
    const { cnt } = req.body;  
    try {
      const updatedUser = await taskCnt.findOneAndUpdate(
        {
            id:0,
            cnt:cnt
        } 
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  };



  exports.getCnt = async (req, res) => {
    try {
    const id=0
      const cnt = await taskCnt.findOne({id:id});
      res.json(cnt);
    } catch (error) {
      console.error('Failed to get tasks:', error);
      res.status(500).json({ message: 'Failed to get tasks' });
    }
};
