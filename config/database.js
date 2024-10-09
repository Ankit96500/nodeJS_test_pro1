import { Sequelize } from "sequelize";

const sequelize = new Sequelize('nodetestdb','root','1Ankit@2002',{
    dialect:"mysql",
    host:"localhost",
    logging:false
})


// authenticatet databsae
sequelize.authenticate()
.then(res=>{
    console.log("database connected");
})
.catch(err=>{
    console.log("database not connectd");
})

export default sequelize


