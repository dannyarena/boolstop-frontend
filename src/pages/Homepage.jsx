import PlatformsLinkComponent from "../components/PlatformsLinkComponent";

export default function Homepage() {
  return (
    <>
      <div className="container">
        <div className="jumbotron"></div>
        <div className="logocontainer d-flex justify-content-center flex-row">
          <PlatformsLinkComponent linkPage={"/videogames/ps5"}>
            ps5
          </PlatformsLinkComponent>
        </div>
      </div>
    </>
  );
}
