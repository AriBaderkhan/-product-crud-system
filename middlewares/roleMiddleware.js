
function checkRole(requiredRole){
    return (req,res,next)=>{

        const role = req.user.role;
        if (role !== requiredRole) {
            return res.status(403).send('Access denied: Insufficient permissions');
        } else {
            next();
        }
    }
}


module.exports = {checkRole}