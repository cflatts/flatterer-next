export class ApiServer {
    constructor(express: any) {
        this._express = express;
    }
    private _express: any;

    init(): void {
        this._express.get("/", (req: any, resp: any) => {
            resp.send("DEFAULT ROUTE TBD");
        });
        
        this._express.get("/login", (req: any, resp: any) => {
            resp.send("LOGIN PAGE");
        });
        
        /**
         * USER FUNCTIONS
         */
        this._express.post("/create", (req: any, resp: any) => {
            console.log("BODY", req.body);
            // createUser(req.body).catch( err => console.log(err));
        });
        
        this._express.get("/users/:username", (req: any, resp: any) => {
            // const u = findUser({permanentName: req.params.username});
            resp.send(`The user is: ${req.params.username}`);
        });
        
        this._express.post("/update/:userID", (req: any, resp: any) => {
            resp.send("UPDATE A USER");
        });
        
        this._express.delete("/delete/:userID", (req: any, resp: any) => {
            resp.send("DELETE A USER");
        });
    }
}