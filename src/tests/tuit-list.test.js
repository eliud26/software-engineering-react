import Tuits from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {createTuit, findAllTuits, findTuitById} from "../services/tuits-service";
import axios from "axios";

//jest.mock('axios');

const MOCKED_TUITS_LIST = [
    {
        _id: "621a8520c170bcf1b841f99e",
        postedBy: "621a8520c170bcf1b841f99b",
        tuit: "I love tropical places",
        postedOn: "2022-02-26T19:52:58.141+00:00"
    }
]

test('tuit list renders static tuit array', () => {
    // TODO: implement this
    render(
        <HashRouter>
            <Tuits tuits ={MOCKED_TUITS_LIST}/>
        </HashRouter>);
    const linkElement =  screen.getByText(/I love tropical places/i);
    expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    // TODO: implement this
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits = {tuits}/>
        </HashRouter>);
        const linkElement = screen.getByText(/Spicy food is great/i);
        expect(linkElement).toBeInTheDocument();
})

test('tuit list renders mocked', async () => {
    // TODO: implement this
    const mock = jest.spyOn(axios, "get");
    mock.mockImplementation(()=>
        Promise.resolve({data: {tuits: MOCKED_TUITS_LIST}}));

    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits ={tuits}/>
        </HashRouter>);

    const tuit =  screen.getByText(/I love tropical places/i);
    expect(tuit).toBeInTheDocument();
    mock.mockRestore();
});