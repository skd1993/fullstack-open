import { courseName, courseParts } from "./constants";
import Header from "./Components/Header";
import Content from "./Components/Content";
import Total from "./Components/Total";

const App = () => {
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
