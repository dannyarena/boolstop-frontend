import PlatformsLinkComponent from "../components/PlatformsLinkComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons";

export default function Homepage() {
  return (
    <>
      <div className="wrapper-homepage vh-100">
        <div className="container">
          <div className="jumbotron">
            <h1 className="logobool">BOOLSTOP</h1>
          </div>

          <div className="logocontainer d-flex justify-content-center mt-5 ">
            <PlatformsLinkComponent linkPage={"/videogames/ps5"}>
              <FontAwesomeIcon
                className="iconplat"
                icon={faPlaystation}
                size="2xl"
                style={{ color: "#ffffff" }}
              />
            </PlatformsLinkComponent>
          </div>
        </div>
      </div>
    </>
  );
}
