import {
    createTuit,
    findTuitById,
    deleteTuit,
    deleteByUsernameAndTuit,
    findAllTuits,
    deleteAllTuits
} from "../services/tuits-service";
import {createUser,
    deleteUsersByUsername,
    findUserByCredentials} from "../services/users-service";

describe('createTuit', () => {
    // TODO: implement this
    const user1 = {
        username: "RDJ",
        password: "robert123",
        email: "robertDowny@Jr.com"
    }
    const tuit1 = {
        tuit: "I love tropical places"
    }
    beforeAll(async ()=> {
        return createUser(user1);
    });
    afterAll(async ()=>{
        //return deleteUsersByUsername(user1.username);
        const deleteUser = await deleteUsersByUsername(user1.username);
        const deleteT = await deleteByUsernameAndTuit({username: user1.username, tuit: tuit1.tuit});
        return [
            deleteUser, deleteT
        ]
    });
    test("can create tuit with REST API", async ()=>{
        const findUser = await findUserByCredentials({username: user1.username, password: user1.password});
        const newTuit = await createTuit(findUser._id, tuit1);
        const findTuit = await findTuitById(newTuit._id);
        expect(newTuit.tuit).toEqual(tuit1.tuit);
        expect(newTuit.postedBy).toEqual(findUser._id);
        expect(newTuit.postedOn).toEqual(findTuit.postedOn);
    });
});

describe('deleteTuit', () => {
    // TODO: implement this
    const tuit1 = {
        _id: "621a85e8458d01d705e63474",
        postedBy : "621a4d335f17f1617390f0d4",
        tuit: "I love tropical places",
        postedOn: "2022-02-26T14:27:27.842+00:00"
    }
    // const user = {
    //     username: "Iron-Man",
    //     password: "iron123",
    //     email: "iron@man.com"
    // }
    // const tuit = {
    //     tuit: "I am billionaire"
    // }

    // beforeAll(async ()=>{
    //     return createUser(user);
    //     //const creatU = await createUser(user);
    //     // const findU = await findUserByCredentials(user.username, user.password);
    //     // const createT = await createTuit(findU._id, tuit);
    //     // const findT = await findTuitById(createT._id);
    //     // return [
    //     //     creatU,
    //     //     findU,
    //     //     createT,
    //     //     findT
    //     // ]
    // });

    afterAll(()=> {
        return deleteTuit(tuit1._id);
    });

    test('can delete tuit wtih REST API', async ()=>{
        const status = await deleteTuit(tuit1._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1)
    })
});

describe('findTuitById', () => {
    // TODO: implement this
    const tuit = {
        tuit: "Spicy food is great",
    }
    const user = {
        username: "Jack",
        password: "jack123",
        email: "jack@sparrow.com"
    }
    //const userId = findU._id;
    beforeAll( async ()=>
        {
            return deleteUsersByUsername(user.username);
        }
    );
    afterAll(()=>
        {
            return deleteUsersByUsername(user.username);
        }
    );
    test("can retrieve a tuit by their primary key with REST API", async ()=> {
        const createU = await createUser(user)
        const createT = await createTuit(createU._id, tuit);
        const findT = await findTuitById(createT._id);

        expect(tuit.tuit).toEqual(findT.tuit)
        expect(createT._id).toEqual(findT._id)
    })
});

describe('findAllTuits', () => {
    // TODO: implement this
    const tuits = [
        {
          tuit: "Elon Musk is a genius"
        },
        {
            tuit: "I will never climb mount Everest"
        },
        {
          tuit: "Spicy food is great"
        }
    ];

    // setup data before test
    beforeAll(async () => {
            // insert several known users
            tuits.map(tuit =>
                createTuit("6217bfd11a5003f5c3db644d", tuit)
            )
        //return deleteAll;
        }
    );

    // clean up after ourselves
    afterAll(() =>
        // delete the users we inserted
        // tuits.map(username =>
        //     deleteUsersByUsername(username)
        // )
        {
            //Ask about using this in the before
            // to empty the database before running
            // the test
            return deleteAllTuits();
        }
    );
    test("can retrieve all tuits with REST API",async ()=>{
        const findTuits = await findAllTuits();
        expect(findTuits.length).toBeGreaterThanOrEqual(tuits.length)
    })
});