import {
    userTuitDisLikes
}
from "./like-service"
import {
    signup, logout, profile, login
}
    from "./auth-service"
import {
    findUserById
}
    from "./services"

describe('Create a like', () => {
    const dummyUser = {
        username: "Pablo",
        password: "pablo123",
        email: "pablo@email.com"
    }

    const tuit = {
        _id: "624070d7705939e6d0241f9a",
        postedBy: "623e0b1a736aafb975f32d21",
        tuit: "This is a tuit test for the profile",
        postedOn: "2022-03-27T14:12:01.600+00:00"
    }

    beforeAll(() => {
        signup(dummyUser);
    })

    afterAll(() => {
        logout();
    })
    test('Like a Tuit', async () => {
        const loginUser = await login({username: dummyUser.username, password: dummyUser.password});
        console.log(loginUser);
        const user = await profile();
        console.log(user);
        const dislikeTuit =  await userTuitDisLikes("me", tuit._id);
        console.log(dislikeTuit)
        const findTuit = await findUserById(tuit._id);
        console.log(findTuit);
        expect(findTuit.stats.likes).toBe(2)
    })
})