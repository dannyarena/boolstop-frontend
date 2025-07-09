import { useParams } from "react-router";
import PlatformListComponent from "../components/PlatformListComponent";

export default function PlatformsPage() {
  const { platform } = useParams();
  return (
    <>
      <div className="vidoegames-container container-fluid">
        <PlatformListComponent />
      </div>
    </>
  );
}
