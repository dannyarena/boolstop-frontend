import { useParams } from "react-router";
import PlatformListComponent from "../components/PlatformListComponent";

export default function PlatformsPage() {
  const { platform } = useParams();
  return (
    <>
      <div className="container">
        <PlatformListComponent />
      </div>
    </>
  );
}
