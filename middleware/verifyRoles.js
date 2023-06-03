const verifyRoles = ([...allowedRoles]) => {
    return (req, res, next) => {
        if(!req?.roles) return res.status(400).json({message : 'please login'});

        const rolesArray = [...allowedRoles]

        console.log(rolesArray);
        console.log(req.roles);


        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);

        if(!result) return res.status(401).json({message : 'user unAuthorized'});

        next()
    }
}


module.exports = verifyRoles