const checkRole = (sysRole) => {
  return (req,res,next) => {
    const userRole = [req.headers.role] ||[];
    const isValidRole = sysRole.some((role)  => userRole.includes(role));
    if(!isValidRole) throw new Error("permission denied! !");
  };
 
};

//RBAC(ROLE base acces control)
//ABAC(attribute)
//PBAC(permisssion)

module.exports = { checkRole };
