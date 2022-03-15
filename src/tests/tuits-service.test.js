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
    const user = {
        username: "Iron-Man",
        password: "iron123",
        email: "iron@man.com"
    }
    const tuit = {
        tuit: "I am billionaire"
    }

    beforeAll( ()=>{
        //return createUser(user);
        return deleteUsersByUsername(user.username);

    });

    afterAll(()=> {
        return deleteUsersByUsername(user.username);
    });

    test('can delete tuit wtih REST API', async ()=>{
        const createU =  await createUser(user);
        const createT = await createTuit(createU._id, tuit);
        const findT = await findTuitById(createT._id);
        const status = await deleteTuit(findT._id);
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    })
});

describe('findTuitById', () => {
    // TODO: implement this
    const tuit = {
        tuit: "Spicy food is great"
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
    const tuitsToBeInserted = [
        {
          tuit: "Elon Musk is crazy"
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
            tuitsToBeInserted.map(tuit =>
                createTuit("6217bfd11a5003f5c3db644d", tuit)
            )
        //return deleteAll;
        }
    );

    // clean up after ourselves
    afterAll(async () =>
        //delete the users we inserted
        tuitsToBeInserted.map(username =>
             deleteByUsernameAndTuit(username)
        )

    );
    test("can retrieve all tuits with REST API",async ()=>{
        const findTuits = await findAllTuits();
        expect(findTuits.length).toBeGreaterThanOrEqual(tuitsToBeInserted.length)

        const tuitsWeInserted = findTuits.filter(
            tuit => tuitsToBeInserted.indexOf(tuit.tuit) >= 0);

        tuitsWeInserted.forEach(tuits => {
            const tuit = tuitsToBeInserted.find(tuit => tuit === tuits.tuit);
            expect(tuits.tuit).toEqual(tuit);
        })
    })
});