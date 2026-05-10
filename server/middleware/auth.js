import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log("Error: No Token Provided in Header");
      return res.status(401).json({ message: "token didnt find" });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'Negar_Secret_123'); 
    const userId = decoded.id || decoded._id;
    
    if (!userId) {
      console.log("2. Error: User ID not found in Token payload!");
      return res.status(401).json({ message: "user didnt find" });
    }

    req.user = userId; 
    console.log("3. Request User set to:", req.user);

    next();
  } catch (error) {
    console.log("❌ JWT Error:", error.message);
    res.status(401).json({ message: "session was expired" });
  }
};