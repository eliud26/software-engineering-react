import renderer from 'react-test-renderer';
import TuitStats from "../components/tuits/tuit-stats";

test('stats render correctly for likes', () => {
    let stats = {
        likes: 123, dislikes: 45, replies: 234, retuits: 345
    }
    const likingTuit = () => {
        renderer.act(()=> {
            stats.likes++;
            tuitStats.update(
                <TuitStats tuit={{stats: stats}}
                likeTuit={()=>{}}/>
            )
        })
    }
    let tuitStats
    renderer.act(()=> {
        tuitStats = renderer.create(
            <TuitStats likeTuit={likingTuit} tuit={{stats: stats}}/>
        )
    })
    const root = tuitStats.root;
    // eslint-disable-next-line testing-library/await-async-query
    const likesCounter = root.findByProps(
        {className: 'ttr-stats-likes'})
    // eslint-disable-next-line testing-library/await-async-query
    const dislikesCounter = root.findByProps(
        {className: 'ttr-stats-dislikes'})
    // eslint-disable-next-line testing-library/await-async-query
    const retuitsCounter = root.findByProps(
        {className: 'ttr-stats-retuits'})
    // eslint-disable-next-line testing-library/await-async-query
    const repliesCounter = root.findByProps(
        {className: 'ttr-stats-replies'})
    // eslint-disable-next-line testing-library/await-async-query
    const likeTuitButton = root.findByProps(
        {className: 'ttr-like-tuit-click'})

    let likesText = likesCounter.children[0];
    let dislikesText = dislikesCounter.children[0];
    let repliesText = repliesCounter.children[0];
    let retuitText = retuitsCounter.children[0];
    expect(likesText).toBe("123");
    expect(dislikesText).toBe("45");
    expect(retuitText).toBe("345");
    expect(repliesText).toBe("234");

    renderer.act(()=>{likeTuitButton.props.onClick()})
    likesText = likesCounter.children[0];
    expect(likesText).toBe("124");

})

