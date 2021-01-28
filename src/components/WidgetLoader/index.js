import Widget from "../../../src/components/Widget";
import ContentLoader from "react-content-loader";

export default function Loader(props) {
  return (
    <Widget>
      <Widget.Header />
      <ContentLoader
        speed={2}
        width={400}
        height={360}
        viewBox="0 0 400 360"
        backgroundColor="rgba(40,40,40,0.2)"
        foregroundColor="rgba(60,60,60, 0.2)"
        {...props}
      >
        <rect x="24" y="71" rx="2" ry="2" width="306" height="13" />
        <rect x="24" y="28" rx="0" ry="0" width="308" height="39" />
        <rect x="23" y="92" rx="0" ry="0" width="167" height="13" />
        <rect x="41" y="120" rx="0" ry="0" width="269" height="44" />
        <rect x="42" y="171" rx="0" ry="0" width="268" height="42" />
        <rect x="43" y="286" rx="0" ry="0" width="267" height="44" />
        <rect x="43" y="221" rx="0" ry="0" width="268" height="42" />
      </ContentLoader>
    </Widget>
  );
}
