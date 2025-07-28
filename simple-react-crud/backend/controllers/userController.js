let users = [];
let userIdCounter = 1;

// GET all users
exports.getUsers = (req, res) => {
  res.json(users);
};

// POST create user
exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: userIdCounter++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

// PUT update user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find(u => u.id === parseInt(id));
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = name || user.name;
  user.email = email || user.email;
  res.json(user);
};

// DELETE user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== parseInt(id));
  res.json({ message: 'User deleted' });
};
