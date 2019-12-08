import DBH from './dbh';

const db_uri = "mongodb+srv://mongoman01:mongoman01@cluster0-jcbtw.mongodb.net/little_chatie?retryWrites=true&w=majority";
//const db_connection = null;

export default class COM {

    register_user = (data) =>{

        let dbh = new DBH();

        console.log("com register_user............");
        dbh.openConnection();
        
    }
}