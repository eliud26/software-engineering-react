import tuits from "./tuits-data.json";
import './tuits.css';
import Tuit from "./tuit";

function Tuits() {
 return(
<ul className="ttr-tuits list-group">
 {
   tuits.map(tuit => {
     return(
       <Tuit key={Math.random()} tuit={tuit}/>
     );
   })
 }
</ul>
    );
}
export default Tuits;