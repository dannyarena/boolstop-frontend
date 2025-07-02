import PlatformsLinkComponent from "../components/PlatformsLinkComponent";
import { dataPath } from "../data/dataPath";

export default function Homepage() {
  return (
    <>
      <div className="container">
        <div className="jumbotron"></div>
        <div className="logocontainer d-flex justify-content-center flex-row"></div>
        <section className="link-platforms">
          {dataPath.map((data, i) => (
            <PlatformsLinkComponent key={i} linkPage={data.path}>
              <i className={data.icon}></i>
            </PlatformsLinkComponent>
          ))}
        </section>
      </div>
    </>
  );
}
