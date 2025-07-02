import PlatformsLinkComponent from "../components/PlatformsLinkComponent";

export default function Homepage() {
  return (
    <>
      <div className="wrapper-homepage vh-100">
        <div className="container">
          <div className="jumbotron">
            <img src="public\img\retro_gaming_room_8_bit_art-t2.jpg" alt="" />
          </div>
          <div className="logocontainer d-flex justify-content-center flex-row">
            <PlatformsLinkComponent linkPage={"/videogames/ps5"}>
              ps5
            </PlatformsLinkComponent>
          </div>
        </div>
      </div>
    </>
  );
}
